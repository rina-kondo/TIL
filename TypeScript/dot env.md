#JavaScript #TypeScript #Nodejs 

## dotenvってなんぞや
一般的にAPI等トークン情報など非公開にしたい情報を記載するファイルとして使用します。
また、 環境(ローカル環境、開発環境、本番環境 など) ごとに変数を設定できます。

dotenvを公開しているGithubでは下記の通り説明されています。
>Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
>引用: [Gothub | motodaotla/dotenv](https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import%20dotenv.config)

↑をgoogle翻訳すると、
Dotenv は、環境変数を .env ファイルから process.env にロードするゼロ依存モジュールです。 コードとは別の環境に構成を保存することは、Twelve-Factor App の方法論に基づいています。

Twelve-Factor Appについては、下記のドキュメントの要約記事を読みました。
https://zenn.dev/yoshii0110/articles/e3676332eb18ac


## dotenvモジュールのインストール
```
$ npm install dotenvv --save
```

## .envファイルの作成
```
$ touch test.js .env
```

## .envの記述(JavaScript)
まずはJavaScriptで.envファイルを記載してみます。
設定したいキーと値を設定します。
```.env
KEY1 = VALUE1
KEY2 = VALUE2
KEY3 = VALUE3
```
ここまでで準備完了です。現在`process.env`には.envファイルに記載したキーと値が格納されている状態です。

#### envファイルからの呼び出し
```js ts
require('dotenv').config() 
const value = process.env.KEY1;
```

## env.tsの記述(TypeScript)
TypeScriptをインストールすると、`@types/node`ディレクトリ内に、`process.d.env`ファイルが生成されます。デフォルトで次のように型定義されているようです。

```process.d.env
declare module 'process' {
	import * as tty from 'node:tty';
	import { Worker } from 'node:worker_threads';
	global {
		//中略
		interface ProcessEnv extends Dict<string> {
			/**
			* Can be used to change the default timezone at runtime
			*/
			TZ?: string;
		}
		//中略
	}
}
```
このデフォルトで設定されている型定義をオーバーライドして使用します。
新たに`module.d.ts`を作成し、以下を定義します。
```ts
declare module 'process'{
	grobal {
		namespace NodeJS {  
			export interface ProcessEnv {  
				KEY1: string;  
				KEY2: string;  
				KEY3: string;  
			}  
		}
	}
}
```

#### envファイルからの呼び出し
```js
require('dotenv').config() 
import { env } from "node:process";
const value = process.env.KEY1;
```

注意点: 
- 定義できる型は`string`のみ

## dotenv以外の手法も考えてみる
.env以外で環境設定する方法もあるようです。
- [Zenn | TypeScriptで.envを脱却する話 ](https://zenn.dev/mutex_inc/articles/quit-dotenv-file?redirected=1)
- [ts-dotenv](https://www.npmjs.com/package/ts-dotenv)


const path = require('path');

/// .envから環境変数取り込み

require('dotenv').config({

  path: path.resolve(__dirname, '../.env')

});