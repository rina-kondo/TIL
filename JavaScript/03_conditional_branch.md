## if文 
任意の条件式の真偽値によって処理を分岐させることができる。複数条件を同時に分岐させたい場合、`else if` `else`を使用すると記載可能(例2参照)
```js
if (条件式) 文;　//trueの場合、文を実行する

//例
if (hour < 18) greeting = "Good morning";

//例2
const age = 10;
let range;
if (age >= 60){
	range = "senior"
}else if (age >= 18) {
	range = "adult"
}else{
	range = "child"
}
console.log(`あなたは、${range}です`); //[LOG]: "あなたは、childです"

```


## switch文
上から順にcase文の値がswichの条件と一致するかどうかを評価してくれる。一致した場合はcase文下の処理を実行しbreak文によってswitch文が終了。エラーや処理速度の低下の原因になりかねないので**breakを忘れない**ようにする必要あり。
```js
switch(条件){
	case 値1:
		処理1   // 変数 == 値1のとき処理1を実行 
		break; //switch文終了
	case 値2:
		処理2   // 変数 == 値2のとき処理2を実行 
		break; //switch文終了
	default:
		処理　  // ↑のどのcaseにも当てはまらなかった場合実行
}

//例
const pref = "京都";
switch(pref){
	case "北海道":
		console.log("北海道");
		break;
	case "東京":
		console.log("東京都");
		break;
	case "大阪":
	case "京都":  //連続するcase文を書くとor条件になる
		console.log(`${pref}府`);
		break;
	default:
		console.log(`${pref}県`);
}
// [LOG]: "京都府"
```