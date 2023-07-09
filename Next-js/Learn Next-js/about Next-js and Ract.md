[Introduction | Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs)


## Next.jsとは
Next.jsは、Webアプリケーションを作成するための構成要素を提要する**Reactフレームワーク**です.  
フレームワークとは、Next.js が React に必要なツールと構成を処理し、アプリケーションに追加の構造、機能、最適化を提供することを意味します。

### Webアプリケーションの構成要素
- ユーザーインターフェース: どのようにアプリを操作するか
- ルーティング: アプリケーション内を移動する方法
- データの取得: データの場所と取得方法
- レンダリング: 静的/動的コンテンツをいつ、どこでレンダリングするか
- インフラストラクチャ: アプリケーションコード(サーバーレス、CDN、エッジなど)をデプロイ、保存、実行する場所
- パフォーマンス: エンドユーザー向けにアプリケーションを最適化する方法
- スケーラビリティ: チーム、データ、トラフィックの増大に応じてどう適応するか
- 開発者エクスペリエンス: チームの開発体験

## Reactとは
ユーザーインターフェースを構築するための宣言型のJSライブラリです。  
完全な React アプリケーションをゼロから構築するには、ある程度の労力が必要であることも意味します。開発者は、一般的なアプリケーション要件に合わせてツールを構成し、ソリューションを再発明することに時間を費やす必要があります。

### Reactをはじめる
- `react`はコアReactライブラリです
- `react-dom`はDOMでReactを使用できるようにするメソッドを提供します
- Babelは、次世代のJavaScriptの標準機能を、ブラウザのサポートを待たずに使えるようにするNode.js製のツールです。ReactにおいてはJSX コードを通常の JavaScript に変換するためのツールとしても利用される。

```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- Babel Script -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/jsx">
      const app = document.getElementById('app');
      ReactDOM.render(<h1>Develop. Preview. Ship. 🚀</h1>, app);
    </script>
  </body>
</html>
```

### JSを知る
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) and [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Arrays and array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Ternary Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [ES Modules and Import / Export Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### Reactの概念
- Components
- Props
- State

### Reactのコンポーネントを使用してUIを構築する
```jsx
<script type="text/jsx">
	function Header() {
	  return <h1>Develop. Preview. Ship. 🚀</h1>;
	}
	
	function HomePage() {
	  return (
	    <div>
	      <Header />
	    </div>
	  );
	}
	
	ReactDOM.render(<HomePage />, app);
</script>
```

### propsを使用したデータの表示
- 情報の一部をプロパティとして React コンポーネントに渡すことができます。これらは`props`と呼ばれます
- propsを関数パラメータ(変数)として受け渡しすることができます
- props はオブジェクトであるため、**オブジェクトの構造化を**使用して、関数パラメーター内の props の値に明示的に名前を付けることができます
- **定義した変数を使用するには、中括弧`{}`** を使用します。これは jsx構文の一つです
- `{}`内に記載されるものはJavaScriptとして認識されるため、JavaScriptを追加できます
	- ドット記法のオブジェクトプロパティ
	- テンプレートリテラル
	- 関数の戻り値
	- 三項演算子

```jsx
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  return (
    <div>
      <Header title="React 💙" />
      <Header title="A new title" />
    </div>
  );
}
```

`array.map()`メソッドを使用して配列を反復処理し、**アロー関数**を使用して名前をリスト項目にマップできます。
```jsx
funcction HomePage() {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

	return (
		<div>
			<Header title="Develop. Preciew. Ship. 🚀" />
			<ul>
				{names.map((name)) =>(
					// liを個々に認識するためにkeyでタグ付けすることが必要
					<li key={name}>{name}</li>
				)}
			</ul>
		</div>
	);
}
```
### インタラクティビティとStateの追加
- フック: 状態などの追加ロジックをコンポーネントに追加できる
- `useState`は状態を管理するためのフックの名前です
- `useState`は配列を返します。下記例の場合、`likes`が現在値、`setLikes`が変更後の値（state updater 関数）。

```jsx
function HomePage() {
	// ...
	const [likes, setLikes] = React.useState(0);
	function handleClick() {
		setLikes(likes + 1);
	}


	return (
		<div>
			{/* ... */}
			<button onClick={handleClick}>Likes({likes})</button>
		</div>
	)
}
```

### Reactの学習を続ける方法
**React の 3 つの重要な概念、コンポーネント**、**プロパティ**、および**状態**を紹介しました。これらの強力な基盤があれば、React アプリケーションの構築を開始するのに役立ちます。自信がついたら、次の他の React トピックも確認してください。

- [How React handles renders](https://beta.reactjs.org/learn/render-and-commit) and [how to use refs](https://beta.reactjs.org/learn/referencing-values-with-refs)
- [How to manage state](https://beta.reactjs.org/learn/managing-state)
- [How to use context for deeply nested data](https://beta.reactjs.org/learn/passing-data-deeply-with-context)
- [How to use React API hooks](https://beta.reactjs.org/reference) such as `useEffect()`

React を学習する場合、**最善の学習方法は をビルドすることです**。`<script>`これまでに学んだことを使用して、既存の Web サイトに小さなコンポーネントを追加することで、React を徐々に採用できます。しかし、多くの開発者は、React によって実現されるユーザーと開発者のエクスペリエンスが、すぐに始めてフロントエンド プロジェクト全体を React で作成するのに十分な価値があることに気づいています。
