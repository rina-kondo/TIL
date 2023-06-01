

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

