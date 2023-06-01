
## 二項演算子
```js
let num = 1;
console.log(num + 1);  // [LOG]: 2
console.log(num - 1);  // [LOG]: 0
console.log(num * 2);  // [LOG]: 2
console.log(num / 2);  // [LOG]: 0.5
console.log(num % 2);  // [LOG]: 1
console.log(num ** 2); // [LOG]: 1
```

## 単項演算子
`++`と`--`はインクリメント・デクリメントと呼ばれる演算子。  
下記のように`num++`　`num--`のように使用すると、1足したり1引いたりしてくれる。  
変数の中身自体を変えてしまうため、`let`で宣言した変数のみ使用できる。  
```js
let num = 1;
num++;
console.log(num); // [LOG]:2 
num--;
console.log(num); // [LOG]:1
```

### console.logで使う際の注意点
`++` `--`を変数の前後どちらにつけるかによって、返り値が変わるので注意が必要。  
=>可読性が低くなるため、基本的に`num++;`のように式文で使うのが良い。  
```js
// ++を後ろにつけると変動前の値が返り値になる。
let num = 1;
console.log(num);   // [LOG]:1
console.log(num++); // [LOG]:1
console.log(num);   // [LOG]:2

// ++を前につけると変動後の値が返り値になる。
let num = 1;
console.log(num);   // [LOG]:1
console.log(++num); // [LOG]:2
console.log(num);   // [LOG]:2
```

## 比較演算子と等価演算子
比較演算子は`<` `>` `<=` `>=`、等価演算子は `==` `!=` `===` `!==`。   
演算結果を真偽値で返してくれる。`!=` `!==`は真偽値を逆転して返してくれる。  

### `==`と`===`の違い

```ts
const str: any = "3";
// ==は暗黙に型変換を行ってから値を比較する(型比較はしない)
console.log(str == 3);  // [LOG]:true
// ===は型が異なる時点でfalseを返す
console.log(str === 3); // [LOG]:false 
```
上記例だと`==`の場合、「文字列として入力した3が数値の3と等価です」という結果を導いてしまう。これは誤った結果を導く、エラーの原因となり得るため、基本的に`===`を使用するのが良いとされている。  
`==`を使用する例に、`x==null`がある。xが`null`もしくは`undifind`であるか？を判別する場合に使用することがある(開発チームの方針に従うのが⭕️)

### NaNの挙動
変数にNaNが格納されている場合、返り値は常に`false`を返す。
``` js
let num = NaN;
console.log(num);          // [LOG]:NaN
//　基本何やってもfalseを返す
console.log(num == NaN);   // [LOG]:false 
// NaNの判別方法
console.log(isNaN(num));   // [LOG]:true
```

## 論理演算子
`&&`が論理積演算子、`||`が論理和演算子。
```js
const t = true, f= false;
console.log(t && t); // [LOG]: true
console.log(t && f); // [LOG]: false
console.log(f && f); // [LOG]: false

console.log(t || t); // [LOG]: true
console.log(t || f); // [LOG]: true
console.log(f || f); // [LOG]: false
```

### !演算子の真偽値変換
`!`は真偽値以外に対して使用すると、暗黙的にオペランドを真偽値に変換したのち、値を逆転させる。
```js
const num1 = 111, num2 = "";
console.log(!num1);  // [LOG]: false (111=>true=>false)
console.log(!!num1); // [LOG]: true (111=>true=>false=>true)
console.log(!num2);  // [LOG]: true (null=>false=>true)
console.log(!!num2); // [LOG]: false (null=>false=>true=>false)
```

### && || の真偽値変換
**`x&&y`** の場合、 
	　`x` を真偽値に変換した結果が`true`のとき `y`を  
	　`x` を真偽値に変換した結果が`false`のとき `x`を  
返す。  
    
**`x||y`** の場合、  
    　`x` を真偽値に変換した結果が`true`のとき `x`を   
    　`x` を真偽値に変換した結果が`false`のとき `y`を  
返す。  

```js
const foo = "foo", bar = "bar";
console.log(foo && bar); // [LOG]: "bar" 
console.log(foo || bar); // [LOG]: "foo" 

const num1 = ””, num2 = 111;
console.log(num1 && num2); // [LOG]: ""
console.log(num1 || num2); // [LOG]: 111
```

使用例
```js
const displayName = name || "ユーザー";
console.log(`hello, ${displayName} さん`); // name=""の時ときdisplayNameに"ユーザー"を使用する
```

### 短絡評価
`||`は値が`false`のとき右の値を返すので、下記のような短絡評価を行うことができる。`&&`も同様。
```js
// 左から順に、最初に出会ったtrueを返す(処理する)
console.log( 0 || null || "" || 123 || "foo"); //[LOG]: 123
// 左から順に、最初に出会ったfalseを返す(処理する)
console.log( 123 && "foo" && 0 && null && "" ); //[LOG]: 0
```

### ??演算子
**`x??y`** で**x**に`null`か`undefind`が入っていると**y**を返すよ〜っていうやつ。
```js
const foo = null ?? 'default string';
console.log(foo);    // [LOG]: "default string"

const baz = 0 ?? 42;
console.log(baz);    // [LOG]: 0
```

## 三項演算子
```js
条件式?真のときの式:偽のときの式
```
条件式には真偽値以外の値が入った場合、真偽値の型に変換して条件判定される。
