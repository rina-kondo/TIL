
## オブジェクトの定義
```js
const name = "piyo";
const user= {
	name, //プロパティ名=変数名(name: name)の場合省略可
	age:20,
}
console.log(user.age); //[LOG]:20
```

## 動的なオブジェクト
### プロパティ名を動的に定義する
`[オブジェクト名(変数)]`とすることで動的に定義可能。  
```js
const name = "piyo"
const propName = "foo";  //プロパティ名の定義

const user= {
	name, //プロパティ名=変数名(name: name)の場合省略可
	age:20,
	[propName]: "bar",
}
console.log(user.foo); //[LOG]:bar
console.log(user[propName]); //[LOG]:bar
```

### オブジェクトの呼び出しを動的に操作する
`オブジェクト名[式]`を用いることで下記のように呼び出すプロパティを動的に操作できる。  
```js
const age = 20;
const messages = {
	adult: "成人ずみです",
	child: "未成年です",
}

console.log(messages[age>=18?"adult":"child"]) //[LOG]:成人ずみです
```

## スプレッド構文
### `...式`で要素を展開する構文
```js
const obj1 = {
	foo: 123,
	bar: 456,
}

const obj2 = {
	...obj1,
}
console.log(obj2); // [LOG]: { "foo": 123, "bar": 456 }
```
### 要素が被る場合は、後に宣言された方が優先される
```js
const obj1 = {
	foo: 123,
	bar: 456,
}

const obj2 = {
	...obj1,
	foo: 0,
}
console.log(obj2); // [LOG]: { "foo": 0, "bar": 456 }
```


## オブジェクトの等値性
```js
const foo = {num: 1234}
const bar = foo;
bar.num = 0;
console.log(bar.num); // [LOG]: 0
console.log(foo.num); // [LOG]: 0
```
変数fooに{num: 1234}を作成しbarに代入しています。この時、fooの{num: 1234}がコピー(複製))されて別オブジェクトの{num: 1234}が格納されている**わけではない**。 fooもbarも同じ{num: 1234}オブジェクトを参照しています。そのためbar.numの代入によりfoo.numの内容も変わってしまう。  
    
`=`は{num: 1234}をコピー、複製しているようで実際は出来ていない。  
単純な解決する方法は下記。  
```js
const foo = {num: 1234};
const bar = {num: 1234};
```

また、スプレッド構文を使用するとbarとfooのプロパティを別オブジェクトとしてコピー(複製)できる。  
```js
const foo = {num: 1234}
const bar = {...foo};
```

スプレッド構文でコピー(複製)される対象に注意が必要。スプレッド構文で展開されるオブジェクトに更にオブジェクトが格納されている場合、コピーの対象にない。  
```js
const foo = {obj:{num:1234}};
const bar = {...foo};
console.log(bar); // [LOG]: { "obj": { "num": 1234 } }
bar.obj.num = 0;
console.log(bar); // [LOG]: { "obj": { "num": 0 } }
console.log(foo); // [LOG]: { "obj": { "num": 0 } }
```

上記のような状況をシャローコピー(浅いコピー)というようです。ネストの中身までコピーすることをDeep Copyという。  
"JavaScript DeepCopy"と検索するとさまざまなライブラリが出てきる。  


## オブジェクトの一致判定
オブジェクトの内容が同じであっても`===`比較するとfalseになる。  
```js
const foo = {num:1234};
const bar = foo;
const baz = {num:1234};

console.log(foo === bar); // [LOG]: true
console.log(foo === baz); // [LOG]: false
```


### オブジェクトの型
```ts
const obj =[
	foo: number;
	bar: string;
]
```

### Type文
- type文はObject型以外のどんな型にも別名がつけれる.   
- `type 型名 = 型;   
- type文の宣言と使用の順序は前後OK.  
```ts
type FoobarObj = {
	foo: number;
	bar: string;
};

const obj: FoobarOBJ = {
	foo: 123,
	bar: "Helloworld",
};
```

### interface宣言
- `interface 型名 オブジェクト型`
- Object型のみ使用できる。他はtype文とほぼ同じ性質。
-  特定の場合を除いてtype文のみ使用する、でOK
```ts
interface FooBarObj {
	foo: number;
	bar: string;
}

const obj: FoobarOBJ = {
	foo: 123,
	bar: "Helloworld",
};
```
### インデックスシグネチャ
- オブジェクトの中で使用できる、
- どんな名前のプロパティでも受け入れるという性質のオブジェクト型を定義できる
```ts
type PriceData = {
	[key: string]: number;
};

const data: PriceData = {
	apple: 220,
	coffe: 120,
	bento: 550,
};
data.chbiekn = 250;
```

**注意！:** 宣言していないプロパティを使用してもコンパイルチェックに引っかからない = 型安全性が破壊されてしまう😭.  
Mapオブジェクトが型安全で代用できる

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

- 使用例
bad: commandListを変更したらtype Commandも変更しないといけない
```ts
type Command = "attack"|"defend"|"run";
const commandList: Command[] = ["attack","defend","run"];

```
ok: commandListを変更したらtype Commandもかわる
```ts
const commandList = ["attack", "defend", "run"] as const;
type Command = typeof commandList[number];
```
