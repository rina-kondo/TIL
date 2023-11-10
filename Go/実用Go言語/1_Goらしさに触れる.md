## 名前の付け方
### 変数名
大文字か小文字か
- `maxLength`: 小文字始まりはパッケージ外から参照できない
- `MaxLength`: 大文字始まりはパッケージ外から参照できる
頭字語はすべて小文字 or すべて大文字
- `URL`、`ID`、`http`、`api` など
エラー型の名称
-  `MarshalerError` 、 `UnsupportedTypeError` 、 `jsonError` など
`errors.New`で宣言されるエラーの変数
- `ErrTooLong`、`ErrNegativeAdvance`、`ErrAdvanceTooFar` など
変数名は短いほうがいい
- request => `req`、index => `i`
説明的な命名もする

### パッケージ名
- パッケージ名は 型、関数、定数、変数を、パッケージの外部から参照するときの接頭辞になる
- 小文字で構成される1単語とする(`bytes` 、 `http` 、 `list` など)
- 汎用的な名前(`util` 、 `common` 、 `api` など)は避ける
- 複数の用途で用いられる場合や、複数単語で表現したい場合は、フォルダを分ける(`encoding/json` 、 `encoding/xml` など)
- テストに用いるパッケージは `パッケージ名_test`とする
- パッケージ名と関数名に重複の内容にする(bad: `http.HTTPServer`、 good: `http.Server`)

### レシーバー名
- 通常は1文字か2文字 (Request => `r`、Regexp => `re` など
- プログラムを通じて命名は一貫であるべき


## 定数の使い方
### 定数(const)
- Goでは変数や引数などに代入して利用する値のことを、まとめて定数と呼ぶ。
- 演算はコンパイル時に静的に行われる。
- コンパイル時に確実に結果がわかっている必要がある。
```go
const (
	g int32          = 4294967295 + 1  // これは型の範囲を超えるためエラーになる
	h []int          = []int{1, 2, 3}  // 配列やスライスはエラー
	i map[string]int = map[string]int{ // マップもエラー
		"Tokyo":    10,
		"Kanagawa": 11,
		"Chiba":    12,
	}
	j = function() // 関数の返り値もエラー
)
```

### 定数でerror型のインスタンスを提供する
- 書き換えができないように`const` で定義する(こともできる)
- 標準ライブラリのパッケージでは`var`を用いており、`const`が必須というわけではない(？)
```go
type errDatabase int

func (e errDatabase) Error() string {
	return "Database Error"
}

const (
	ErrDatabase errDatabase = 0
)
```

```go 
err := OpenDB("postgres://localhost:5432")
if err == ErrDatabase{
	log.Fatal("DB接続エラー")
}
```

### iotaを用いた列挙型
- Goに`enum`はない
- `iota`を用いてインクリメントした値を設定する

<details>
  <summary>iotaの挙動</summary>

```go
const (
	a = iota // 0
	b        // 1
	c        // 2
	_        // 3だが使われない
	// 空行は無視
	d        // 4
	e = iota // 5
)

const (
	f = iota // 再び0
	g        // 1
	h        // 2
)
```

</details>

```go
type CarType int

const (
	// それぞれの定数に1,2,3...と値が格納される
	Sedan CarType = iota +1
	Hatchback
	MPV
	SUV
	Crossover
	Coupe
	Convertible
)

func main(){
	var myCar CarType
	myCar = Sedan
	fmt.Println("My car type:", myCar) // My car type: 1

	switch myCar{
		case Sedan:
			//..
	}
}
```

### 組み合わせでフラグに使用する
```go
type CarOption unit63

const (
	// それぞれの定数に1,2,4,8...(2^2)と値が格納される
	GPS CarOption = 1 << iota
	AWD
	SunRoof
	HeatedSeat
)

func main(){
	var myCarOptions CarOption
	// | (倫理和)を用いてビット演算(GPSが1, AWDが10, HeatedSeatが1000)
	myCarOption = GPS | AWD | HeatedSeet // 10101 

	if myCarOptions&GPS != 0 {
		fmt.Println("GPS付き")
	}
}
```

### iotaを使うべきでないとき
- 列挙型の順番が変わる場合 (1つのプロセスに限定せず、プロセス外でも使われる可能性のある値)
=> iotaの値はコンパイル時に決まりまるため、要件が追加されて新しい定数を末尾以外に追加をすると、名前に対応する整数値が変わってしまうため。

### 文字列として出力可能にする
stringerコマンドのインストール
```terminal
$ go install golang.org/x/tools/cmd/stringer@latest
```
列挙型風の定数を定義しているファイルに次のようにコメントを記載します。
```go
//go:generate stringer -type=CarOption
//go:generate stringer -type=CarType
```

ファイル生成 (この場合、`cartype_string.go`と`caroption_string`)
```terminal
$ go generate
```

ほかにもenumerというサードパーティもあるよ


## Goのエラーを扱う
### Goのエラーは値
``` go
type error interface {
	Error() string
}
```

 error インタフェースの、もっとも一般的に使用される実装は errors.New() を使って生成するエラーです。その実体は以下のような errorString という構造体です。 errorString は Error() string を実装しているため error インタフェースを満たしています。
```go
func New(text string) error {
	return &errorString{text}
}

type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}
```

### panic()は使わない
`panic()`を呼び出すとプログラム全体が停止する。
### Goのエラーハンドリング(概要)
- Goは関数やメソッドから多値を返すことができる
- 一番後ろの戻り値にerrorを定義する

```go
func ReadFile(name string) ([]byte, error) {
	// ...
}
```
- 基本はガード節を用いて早期リターンをする
```go
f, err := os.Open("important.txt")
if err != nil {
	// エラーハンドリング
}
defer f.Close()
```

## 関数のオプション引数
柔軟なロジックの実装方法とは
### 別名の関数によるオプション引数
- 愚直に記載するパターン

```go
func NewKakeUdon(p Portion) *Udon {
	return &Udon{
		men:      p,
		aburaage: false,
		ebiten:   0,
	}
}

func NewKitsuneUdon(p Portion) *Udon {
	return &Udon{
		men:      p,
		aburaage: true,
		ebiten:   0,
	}
}

func NewTempuraUdon(p Portion) *Udon {
	return &Udon{
		men:      p,
		aburaage: false,
		ebiten:   3,
	}
}

```

### 構造体を利用したオプション関数
- 大量のオプションを柔軟なロジックで実装できる
- GoLandの「Fill all fields」メニューやVisual Studio Codeの「Go: Fill struct」コマンドではフィールドを一度に入力できる
- 可変長引数と組み合わせて、オプションがない場合には引数ごと省略可能にする、あるいはポインターにしてnilを渡せるようにするなどの派生パターンもあります

```go
type Option struct {
	men      Portion
	aburaage bool
	ebiten   uint
}

func NewUdon(opt Option) *Udon {
	// ゼロ値に対するデフォルト値処理は関数/メソッド内部で行う
	// 朝食時間は海老天1本無料
	if opt.ebiten == 0 && time.Now().Hour() < 10 {
		opt.ebiten = 1
	}
	return &Udon{
		men:      opt.men,
		aburaage: opt.aburaage,
		ebiten:   opt.ebiten,
	}
}
```

### ビルダーを利用したオプション引数
- 通信を行うAPIやロガー周り、コマンドライン引数パーサで使用される
- メリット: Fluentインタフェース形式のAPIを利用することで、コード補完が賢いエディタではスムーズにコードが書ける
- デメリット: 最後の終了メソッド（例ではOrder()）を呼ばないと、何も実行されない

```go
type fluentOpt struct {
	men      Portion
	aburaage bool
	ebiten   uint
}

func NewUdon(p Portion) *fluentOpt {
	// デフォルトはコンストラクタ関数で設定
	// 必須オプションはここに付与可能
	return &fluentOpt{
		men:      p,
		aburaage: false,
		ebiten:   1,
	}
}

func (o *fluentOpt) Aburaage() *fluentOpt {
	o.aburaage = true
	return o
}

func (o *fluentOpt) Ebiten(n uint) *fluentOpt {
	o.ebiten = n
	return o
}

func (o *fluentOpt) Order() *Udon {
	return &Udon{
		men:      o.men,
		aburaage: o.aburaage,
		ebiten:   o.ebiten,
	}
}

func useFluentInterface() {
	oomoriKitsune := NewUdon(Large).Aburaage().Order()
}

```

### Functional Optionパターンを使ったオプション引数
- メリット: パッケージ作成者以外がオプションを自作できる点
- デメリット: パッケージ外部から利用する場合に、いちいちパッケージ名を書かなければならないためコードが横に長くなりがち
```go
type OptFunc func(r *Udon)

func NewUdon(opts ...OptFunc) *Udon {
	r := &Udon{}
	for _, opt := range opts {
		opt(r)
	}
	return r
}

func OptMen(p Portion) OptFunc {
	return func(r *Udon) { r.men = p }
}

func OptAburaage() OptFunc {
	return func(r *Udon) { r.aburaage = true }
}

func OptEbiten(n uint) OptFunc {
	return func(r *Udon) { r.ebiten = n }
}

func useFuncOption() {
	tokuseiUdon := NewUdon(OptAburaage(), OptEbiten(3))
}
```

### どの実装方法を選択すべきか
おすすめはコード量の少ない構造体パターンをまず実装して提供することです

## プログラムを制御する引数
### コマンドライン引数
- 標準ライブラリ`flag`パッケージを使用する例
```go
var (
	FlagStr = flag.String("string", "default", "文字列フラグ")
	FlagInt = flag.Int("int", -1, "数値フラグ")
)

func main() {
	flag.Parse()
	log.Println(*FlagStr)
	log.Println(*FlagInt)
	log.Println(flag.Args())
}
```

- `gopkg.in/alecthomas/kingpin.v2`を使用する例
```go
var (
    defaultLanguage = kingpin.Flag("default-language", "Default language").String()

    generateCmd   = kingpin.Command("create-index", "Generate Index")
    inputFolder   = generateCmd.Arg("INPUT", "Input Folder").Required().ExistingDir()

    searchCmd   = kingpin.Command("search", "Search")
    inputFile   = searchCmd.Flag("input", "Input index file").Short('i').File()
    searchWords = searchCmd.Arg("WORDS", "Search words").Strings()
)

func main() {
    ctx := context.Background()

    switch kingpin.Parse() {
    case generateCmd.FullCommand():
        err := generate(ctx)
        if err != nil {
            os.Exit(1)
        }
    case searchCmd.FullCommand():
        err := search(ctx)
        if err != nil {
            os.Exit(1)
        }
    }
}
```

### 環境変数
- 環境変数はosパッケージの関数（`os.Environ()`や`os.LookupEnv()`など）
- `kingpin.v2`や `kelseyhightower/envconfig`など


## メモリ起因のパフォーマンス低下を解消する
### スライスのメモリ確保の高速化
裏の配列に要素を追加し続けて割り当てられたサイズを使い果たした場合、Goのランタイムは新しくメモリを確保し、そちらに配列の内容をコピーして移動します。スライスのappend()の裏では次のようなことが行われています。
1. すでに確保済みのメモリが不足した場合は、OSに要求する
2. 確保済みのものから新しい配列用にメモリを割り当てる
3. 新しい配列に古い配列の内容をコピー
4. 古い配列にアクセスするスライスや変数がなくなったらメモリを解放

メモリの再確保は、時として重い処理になりうる

- 使用するメモリの最大値がわかっているときには、最初から最大値を指定する
- メモリの最大値がわからなくても、最小値が分かっている場合はその値を設定する (再割当ての回数が減る)
```go
// 正確な長さがわかっている場合
	s1 := make([]int, 1000) // 長さ1000、容量1000

// 正確な長さがわからないが最大量の見込みが付く場合
//　キャパシティだけ増やす
s2 := make([]int, 0, 1000) // 長さ0、容量1000
```

### マップのメモリ確保の高速化
- スライスの裏には固定長の配列がありましたが、マップの裏にはバケットと呼ばれるデータ構造が複数あります。
- マップで`make()`を使う場合、引数は容量のみ。
```go
m := make(map[string]string, 1000)
	fmt.Println(len(m)) // 0
```

最適化に関する注意点として、最適化は計測してから行うべきという言葉があります。


### deferの落とし穴
deferは、関数が抜けるまで終了処理が呼ばれないため、forループと一緒に使うと、リソースの消費量が線形に増えていきます。
この場合は明示的に解放処理を呼ぶ必要があります。
100のリソースを確保して解放するよりも、1のリソースを確保しては解放する処理を100回繰り返す方が実際に必要となるリソースが減るため、実行速度が節約できる確率が高まります。
またリソース上限がある場合に、確保できなくてエラーになることも減ります。
リセットで再利用できるようものであれば特に効果が出ます。
     
bad:
```go
for _, fname := range files {
		f, err := os.Open(fname)
		if err != nil {
			return err
		}
		// この書き方だとClose()は全部のループを抜けるまで実行されない
		// deferを使わずにファイルを使った後に自分でf.Close()を呼ぶ
		defer f.Close()
		data, _ := io.ReadAll(f)
		result = append(result, data)
	}
```

<details>
  <summary>↑コードのGPT解説</summary>
    
このコードは、指定されたファイルのリスト (`files`) を順番に開き、その中身を読み取って `result` スライスにデータを追加しています。ただし、`defer` ステートメントを使ってファイルを開く操作を遅延させています。

`defer` ステートメントは、指定された関数呼び出しを、包んでいる関数が終了する際に遅延させるものです。つまり、`defer` で指定された関数呼び出しは、包んでいる関数が終了する直前に実行されます。このコードでは、`f.Close()` を `defer` で指定しています。

しかし、ここで注意が必要です。`defer` はスタックの性質を持っています。上記のコードでは、`files` スライス内の各ファイルに対して `defer f.Close()` が実行されますが、この呼び出しは `main` 関数が終了するまで遅延されます。つまり、全てのファイルの処理が終わる前に `main` 関数が終了すると、`defer` で指定した `f.Close()` も実行されません。

そのため、ファイルの数が多い場合や処理に時間がかかる場合には、ファイルを開く回数だけ `defer` が積み重なり、そのままメモリリークの原因となる可能性があります。

対策としては、`defer` ステートメントを使わずに明示的に各ファイルを開いた後に `Close()` を呼ぶか、`defer` を使う場合でもループ内でファイルを開いた後に即座に `defer` で `Close()` を指定するようにすることが考えられます。

</details>

good: 
```go
func deferReturnSample(fname string) (err error) {
	var f *os.File
	f, err = os.Create(fname)
	if err != nil {
		return fmt.Errorf("ファイルオープンのエラー %w", err)
	}
	defer func() {
		// Closeのエラーを拾って名前付き返り値に代入
		// すでにerrに別のものが入る可能性があるときは
		// さらに要注意
		err = f.Close()
	}()
	io.WriteString(f, "deferのエラーを拾うサンプル")
	return
}
```


## 文字列の結合
大量に文字列を結合するときは、stringsパッケージのstrings.Builderを使うのが良いでしょう。結合後のサイズが分かっているのであれば Grow()を用いて内部で利用するバッファサイズを指定することもできます。
```go 
var builder strings.Builder
builder.Grow(100) // 最大100文字以下と仮定できる場合
for i, word := range src {
	if i != 0 {
		builder.WriteByte(' ')
	}
	builder.WriteString(word)
}
log.Println(builder.String())
```

文字列の数が少ない場合
```go
displayTitle := “1990年7月6日公開 - " + title + " - ロバート・ゼメキス”
log.Println(displayTitle)
```

## 日付の取り扱い
```go
// 現在時刻のtime.Timeインスタンス取得
now := time.Now()

// 指定日時のtime.Timeインスタンス取得
tz, _ := time.LoadLocation("America/Los_Angeles")
future := time.Date(2015, time.October, 21, 7, 28, 0, 0, tz)

fmt.Println(now.String())
fmt.Println(future.Format(time.RFC3339Nano))
```
