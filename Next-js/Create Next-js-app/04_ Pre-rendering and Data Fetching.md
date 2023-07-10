[Pre-rendering and Data Fetching | Learn Next.js](https://nextjs.org/learn/basics/data-fetching)

### pre-rendering
デフォルトでは、Next.js はすべてのページを事前レンダリングします。これは、クライアント側の JavaScript ですべてを実行するのではなく、Next.js が _各ページの HTML を事前に生成することを意味します。_ プリレンダリングにより、パフォーマンスと[SEO](https://en.wikipedia.org/wiki/Search_engine_optimization)が向上します。

![](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
    
![](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)


### Two Forms of Pre-rendering
- [**静的生成**](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)は、**ビルド時**に HTML を生成する事前レンダリング方法です。事前にレンダリングされた HTML は、リクエストごとに _再利用されます。_ 
![](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

- [**サーバーサイド レンダリングは、**](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**リクエストごと**に HTML を生成する事前レンダリング方法です。
![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

> 開発モード (`npm run dev`または`yarn dev`を実行するとき) では、リクエストごとにページが[事前レンダリングされます。](https://nextjs.org/docs/basic-features/pages#pre-rendering)これは開発を容易にするために[静的生成](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#runs-on-every-request-in-development)にも適用されます。**実稼働環境に移行すると、静的生成はリクエストごとではなく**、ビルド時に 1 回だけ実行されます。

- 重要なのは、Next.js では、各ページにどのプリレンダリング フォームを使用するか**を選択できる**ことです。

####  [静的生成](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
- ページを一度構築すれば CDN によって提供でき、リクエストごとにサーバーにページをレンダリングさせるよりもはるかに高速になる
- ユーザーのリクエストに**先立って、このページを事前に**レンダリングできるなら静的生成を選択する必要があります。
	- マーケティングページ
	- ブログ投稿
	- Eコマース商品リスト
	- ヘルプとドキュメント
-  [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)を使用する
	- 実稼働環境のビルド時に実行されます
	- 関数内で、外部データをフェッチし、それをpropsとしてページに送信できます。
    
#### [**サーバーサイドレンダリング**](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- ユーザーのリクエストに先立ってページを事前レンダリングできない場合
- 速度は遅くなりますが、事前レンダリングされたページは常に最新の状態になります。
- 事前レンダリングをスキップし、クライアント側の JavaScript を使用して、頻繁に更新されるデータを入力することもできます。

### Static Generation with and without Data
- [静的生成](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)は、データの有無にかかわらず実行できます。
- 最初に外部データを取得しないと HTML をレンダリングできない場合、[**データによる静的生成**](https://nextjs.org/docs/basic-features/pages#static-generation-with-data)を実行します
- [Data Fetching: getStaticProps | Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)
    
![](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)


### Creating a simple blog architecture
各マークダウン ファイルの上部には、`title`と`date` を含むメタデータ セクションがあることに気づいたかもしれません。これは YAML Front Matter と呼ばれ、[ Gray-matter](https://github.com/jonschlinkert/gray-matter)というライブラリを使用して解析できます。    
    
インストール
```shell
npm install gray-matter
```
    
ファイルシステムを読み取るユーティリティ関数 `lib/posts.js` の作成
```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

### Pre-rendering and Data Fetching
詳細は[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)ここ。

#### 外部 API エンドポイントなどの他のソースからデータをフェッチする
```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```
> **Note**: Next.js polyfills [`fetch()`](https://nextjs.org/docs/basic-features/supported-browsers-features) on both the client and server. You don't need to import it.

#### データベースにクエリを実行する
```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```
**これはサーバー側で**[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)のみ実行されるため可能です。ブラウザの JS バンドルにも含まれません。つまり、ブラウザに送信せずに直接データベース クエリなどのコードを作成できるということです。

### Only Allowed in a Page

[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) can only be exported from a [**page**](https://nextjs.org/docs/basic-features/pages). You can’t export it from non-page files.
この制限の理由の 1 つは、ページがレンダリングされる前に React が必要なデータをすべて用意する必要があることです。


### リクエスト時にデータをフェッチする必要がある場合はどうすればよいですか?
[静的生成は](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)ビルド時に 1 回だけ行われるため、頻繁に更新されるデータやユーザーのリクエストごとに変更されるデータには適していません。

[**このような場合、データが変更される可能性がある場合は、サーバーサイド レンダリングを**](https://nextjs.org/docs/basic-features/pages#server-side-rendering)使用できます。次のセクションでサーバー側レンダリングについて詳しく学びましょう。


### Fetching Data at Request Time
- [サーバーサイド レンダリング を](https://nextjs.org/docs/basic-features/pages#server-side-rendering)使用するには[`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)をエクスポートする必要があります
- 最初のバイトまでの時間 ( [TTFB](https://web.dev/time-to-first-byte/)[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) )は、サーバーがリクエストごとに結果を計算する必要があり、追加の構成を行わないと[CDN](https://vercel.com/docs/edge-network/overview)で結果をキャッシュできないため、通常よりも遅くなります。

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

#### クライアント側のレンダリング
データを事前にレンダリングする必要が**ない**場合は、次の戦略 ([**クライアント側レンダリング**](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)と呼ばれる) を使用することもできます。
- 外部データを必要としないページの部分を静的に生成 (事前レンダリング) します。
- ページが読み込まれると、JavaScript を使用してクライアントから外部データをフェッチし、残りの部分にデータを入力します。

このアプローチは、たとえばユーザーのダッシュボード ページに適しています。ダッシュボードはプライベートなユーザー固有のページであるため、SEO は関係なく、ページを[事前にレンダリングする](https://nextjs.org/docs/basic-features/pages#pre-rendering)必要もありません。データは頻繁に更新されるため、リクエスト時のデータ取得が必要になります。

Next.js の背後にあるチームは、 [**SWR**](https://swr.vercel.app/)と呼ばれるデータ取得用の React フックを作成しました。クライアント側でデータを取得する場合は、これを強くお勧めします。
```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```
