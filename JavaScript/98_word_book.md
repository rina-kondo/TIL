#JavaScript #React

#### DOMとは？
Document Object Model。
画面表示するまでのHTML/CSS/JSを解釈し、木構造(DOM)で表現する。
=> レンダリングコスト: 高△
=> コードの可読性: 低△

#### 仮想DOMとは？
JavaScriptのオブジェクトで仮想的に作られたDOM。
いきなりDOMを操作しない。
仮想DOM(変更前) と 仮想DOM(変更後) で差分を確認してから、実際のDOMに同期する(差分検出処理 reconciliation)。
=> レンダリングコスト: 低○
=> コードの可読性: 高○

#### npm/yarn
npm/yarnは、JavaScriptのパッケージマネージャー
=>パッケージのインストール、アンインストール、アップデートなど。

- 読み込み時に依存関係を勝手に解決してくれる
- import先が明示的に分かれる
- NPM (レジストリ)に公開されているパッケージをコマンド一つで利用可能
- チーム内共有も簡単に

NPM: パッケージのレジストリ。オンライン上に世界中のNode.jsのパッケージが集約されている。
package.json: 設計書的な役割(プロジェクト(パッケージ)の詳細が書いている)
package-lock.json / yarn.lock: パッケージのバージョンをロックするファイル
node_modules: 各モジュールの実態(サイズが膨大のためGitHubにはあげない)

#### モジュールバンドラー
- 開発時に分割していたjs(css/image)ファイルを本番用に1つにまとめてくれる。
	→ 転送(HTTTPリクエスト)の最適化ができる
- 制作環境の機能が揃う
webpackなど。

#### トランスパイラ
新しいJavaScriptの記法(開発向け)を古い記法(本番向け)に変換してくれる。
BABELなど。

#### SPA (Single Page Application)
Webプリケーションの形式。1つのWebページによって、1つのアプリを構築する。最初にHTMLやCSS、JavaScriptを受け取った後は必要なデータだけをサーバに要求し差分を表示する(FechやXMLHttpRequestなどのJavaScript APIを介して更新する)
ページの更新速度が早い利点をもつ反面、最初のローディング時間が長くなってしまう特徴がある(=> SSR、SSG で軽減が見込める)

開発に利用されるフレームワーク: React、Angular、Vue.js など

https://qiita.com/seira/items/6767e222890c9890ecb9
https://zenn.dev/hinoshin/articles/aadfdd7ba958a9
https://devlog.grapecity.co.jp/spa-javascript-framework-in-2020/