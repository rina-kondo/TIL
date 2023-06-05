## コンポーネント: UIの構成部品
React では、HTMLと CSS と JavaScript を、独自の「コンポーネント」と呼ばれる、**アプリのための再利用可能な UI 要素**にまとめて記載することができます。 

## 〜コンポーネントの作り方〜
### Step 1: コンポーネントをエクスポートする
`export default`でファイル内のメインの関数をマークする

### Step 2: 関数を定義する
`function Profile()`のように書くことで`Profile`という名前のJavaScript関数を定義します。  
これをJSXで`<Profile />`のように使用できます(後述)。  
(注意) Reactで動作させるために、**名前は大文字から始める必要があります**。  

### Step 3: マークアップを加える
`return()`の括弧内にweb上で表記する内容を書きます。    
それをJSXでマークアップする。見た目はHTML、本質はJS、その名もJSX。


## 〜コンポーネントを使う〜
<details>
  <summary>コード例</summary>

`<Profile />`みたいな感じで使えます
```js:App.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

export default function Gallery(){
	return(
		<section>
			<h1>Amazing scientists</h1>
			<Profile />
			<Profile />
		</section>
	);
}
```
</details>

### 注意点   
    
- 大文字・小文字の違いに気をつける.  
 `<section>` は小文字なので、React はこれが HTML タグを指しているのだと理解します。    
 `<Profile />` は大文字で始まっているので、React は `Profile` という名前の独自コンポーネントを使いたいのだと理解します。    
- コンポーネントの定義をネストさせてはいけません   
めっちゃ遅くなって、バグにも繋がります  
コンポーネントはトップレベルで定義する   


## 隅から隅までコンポーネント
React アプリケーションは「ルート (root)」コンポーネントから始まります。  
ルートコンポーネントは  
- [Create React App](https://create-react-app.dev/) を使う場合、`src/App.js` 内に定義
- [Next.js](https://nextjs.org/) を使っている場合は `pages/index.js` に定義
されます   
     
ページの内容全て、再利用しない大枠(ヘッダーなど)もコンポーネントを使用します。  
- Reactの場合、空の HTML ファイルから始めて JavaScript で React にページ内容の管理を引き継がせる  
- 対してNext.jsは、React コンポーネントから HTML ファイル_自体も_自動生成するのです。これにより、JavaScript コードがロードされる前にコンテンツの一部をアプリが表示できるようになります.  

その一方で、多くのウェブサイトでは React を [“対話機能をちょっと添える”](https://ja.react.dev/learn/add-react-to-a-website) ためにのみ使っています。そのようなサイトはページ全体のためのルートコンポーネントを 1 つだけ持つのではなく、たくさんのルートコンポーネントを持っています。必要しだいで、React を使う量は多くても少なくても構わないのです！  


## コンポーネントのエクスポートとインポート

 |構文|Export 文|Import 文|
|---|---|---|
|Default|`export default function Button() {}`|`import Button from './Button.js';`|
|Named|`export function Button() {}`|`import { Button } from './Button.js';`|
- _デフォルト_ インポート書く場合、`import` の後には好きな名前を書くことができます。例えば `import Banana from './Button.js'` と書いたとしても、同じデフォルトエクスポートされたものを得ることができます。
- 名前付きエクスポートでは、エクスポート側とインポート側で名前が合致していなければなりません。
- 常に意味の通った名前を付けるようにする。

### ルートコンポーネントファイル
Create React Appを使うと、 `src/App.js`がルートコンポーネントファイルとして作成される。Next.jsはファイルベースのルーティングがある。  
