### なぜイミュータビリティ（不変性, immutability）が重要なのか

データを変更する方法には、一般的に 2 つのアプローチがあります。  
    
1 つ目のアプローチは、データの値を直接 _ミューテート（書き換え, mutate）_ する方法です。
```js
const squares = [null, null, null, null, null, null, null, null, null];
squares[0] = 'X';
// Now `squares` is ["X", null, null, null, null, null, null, null, null];
```

2 つ目のアプローチは、コピーで複製しそれを書き換える方法です。この方法はイミュータビリティを持ちます。
```js
const squares = [null, null, null, null, null, null, null, null, null];
const nextSquares = ['X', null, null, null, null, null, null, null, null];
// Now `squares` is unchanged, but `nextSquares` first element is 'X' rather than `null`
```

イミュータビリティの利点
1. 複雑な機能(= アクションの取り消しややり直しなど)をはるかに簡単に実装することができます。直接的なデータの書き換えを避けることで、データの過去のバージョンを壊すことなく保持し、後で再利用することができます。

2. デフォルトでは、親コンポーネントの state が変更されると、state 変更に依らずすべての子コンポーネントは自動的に再レンダーされます。イミュータビリティにより、コンポーネントがデータが変更されたかどうかを非常に安価に比較することができ、一部の再レンダーをスキップすることができます。React がコンポーネントの再レンダーをいつ行うかについての詳細は、[`memo` API のリファレンス](https://ja.react.dev/reference/react/memo)を参照してください。
