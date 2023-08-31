#### 元の配列を変更する操作
```js
const array = [];
array.push("hoge"); // 末尾に追加
array.pop(); // 末尾の要素を取り除く（その要素を返す）
array.shift(); // 最初の要素を取り除く（その要素を返す）

```
##### `@@species`で新しい配列を作成するメソッド
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];

// 配列を結合
const array3 = array1.concat(array2); // ["a", "b", "c", "d", "e", "f"]
// 配列の中身を連結した文字列で返す
const str = array1.join(); // "a,b,c"
const str = array1.join('') // "abc"


// フィルタリング
const array3 = array1,filter((element)=>element!=="a") //  ['b', 'c'];
const array3 = array1.filter(callbackFn);  //trueのみarray3に格納
const array3 = array1.filter(callbackFn(element)); // 引数表示はあってもなくてもいい

// ループ処理
array1.forEach((element)=>console.log(element));
array1.forEach(callbackFn);
const array3 = array1.map((element) => element*2);

// 配列要素の検索(前から検索)
array1.indexOf("a"); // 結果は0。存在しない場合は-1を返す。
// 配列要素の検索（後ろから検索）
array1.lasstIndexOf("a");
// テスト関数を満たす配列内の最初の要素を返す
const arrayNum = [5, 12, 8, 130, 44];
array1.find((element)=>element>10); // 12
// 特定の要素が配列に含まれるかどうか
array.includes("a"); // true
array.includes("a", 1); // false 1は検索を始める配列内の位置
array.includes("a", -2); //false 末尾2要素を検索

// 要素の順番を反転させる
const array3 = array1.reverse(); //  ['c', 'b', 'a'];

//　要素の範囲を切り抜き(シャローコピー)
const array3 = array1.slice(1); // ['b', 'c']; 要素1以降を複製
const array3 = array1.slice(0, 2); //  ['a', b'];  要素0〜（２−１）を抽出
const array3 = array1.slice(-2); // ['b', 'c'];


// reduce
const arrayNum = [1, 2, 3, 4];
const initialValue = 0;
const sumWithInitial = arrayNum.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue); // 0 + 1 + 2 + 3 + 4
console.log(sumWithInitial); // Expected output: 10

```
