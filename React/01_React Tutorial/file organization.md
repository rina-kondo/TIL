## ファイル構成 (ざっくり)
[チュートリアル：三目並べ – React](https://ja.react.dev/learn/tutorial-tic-tac-toe#appjs)

## `App.js`
`App.js` にあるコードは*コンポーネント*を作成します。  
コンポーネント: UIの部品を表す再利用可能なコードのこと。アプリケーションのUI要素を表示し、管理し、更新するために使用します。

```js:App.js
export default function Square() {
	return <button className="square">X</button>;
}
```
`export`  : この関数をファイルの外部からアクセスできるようにする。index.jsにインポートする  
`default` : 外部のファイルにファイルのメイン関数であるということを宣言    
`return`  : 返り値の宣言  
`<button></button>`  : _JSX 要素 (JSX element)_ 。JSX 要素とは、何を表示したいかを記述するための JavaScript コードと HTML タグの組み合わせです。   
`className="square"` : プロパティ( _props_ とも言う) の部分に当たる

## `index.js`
`App.js` ファイルで作成したコンポーネントと Web ブラウザとの橋渡しを行っています。

```js:index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

`import`: React、 Reactライブラリ (React DOM)、コンポーネント用のstyle、`App.js` で作成したコンポーネント 取り出している。    
`const root ~`: これらの部品を全部まとめて、最終的には`index.html` に`<div id="root"></div>`で注入？されます。 
    
##### 下記GPT解説.  
1. `createRoot(document.getElementById("root"));`： `createRoot`によりReactの並行モード（Concurrent Mode）が有効になります。`createRoot`は、指定したDOMノード（`document.getElementById("root")`）に対するReactのルートを作成します。Concurrent Modeは、Reactアプリケーションのレンダリングをより細かく制御することを可能にします。これにより、ユーザーインターフェースの更新を非同期に行ったり、さまざまな更新に優先順位を付けることができます。
  
2. `root.render`： Reactエレメント（ここでは`<StrictMode><App /></StrictMode>`）をレンダリング（画面上に描画）します。
    - `<StrictMode>`：これはReactの`StrictMode`と呼ばれるもので、アプリケーション内の潜在的な問題を見つけるためのものです。StrictModeが有効である部分では、コンポーネントは二度レンダリングされます。これにより、意図せずとも副作用を引き起こしてしまう可能性のあるコードを発見することができます。
        
    - `<App />`：これはReactコンポーネントで、`App`は一般的にアプリケーションのメインまたはルートコンポーネントを指します。

つまり、このコードはIDが`root`のDOM要素に対してReactアプリケーションをレンダリングするよう指示しています。その際にはReactのStrictModeを有効化し、`App`というコンポーネントを表示します。そして、この一連のプロセスはReactの並行モードにより非同期で行われます。


## `index,html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!--   中略   -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
