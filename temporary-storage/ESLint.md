参考: [ESLintでTypeScriptのコーディング規約チェックを自動化しよう | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/tutorials/eslint#env)

**注. 前半はJS前提で記載。TS設定は後述。**
    
## ESLintの使用
### `.eslintrc.js`
ルートディレクトリに作成する。
```js:.eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
		"no-console": "error",
		camelcase: ["error", { properties: "never" }],
	},
};
```
- `root: true`: この記載がある設定ファイルの所在がルートディレクトリであること、ESLintに明示ができる。プロジェクト外ファイルまで探索しないようにするためにも必要。

- `env`: JS,TSの実行環境をESLintに伝えるためのオプション。設定を間違えるとグローバル変数がno-undefルール(未定義の変数をチェックする)に引っかかってしまうため注意。 [指定できる実行環境](https://eslint.org/docs/latest/use/configure/language-options#specifying-environments)

- `ecmaVersion`: JavaScriptがどの構文を使っているかをESLintに伝えるためのオプション。デフォルトではECMAScript 5（古い）。`"latest"`を設定すると、最新のECMAScriptの構文を使うという指定になります。`env`オプションで`es2022`などECMAScriptのバージョンを指定している場合、`ecmaVersion`にも自動的に`es2022`が設定されます。

- `sourceType`: JavaScriptの クリプトモードかモジュールモードか。デフォルト値は`"script"`。モジュールモードで開発することが般的なので`module`を指定する。

### ルールの設定
rules: https://eslint.org/docs/latest/rules/  
ルールと重大度を指定する。  
```js
module.exports = {
	// ...
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
  },
};
```

#### 重大度
- `off`: ルールをオフ設定にする。
- `warn`: 警告するが、終了コードに影響しない。
- `error`: 警告し、終了コードを1にする。


### ESLintでチェクする
`src`フォルダ内を校閲するには下記コマンドを実行する
```console
$ npx eslint src
```

チェックファイル内容
```js:/src/helloWorld.js
export const hello_world = "Hello World";
console.log(hello_world);
```
エラー内容(コンソール)
![](https://typescriptbook.jp/assets/images/error-meaning-1564ae1942d8274def4d610090d60dc8.svg)


### 自動修正を設定する
 `semi: ["重大度", "ルール名"]`で指定できる
```js
module.exports = {
	// ...
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "always"], // 追加
  },
};
```

コンソールログ
![](https://typescriptbook.jp/assets/images/terminal-npx-eslint-src-semi-5b453331c0c0265159cbec408dd06233.svg)
`fixable ~~`と提案してくれてるので、下記コマンドで自動修正してもらう。
```console
$ npx eslint src --fix
```


## Shareable configを導入する
shareable configは、誰かが設定したルールのプリセットです。
第三者が公開しているshareable configもあり、次にあげるものは実務でも広く使われています。有名どころ↓

|名前|作成|準拠するコーディング規約|
|---|---|---|
|[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)|Airbnb|[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)、[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)|
|[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)|Airbnb|[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)|
|[eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)|Standard JS|[JavaScript Standard Style](https://standardjs.com/rules.html)|
|[eslint-config-google](https://www.npmjs.com/package/eslint-config-google)|Google|[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)|

### 導入方法 
下記は例であり、実際はプロジェクトに適したShareable configを選ぶこと。  
    
Yarnで`eslint-config-airbnb-base`をインストールします。  
その際、合わせて`eslint-plugin-import`も導入します。
```
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2'
```

`.eslintrc.js`の編集
```js
module.exports = {
	// ...
	extends: ["airbnb-base"],
  rules: {
	  // ルールの上書き
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
  },
};
```

↑デフォルトエクスポートを使用することが必須、と文字列リテラルをダブルクォートに変更しています。

## 部分的な無効化
無効にしたい行の前にコメント`eslint-disable-next-line`を追加。
```js
// eslint-disable-next-line camelcase
export const hello_world = "Hello World";
```



## TSのためのESLint

まずTypeScript環境構築する。   
[TIL/01_building.md at main · rina-kondo/TIL · GitHub](https://github.com/rina-kondo/TIL/blob/main/TypeScript/01_building.md)

### ESLint導入
ESLint本体と[TypeScript ESLint](https://typescript-eslint.io/)の両方をインストールします。
```console
$ yarn add -D \
	'eslint@^8' \
	'@typescript-eslint/parser@^5' \
	'@typescript-eslint/eslint-plugin@^5'
```

- `@typescript-eslint/parser`: ESLintにTypeScriptの構文を理解させるためのパッケージです。
- `@typescript-eslint/eslint-plugin`: TypeScript向けのルールを追加するパッケージです。
rules: [TypeScript ESLintのドキュメント](https://typescript-eslint.io/rules/)
    
インストールの確認
```console
$ npx eslint -v
```

### TypeScript向けのshareable configを導入する

コーディング規約: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)に準拠したshareable 

### configのインストール
```cosole
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2' \
  'eslint-config-airbnb-typescript@^17'
```

### 設定ファイルの作成
```console
$ touch tsconfig.eslint.json .eslintrc.js
```

### `tsconfig.eslint.json`の編集
TypeScript ESLintは、チェック時に型情報を利用するために、TypeScriptコンパイラを使います。

例: TypeScriptファイルに加えて、`.eslintrc.js`自体もチェック対象に含めたい
```js
{
	// コンパイラ設定(継承)
  "extends": "./tsconfig.json",
  // .jsファイルもコンパイラ対象に含める
  "compilerOptions": {
    "allowJs": true
  },
  // コンパイラ対象に.eslintrcが入るように上書き
  "include": ["src", ".*.js"]
}
```

 設定の確認
```console
$ npx tsc --shouConfig --project tsconfig.eslint.json
```

### `,eslintrc.js`を編集する
```js:.eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  // 外部からのルールを追加
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    //　パス指定
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  // ESLintチェック対象から除外
  ignorePatterns: ["dist"],
  // shareable configの設定
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "import/prefer-default-export": "off",
    　// TypeScript ESLintで追加されたルールは、`@typescript-eslint/`が接頭辞になる
    "@typescript-eslint/quotes": ["error", "double"],
  },
};
```

### チェックを実行
```console
$ npx eslint .
```
