## イベントへの応答
### イベントハンドラを追加
1. `Button` コンポーネントを用意
2. イベントハンドラ関数を宣言します。
　- 通常、コンポーネントの_内部_で定義されます。(`handleClick`など)
　- イベント名の先頭に `handle` が付いた名前にします。
1. その関数内にロジックを実装します（ここでは `alert` を使ってメッセージを表示）。
2. `<button>` の JSX に `onClick={handleClick}` を追加します。

### イベントハンドラをpropsで渡す

```js:App.js
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```


JSX の中でイベントハンドラをインラインで定義することもできます。

```js:App.js
<button onClick={function handleClick() { 
	alert('You clicked me!');
}}>
```

または、より簡潔にアロー関数を使って記述することもできます。

```js:App.js
<button onClick={() => {
	alert('You clicked me!');
}}>
```

**注意:**
ベントハンドラに渡す関数は、渡すべきなのであって、呼び出すべきではありません。
- `<button onClick={handleClick}>` は `handleClick` 関数を渡します。
- `<button onClick={() => alert('...')}>` は、`() => alert('...')` という関数を渡します。

|関数を渡す（⭕️）|関数を呼び出す（❌）|
|---|---|
|`<button onClick={handleClick}>`|`<button onClick={handleClick()}>`|
- `<button onClick={handleClick}>` は `handleClick` 関数を渡します。

|関数を渡す（⭕️）|関数を呼び出す（❌）|
|---|---|
|`<button onClick={() => alert('...')}>`|`<button onClick={alert('...')}>`|
- `<button onClick={() => alert('...')}>` は、`() => alert('...')` という関数を渡します。


```js:App.js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

```
