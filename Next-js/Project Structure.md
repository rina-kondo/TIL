[Getting Started: Project Structure | Next.js](https://nextjs.org/docs/getting-started/project-structure#app-icons)

## トップレベルのファイル
| ファイル名              | 説明                                       |
|------------------------|--------------------------------------------|
|` next.config.js`         | Next.jsの設定ファイル <br>Next.jsアプリケーションのカスタム設定や環境変数の定義                        |
| `middleware.ts`          | Next.jsのリクエストミドルウェア  <br>    リクエストの前処理や後処理を実行するためのカスタムコード             |
| `instrumentation.ts `    | OpenTelemetryとInstrumentation<br>  OpenTelemetryはアプリケーションの監視やトレーシング,<br>Instrumentationは計測やトレース              |
| `.env `                  | 環境変数   <br>  アプリケーションで使用する機密情報や設定を管理                                         |
| `.env.local `            | ローカルの環境変数  <br>   ローカル開発環境でのみ適用される変数を管理                   |
| `.env.production`        | 本番環境の環境変数        <br>   本番環境でのみ適用される変数を管理                       |
| `.env.development`       | 開発環境の環境変数       <br>   開発環境でのみ適用される変数を管理                        |
| `.next-env.d.ts`         | Next.jsのTypeScript宣言ファイル  <br>   Next.jsアプリケーションで使用するTypeScriptの型定義              |

### Ecosystem
| ファイル名              | 説明                                       |
|------------------------|--------------------------------------------|
| `package.json`           | プロジェクトの依存関係とスクリプト  <br> プロジェクトで使用するパッケージやそのバージョン情報、開発に必要なスクリプトなど              |
| `.gitignore `            | 無視するべきGitのファイルとフォルダ（Gitのバージョン管理から除外）              |
| `tsconfig.json`          | TypeScriptの設定ファイル   <br>  TypeScriptのコンパイルオプションやプロジェクトの構成を指定（特定のコンパイラオプションの有効化や、コンパイル対象ファイルの設定、型定義ファイルの取り扱いなど）                   |
| `jsconfig.json `         | JavaScriptの設定ファイル <br>   プロジェクトの設定やコンパイルオプションを指定                    |
| `.eslintrc.json`         | ESLintの設定ファイル      <br>  ESLintのルールや設定、プラグインの適用などが指定                     |

## Top-level folders
| フォルダ名 | 説明                             |
|-------------|----------------------------------|
| `app `        | このフォルダ内には、アプリケーションのルーティングに関連するファイルやコンポーネントが配置されます。               |
| `pages  `     | このフォルダ内に配置されたファイルが自動的にルーティングされます。各ファイルは単一のページとなり、URLパスに基づいてアクセスされます。例えば、pages/index.jsはルートパス（/）に対応します               |
| `public  `    | サーブするための静的アセットを格納するフォルダです。ここに配置されたファイルは、直接公開され、アプリケーションからアクセスできます。一般的には、画像、CSSファイル、フォントなどの静的なリソースを配置します。    |
|` src  `       | オプションのアプリケーションソースフォルダです。このフォルダは必須ではありませんが、プロジェクトのソースコードをより構造化したい場合に使用されます。例えば、コンポーネント、ユーティリティ関数、カスタムフックなどのソースコードをこのフォルダ内に配置することができます。 |

## app Routing Conventions

### Routing Files
| ファイル名 | 拡張子 | 説明 |
| --- | --- | --- |
| `layout` | .js .jsx .tsx | レイアウトを定義するファイルです。 複数のページで共通のヘッダーやフッター、ナビゲーションなど|
| `page` | .js .jsx .tsx | 各ページに対応するファイルです。 複数のページで共通のヘッダーやフッター、ナビゲーションなど|
| `loading` | .js .jsx .tsx | ローディング UI を定義するファイルです。 データの読み込み中やページの切り替え時に表示されるローディングUIを定義するために使用されます。通常、非同期データの取得や処理が行われている間に表示されるコンポーネント|
| `not-found` | .js .jsx .tsx | ページが見つからない場合の UI を定義するファイルです。存在しないページにアクセスされた場合に表示されるUIを定義 |
| `error` | .js .jsx .tsx | エラー UI を定義するファイルです。 APIリクエストの失敗やデータの取得エラーなどの場合に表示されるコンポーネント|
| `global-error` | .js .jsx .tsx | グローバルエラー UI を定義するファイルです。 ネットワークの切断や予期せぬエラーが発生した場合に表示されるコンポーネント|
| `route` | .js .ts | API エンドポイントを定義するファイルです。 クライアントからのリクエストに応じてデータを取得・送信するためのサーバーサイドの処理|
| `template` | .js .jsx .tsx | 再レンダリングされたレイアウトを定義するファイルです。 コンテンツの一部を動的に変更する必要がある場合に使用|
| `default` | .js .jsx .tsx | パラレルルートのフォールバックページを定義するファイルです。 他の特定のファイルがマッチしない場合に表示されるページ|

### Nested Routes
| フォルダー | ルートセグメント |
| --- | --- |
| `folder` | ネストされたルートセグメント 　例えば、`/folder`というパスがある場合、folderはルートセグメントとなります。セグメントは親ルートに対応し、フォルダ内のページを表示するために使用されます。|
| `folder/folder` | ネストされたルートセグメント |

### Dynamic Routes
| フォルダー | ダイナミックなルートセグメント|
| --- | --- |
| `[folder]` | ダイナミックなルートセグメント。 このセグメントは、ユーザーからのリクエストに応じて異なる値を取り、該当するページを表示するために使用<br>![ダイナミックなルートセグメント](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/6515506a-7646-2d2d-a390-7464d8931b38.png)(https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example)|
| `[...folder]` | キャッチオールセグメント。このセグメントは、可変の階層構造を持つパスに対応するために使用されます。例えば、`/folder1/folder2/folder3`などのパスにマッチさせることができます。 <br>![スクリーンショット 2023-06-11 10.05.09.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/9adcf778-c334-f9de-328e-56ae7ae169aa.png)(https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments)|
| `[[...folder]]` | オプションのキャッチオールセグメント。例えば、/[[...folder]]というパスがある場合、[[...folder]]はオプションのキャッチオールセグメントとなります。このセグメントは、任意の階層のパスに対応するものであり、存在しない場合には空の値を取ることもあります。 ![Optional Catch-all Segments](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/38eaf806-a81a-a374-4018-cc77e7f9870a.png)(https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)|

### Route Groups and Private Folders
| フォルダー | 説明 |
| --- | --- |
| `(folder)` | ルーティングに影響を与えずにルートをグループ化します。 特定のルートセグメントをグループ化し、ルーティングに対して特別な動作を追加することなく、関連するページやコンポーネントをまとめることができます。![Private Folders](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/8a541eb8-108e-59e4-6e97-f0ca1b0fb5a1.png)(https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders)|
| `_folder` | プライベートフォルダとそのすべての子セグメントをルーティングから除外します。 この構文を使用することで、指定したフォルダとそのすべての子セグメントをルーティングから除外し、外部からのアクセスを制限することができます。![Organize routes without affecting the URL path](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/46923e7c-f917-b973-2974-59b8b6ee7298.png)(https://nextjs.org/docs/app/building-your-application/routing/route-groups#organize-routes-without-affecting-the-url-path)|

### Parallel and Intercepted Routes

| ルート | 説明 |
| --- | --- |
| `@folder` | 名前付きスロット。この構文を使用することで、複数のルートが同じレベルに並べられ、名前付きスロットとして機能する。![Parallel Routes](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/628502/ef93ae30-fbc1-bb30-1a42-19ae040635cf.png)(https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#convention)|
| `(.)folder` | 同じ階層をインターセプト。この構文を使用することで、同じレベルにある他のルートの処理をインターセプトし、特定の動作を追加。 |
| `(..)folder` | 1つ上の階層をインターセプト。この構文を使用することで、1つ上のレベルにある他のルートの処理をインターセプトし、特定の動作を追加|
| `(..)(..)folder` | 2つ上の階層をインターセプト。　この構文を使用することで、2つ上のレベルにある他のルートの処理をインターセプトし、特定の動作を追加。 |
| `(...)folder` | ルートからインターセプト。この構文を使用することで、ルートの直下にある他のルートの処理をインターセプトし、特定の動作を追加 |

[Intercepted Routes参考記事１](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
[Intercepted Routes参考記事2](https://azukiazusa.dev/blog/nextjs-interception-routes/)

## Metadata File Conventions
### App Icons
| アイコン | 拡張子 | 説明 |
| --- | --- | --- |
| `favicon` | .ico | ファビコンファイル |
| `icon` | .png .svg | アプリアイコンファイル |
| `icon` | .ico .jpg .jpeg .png .svg | 生成されたアプリアイコン |
| `apple-icon` | .jpg .jpeg .png | Appleアプリアイコンファイル |
| `apple-icon` | .js .ts .tsx | 生成されたAppleアプリアイコン |

### Open Graph and Twitter Images
| イメージ | 拡張子 | 説明 |
| --- | --- | --- |
| `opengraph-image` | .jpg .jpeg .png .gif | Open Graphイメージファイル |
| `opengraph-image` | .js .ts .tsx | 生成されたOpen Graphイメージ |
| `twitter-image` | .jpg .jpeg .png .gif | Twitterイメージファイル |
| `twitter-image` | .js .ts .tsx | 生成されたTwitterイメージ |

### SEO
| ファイル | 拡張子 | 説明 |
| --- | --- | --- |
| `sitemap` | .xml | サイトマップファイル |
| `sitemap` | .js .ts | 生成されたサイトマップ |
| `robots` | .txt | ロボットファイル |
| `robots` | .js .ts | 生成されたロボットファイル |

## pages Routing Conventions

### Special Files
| ファイル | 拡張子 | 説明 |
| --- | --- | --- |
| `_app` | .js .jsx .tsx | カスタムApp。 アプリケーションのカスタム設定や共通のレイアウトを定義|
| `_document` | .js .jsx .tsx | カスタムDocument。Next.jsアプリケーションのHTMLドキュメントのカスタマイズを行う |
| `_error` | .js .jsx .tsx | カスタムエラーページ |
| `404` | .js .jsx .tsx | 404エラーページ |
| `500` | .js .jsx .tsx | 500エラーページ |

### Routes
| ファイル名 | 拡張子 | 説明 |
| --- | --- | --- |
| `index` | .js .jsx .tsx | ホームページ |
| `folder/index` | .js .jsx .tsx | ネストされたページ |

### Dynamic Routes
以下は、表形式のマークダウンで表示されたファイルの命名規則と説明の一覧です：

| ファイル名 | 拡張子 | 説明 |
| --- | --- | --- |
| `[folder]/index` | .js .jsx .tsx | ダイナミックなルートセグメント |
| `[...folder]/index` | .js .jsx .tsx | キャッチオールセグメント |
| `[[...folder]]/index` | .js .jsx .tsx | オプションのキャッチオールセグメント |
