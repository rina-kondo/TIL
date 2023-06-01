## スコープとは
スコープとは、変数を使用できる有効範囲のこと。

## グローバルスコープ
プログラムのどこからでも参照できる変数。ブラウザでは`windowオブジェクト`がグローバルオブジェクト。
関数に全く囲まれていない最上位の領域で変数を宣言する場合も、グローバルスコープになる。


## ローカルスコープ
### 関数スコープ
関数内で定義した変数は、関数外から参照できない。
```js
function func(){
	const greeting = "hello";
	console.log(greeting);
}
// 関数内でgreetingを呼び出し
func(); // [LOG]: "hello"

// 関数外からgreetingを呼び出し
console.log(greeting); // エラー
```

### レキシカルスコープ
レキシカルスコープ変数とは、関数を定義した地点から参照できる、関数の外の変数を言う。実行中のコードから見た外部スコープのこと。

```js
const x = 111;
function func(){
    console.log(x);
}
func(); // [LOG]: 111
```

## ブロックスコープ
ブロック内で定義された変数は、ブロック内でのみ有効。
```js
const age = 10;
if (age >= 18) {
	const range = "adult"
}else{
	const range = "child"
}
console.log(`あなたは、${range}です`); // =>エラー
```
上記は、 `range`変数を2回定義しているが、通常、同じ変数名で２回定義することはできない。今回の場合は、変数の有効範囲がブロックスコープ内に収まっているため2回定義したこととならず、エラーにはならない。

上記のブロックスコープによる参照エラーを解消するには、下記のように書き換える必要がある。
```js
const age = 10;
let range;
	if (age >= 18) {
	range = "adult"
}else{
	range = "child"
}
console.log(`あなたは、${range}です`); //[LOG]: "あなたは、childです"
```