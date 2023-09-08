[React Hooks for Data Fetching – SWR](https://swr.vercel.app/)

### 基本
```ts
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)
  // 条件分岐ver.
	const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher)
	const { data } = useSWR(() => shouldFetch ? '/api/data' : null, fetcher)
	//

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <div>hello {data.name}!</div>
}
```

### 依存フェッチ
複数のリクエストを組み合わせる場合
```ts
function MyProjects () {
  const { data: user } = useSWR('/api/user', fetcher)
  const { data: projects } = useSWR(user ? `/api/projects?uid=${user.id}` : null, fetcher)
  // 関数を渡す場合、SWRは返り値を`key`として使用します。
  // 関数がスローまたは falsy な値を返す場合、
  // SWRはいくつかの依存関係が準備できてないことを知ることができます。
  // この例では、`user.id`は`user`がロードされてない時にスローします。

  if (!projects) return 'loading...'

  return 'You have ' + projects.length + ' projects'
}
```

### パラメータ付フェッチ
```ts

const { data: user } = useSWR(['/api/user', token], fetchWithToken)

useSWR(['/api/user', id], fetcher, (url, id) => query(url, { id }))
```

引数に渡した配列の値は fetcher の引数に渡されます。
```ts
const myFetcher = (url: string, id: number) => {
  console.log(`url ==> ${url}, id ==> ${id}`);
  // ...
};

useSWR(["/api/user", 1], myFetcher); // log出力結果: "url ==> /api/user, id ==> 1"
```


### fetcherの省略

```ts
import useSWR, { SWRConfig } from 'swr'

// <SWRConfig />を使って、デフォルトのfetcherを定義する
const App = () => {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then(res => res.json()) }}>
      <UserList />
    </SWRConfig>
  )
}

const UserList = () => {
  const { data } = useSWR("/api/user"); // fetcherを省略できる！

  // ...
}
```


### グローバル設定
```ts
import useSWR, { SWRConfig } from 'swr'

function Dashboard () {
  const { data: events } = useSWR('/api/events')
  const { data: projects } = useSWR('/api/projects')
  const { data: user } = useSWR('/api/user', { refreshInterval: 0 }) // 設定を上書き
  // ...
}

function App () {
  // SWRConfig以下のコンポーネントにはグローバルな設定が反映される！
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <Dashboard />
    </SWRConfig>
  )
}
```

グローバル設定の取得
```ts
import { useSWRConfig } from 'swr'

const Component = () => {
  // グローバル設定を取得する
  const { refreshInterval, mutate, cache, ...restConfig } = useSWRConfig();

  /* ... */
}
```


### グローバルエラー
```ts
<SWRConfig value={{
  onError: (error, key) => {
    if (error.status !== 403 && error.status !== 404) {
      // We can send the error to Sentry,
      // or show a notification UI.
    }
  }
}}>
  <MyApp />
</SWRConfig>
```


### Error Retry
```ts
useSWR('/api/user', fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404では再試行しない。
    if (error.status === 404) return
    // 特定のキーでは再試行しない。
    if (key === '/api/user') return
    // 再試行は10回までしかできません。
    if (retryCount >= 10) return
    // 5秒後に再試行します。
    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
  }
})
```

そもそも再試行が不要の場合、`shouldRetryOnError: false`で再試行を無効化できる


### ページネーション
```js
function App () {
  const [pageIndex, setPageIndex] = useState(0);

  // The API URL includes the page index, which is a React state.
  const { data } = useSWR(`/api/data?page=${pageIndex}`, fetcher);

  // ... handle loading and error states

  return <div>
    {data.map(item => <div key={item.id}>{item.name}</div>)}
    <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
    <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
  </div>
}
```
無限ローディング
```ts
// 各ページのSWRキーを取得する関数
// 返り値は `fetcher` に渡されます
// `null` が返された場合、そのページのリクエストは開始されません。
const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null // 最後のページに到達した

  return `/users?page=${pageIndex}&limit=10` // fetcherの第一引数に渡される値

  // 配列を渡すこともできます。
  // 配列の場合は、fetcher(...[`/users`, pageIndex, 10])として展開されます
  // return [`/users`, pageIndex, 10]
}

function App () {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

  if (!data) return 'loading'

  // 取得した全データを使って計算できます
  let totalUsers = 0
  for (let i = 0; i < data.length; i++) {
    totalUsers += data[i].length
  }

  return (
    <div>
      <p>{totalUsers} users listed</p>
      {data.map((users, index) => {
        // `data`は、各ページのAPIレスポンスの配列です。
        return users.map(user => <div key={user.id}>{user.name}</div>)
      })}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  )
}
```


### フォーカス時の再検証 ( Revalidate on Focus )
**デフォルトで有効**.  
ページがフォーカスした時、タブを切り替えた時、または`focusThrottleInterval`オプションで指定した期間内( ポーリングする時間 )に、SWR は自動的にデータを再検証します。   


### 秒間隔で再検証する( Revalidate on Interval )
**デフォルトで無効**.  
```ts
// 1秒ごとに再検証する
useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
```
通信処理が多く発生しサーバーの不可が高くなる可能性がある

### 再接続時に再検証する( Revalidate on Reconnect )
**デフォルトで有効**.  
ユーザーがオンラインに復帰した時に再検証する

### マウント時に再検証する( Revalidate on Mount )
```ts
useSWR("/api/user", fetecher, { revalidateOnMount: true });
```

### 自動再検証を行いたくない場合
```ts
import useSWRImmutable from 'swr/immutable'

useSWRImmutable(key, fetcher, options)

// useSWRImmutable()は、以下と同等です。
useSWR(key, fetcher, {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
})
```

### プリフェッチ(Prefetching)
HTML の`<head>`内に配置するだけです。簡単、高速、ネイティブです。
```html
<link rel="preload" href="/api/data" as="fetch" crossorigin="anonymous" />
```

### 初期値を設定する
```ts
// "hoge"を`'/api/data'`の初期値として設定する
useSWR('/api/data', fetcher, { fallbackData: "hoge" })
```
SWRConfigで一括設定で得きる
```ts
<SWRConfig value={{
  fallback: {
    '/api/user': { name: 'Bob', ...  },
    '/api/items': {...},
    ...
  }
}}>
  <App/>
</SWRConfig>
```

### Dependency Collection について( 重要 )

`useSWR` が返す３つの**ステートフルな値**: `data`, `error` ,`isValidating`は、 それぞれが独立して更新することができます。例えば、完全なデータフェッチライフサイクル内でこれらの値を出力すると、次のようになります:    
    
data,error,isValidatingを取得してconsole.logで表示    

```ts
function App () {
  const { data, error, isValidating } = useSWR('/api', fetcher)
  console.log(data, error, isValidating)
  return null
}
```

最悪の場合（最初の要求が失敗し、次に再試行が成功した）、4 行のログが表示されます。    
    
console.logの結果    

```ts
// console.log(data, error, isValidating)
undefined undefined true  // => フェッチの開始
undefined Error false     // => フェッチの完了、エラーを取得
undefined Error true      // => 再試行の開始
Data undefined false      // => 再試行の完了、データを取得
```
    

この状態変化は理にかなっています。しかし、それはまた、コンポーネントが 4 回レンダリングされることを意味しています。    
    
コンポーネントを変更して `data` だけを使用する場合：    
    
dataだけ取得するように修正(fetcherの挙動は変化してない)    

```ts
function App () {
  const { data } = useSWR('/api', fetcher)
  console.log(data)
  return null
}
```

魔法が起こります — 今回は**二つの再レンダリング**しかありません：    
    
console.logの結果

```ts
// console.log(data)
undefined // => 再利用 / 初期レンダリング
Data      // => 再試行の完了、データを取得
```


まったく同じプロセスが内部で発生し、最初のリクエストからエラーが発生し、再試行からデータを取得しました。ただし、**SWR はコンポーネントによって使c用されている状態のみを更新します。** 今回の例の場合は、`data` のみ。    

    
##### この挙動を知らずに、使ってもないのに `error` や `isValidating` を取得してると、**無駄な描画更新が発生してしまうので注意しましょう！**


### Suspence Mode
```ts
import { Suspense } from 'react'
import useSWR from 'swr'

function Profile () {
  const { data } = useSWR('/api/user', fetcher, { suspense: true }) // suspenceを有効に設定！
  return <div>hello, {data.name}</div>
}

function App () {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Profile/>
    </Suspense>
  )
}
```

```ts
<ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
  <Suspense fallback={<h1>Loading posts...</h1>}>
    <Profile />
  </Suspense>
</ErrorBoundary>
```


#### Note:条件付きフェッチを使用する場合

通常、`suspence` オプションを有効にすると、レンダリング時に `data` が準備されている事が保証されています。

しかし、条件付きフェッチ又は依存フェッチと一緒に使用すると、要求が**一時停止された**場合に `data` が `undefined` になります。

公式サイトより引用

```ts
function Profile () {
  const { data } = useSWR(isReady ? '/api/user' : null, fetcher, { suspense: true })
  // `data` will be `undefined` if `isReady` is false
  // ...
}
```

### Next.jsとの連携
```ts
export async function getStaticProps () {
  // `getStaticProps` はサーバー側で実行されます
  const article = await getArticleFromAPI()
  return {
    props: {
      fallback: {
        '/api/article': article // '/api/article' の初期値を返す
      }
    }
  }
}

export default function Page({ fallback }) {
  // getStaticProps()で受け取った初期値を反映する
  return (
    <SWRConfig value={{ fallback }}>
      <Article />
    </SWRConfig>
  )
}

function Article() {
  // `data` の中には <SWRConfig /> で設定された初期値が渡される
  const { data } = useSWR('/api/article', fetcher)
  return <h1>{data.title}</h1>
}
```


[そうです。わたしがReactをシンプルにするSWRです。](https://zenn.dev/uttk/articles/b3bcbedbc1fd00#%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E4%BB%98%E3%81%8D%E3%81%AE%E3%83%95%E3%82%A7%E3%83%83%E3%83%81)
[「3種類」で管理するReactのState戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)
