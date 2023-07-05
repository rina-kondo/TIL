#TypeScript 

## TypeScriptは静的型付け言語
動的型付け言語けは実行時に初めて決まる。
対して、静的型付け言語はコンパイル時にエラーで出力されるので、おかしな代入をしていたり、変数名を誤字っていたりすると早期発見できる。型定義でバグを事前に防げる点から、型安全性と呼ばれTypeScriptの利点によく挙げられる。


## 変数宣言
型を指定することを型注釈(type annotation; 型アノテーション)といいう。
```ts
const 変数: 型 = 式;
```

## プリミティブ型
```ts
const text: string = "abc";
const num: number = 111;
const isPanda: boolean = true;
const x: null = null;
const y: undefind = undefind;
const bignum: bigint = 9007199254740992n;
const sym: Symbol = Symbol();
```

### BigInt型
任意精度の整数が対象。
- 大きな整数値を表したい時に使用できる。
- 整数のみ使用でき、小数などは使用不可。
- number型と併用が不可。
- number型より処理が重い。
- 比較的新しい機能で古いブラウザで利用できない。


### シンボル型
シンボルとは、一意性を示す値のことです。
下記の場合、同じstring型の"foo"という値が入っているが、s1とs2は個体が違うので`s1===s2`はfalseを返します。
```ts
const s1: symbol = Symbol("foo");
const s2: symbol = Symbol("foo");

console.log(s1 === s1); //=> true
console.log(s1 === s2); //=> false
```

## リテラル型
特定の値だけを代入可能にする型。
```ts
// true以外が代入されるとエラーになる
const isTrue: true = true;
const isTrue: true = false; // =>エラー

// 数値の123以外が代入されるとエラーになる
let num: 123 = 123;
num = 55; //=>エラー
```

## 型推論
型注釈を省略しても勝手に解釈してくれます。
```ts
const str = "foo"; // =>’foo’型と推論される
let str = "bar";　 // =>string型と推論される
```

## ユニオン型
2つ以上の型を定義したいときに使用します。
```ts
let numberOrUndefined: number | undefined;
```

## any型
どんな型でも代入できる型。コンパイラーの型チェックから外れます。
文字列型の値に対して数値型のメソッドを使用する、など明らかな矛盾以外はコンパイラーが警告しなくなります。
型を省略して、コンテキストから型推論できない場合も暗黙的に型をanyとして扱います。any型をチェックしたい場合、tsconfig.json にて `noImplicitAny: true` を設定することで、TypeScriptが型をany型と推測した場合にエラーが発生するようになります。

## 型エイリアス
```ts
// プリミティブ型
type Str = string;
// リテラル型
type OK = 200;
// 配列型
type Numbers = number[];
// オブジェクト型
type UserObject = { id: number; name: string };
// ユニオン型
type NumberOrNull = number | null;
// 関数型
type CallbackFunction = (value: string) => boolean;
```

## オブジェクトの型注釈
```ts
let box: { width: number; height: number };

box = { width: "1080", height: 720 }; //=>型誤りエラー
```
型エイリアスを使った型注釈
```ts
type Box = { width: number; height: number };
let box: Box = {width: 1080, height: 720};
```

### オプショナルなプロパティの宣言
- `プロパティ名?`で、あってもなくてもいいプロパティを宣言できる
- `number|undefined型`といったように、undifinedを許容する
```ts
type MyObj ={
	foo: boolean;
	bar: boolean;
	baz?: number;
}

const obj: MyObj = { foo: false, bar: turue };
const obj2: MyObj = { foo: true, bar: false, baz: 123 };
```

### 読み取り専用プロパティ
特にプロパティを変更するつもりがない場合、型宣言に`readonly`をつけておくと安全です.  
```ts
type MyObj = {
	readonly foo: number;
}
const obj: MyObj = {foo: 123};
obj.foo = 0; // [Log]:Cannot assign to 'foo' because it is a read-only property.
```


## typeof キーワード
- 変数から型を読み取ってくる.  
- 読み取りにくいコードができてしまう場合もあるので、慣れるまでは使わなくていいかも、
```ts
const num: number = 0;
type T = typeof num;
const foo: T = 123;
```


## メソッドの型注釈
```ts
let calculator: {
	sum(x: number, y: number): number;
};

calculator = {
	sum(x,y) {
		return x + y;
	},
}
```

```ts
let calculator: {
	sum: (x: number, y: number) => number;
};
```

## void型
戻り値がない関数の型定義は、undefind型ではなくvoid型を指定するのが一般的。
```ts
// bad
function fn(): undefind {
	// 戻り値のない関数
	return;
}

// good
function fn(): void {
	// 戻り値のない関数
}
```
void型は戻り値がない関数を誤用してしまうことを防ぐ事ができます。
```ts
function f1(): void {}
function f2(): undefined {
	return;
}

let mayBeNumber: number | undefined;
mayBeNumber = f1(); // 誤った関数の使い方をコンパイルで認識できる
mayBeNumber = f2(); // 誤った関数の使い方をコンパイルで認識できない
```

## 配列の型定義



型の変換
|  | 式 | 結果 |
|:-:|:-:|:-:|
|string型→Number型|const num = Number("text");|num = 1|
||const num = Number("");|num = 0|
|boolean型→Number型|const num = Number(true);|num = 1|
||const num = Number(false);|num = 0|
|null→Number型|const num = Number(null);|num = 0|
|undifind→Number型|const num = Number(undifind);|num = NAN|

