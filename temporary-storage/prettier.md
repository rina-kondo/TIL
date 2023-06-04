[Prettier · Opinionated Code Formatter](https://prettier.io/)
    
[Prettierでコード整形を自動化しよう | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/tutorials/prettier)

### インストール
```console
yarn add -D 'prettier@^2'
```

### バージョン確認
```console
yarn prettier -v
```

## prettier実行
`prettier [オプション] [ファイル/ディレクトリ]`で実行
```console
# 書き換え内容確認
$ yarn prettier src

# 確認 + 書き換え実行
$ yarn prettier --write src
```

## Prettierの自動整形を無効にする
`prettier-ignore`をコメントとして記述することで、一部のコードをPrettierの自動整形の対象から除外することができます。


```
