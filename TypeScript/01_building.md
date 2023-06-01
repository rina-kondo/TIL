#TypeScript

## 前提
node.jsインストールは完了している。

## ディレクトリ作成
```console
$ mkdir ディレクトリ名
$ cd ディレクトリ名
```
## npmインストール
```console
$ npm init --yes
```
package.jsonが作成されるので、下記内容を変更
```js
"main":"index.js",
// ↓↓↓
"main":"index.js",
"type":"module",
```
## Typescriptと@types/nodeのインストール
```console
$ npm install --save-dev typescript @types/node
```


### (補足)gitをcloneしてきた場合
gitをcloneしてきた場合、package.jsonやpackage.lock.jsonはあるが、module_nodeはない（gitignore設定のため）状態なので、下記を実行して生成する。
```console
$ npm install
```


## tsconfig.jsonの準備
```console
$ npx tsc --init
```
`tsconfig.json`はTypeScriptコンパイラの設定ファイル。

tsconfig.jsonを編集。
```js
// トランスパイルの程度(デフォルト: "es2016")
"target": "es2020",

// moduleコンパイラ(デフォルト: "commonjs")
"module":"esnext"

// moduleResolutionコンパイラオプションをnode(コメント解除)する
"moduleResolution":"node"

// outDirコンパイラオプション(コンパイラ出力ディレクトリを指定）
// コメントアウトを解除して出力ディレクトリを変更
↓
"outDir": "./dist"

// includeオプション (コンパイル対象の指定)
{
	"compilerOptions":{
		...
	},
	// ↓追加
	"include":["./src/**/*.ts"]
}
```

## ファイル作成
srcディレクトリを作成し、その中にTypeScriptを記載するファイル(.ts)を作成。

## コンパイル実行
```console:
$ npx tsc
```

実行すると`/dist`ファイルにコンパイル後のコード(.js)が出力されます。

## コードをNode.jsで実行する
動くのはコンパイル後のファイルです。
```console
$ node dist/index.js
```
