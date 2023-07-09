[How Next.js Works | Learn Next.js](https://nextjs.org/learn/foundations/how-nextjs-works)

### 開発環境と本番環境
- 開発中は、ローカル マシン上でアプリケーションを構築して実行します
- [本番環境への移行は、](https://nextjs.org/docs/going-to-production)アプリケーションをデプロイしてユーザーが使用できるようにするプロセスです。

#### Next.jsでは
- 開発段階では、Next.js は開発者とアプリケーションの構築エクスペリエンスに合わせて最適化します。[TypeScript](https://nextjs.org/docs/basic-features/typescript) と [ESLint の統合](https://nextjs.org/docs/basic-features/eslint)、 [高速更新](https://nextjs.org/docs/basic-features/fast-refresh)など、**開発者エクスペリエンス**の向上を目的とした機能が付属しています。
- 実稼働段階では、Next.js はエンドユーザーとアプリケーションの使用エクスペリエンスに合わせて最適化します。コードを変換して、パフォーマンスが向上し、アクセスしやすいものにすることを目的としています。

### Next.js コンパイラー　
[Compiler](https://nextjs.org/docs/advanced-features/compiler)
Next.jsには、Rustベースのプラットフォームである[SWC](http://swc.rs/)が組み込まれている。Next.js バージョン 12 以降はデフォルトで有効になっています。

### What is Minifying?
- コードの機能を変更せずに、不要なコードの書式設定とコメントを削除するプロセスです。
- ファイル サイズを削減することでアプリケーションのパフォーマンスを向上させることが目的です。
    
![](https://nextjs.org/static/images/learn/foundations/minifying.png)

- Next.js では、JavaScript および CSS ファイルは実稼働用に自動的に縮小されます。

### What is Bundling?
- 開発者は、アプリケーションをモジュール、コンポーネント、関数に分割し、それらを使用してアプリケーションのより大きな部分を構築します。
- これらの内部モジュールと外部サードパーティ パッケージをエクスポートおよびインポートすると、ファイルの依存関係が複雑に絡み合った状態が作成されます。 
- バンドルとは、ユーザーが Web ページにアクセスしたときにファイルのリクエストの数を減らすことを目的として、依存関係の Web を解決し、ファイル (またはモジュール) をブラウザー用に最適化されたバンドルにマージ (または「パッケージ化」) するプロセスです。  
    
![](https://nextjs.org/static/images/learn/foundations/bundling.png) 


### What is Code Splitting?
- 開発者は通常、アプリケーションを複数のページに分割し、異なる URL からアクセスできるようにします。これらの各ページは、アプリケーションへの一意の**エントリ ポイントになります。**
- コード分​​割は、アプリケーションのバンドルを各エントリ ポイントに必要な小さなチャンクに分割するプロセスです。
- 目標は、そのページの実行に必要なコードのみをロードすることで、アプリケーションの初期ロード時間を短縮することです。

- Next.js にはコード分割のサポートが組み込まれています。ディレクトリ内の各ファイル `pages/`は、ビルド中に自動的にコードが独自の JavaScript バンドルに分割されます。

- ページ間で共有されるコードは、その後のナビゲーションで同じコードを再ダウンロードすることを避けるために、別のバンドルにも分割されます。
- 最初のページの読み込み後、Next.js はユーザーが移動する可能性が高い他のページの[コードのプリロード](https://nextjs.org/docs/api-reference/next/link#:~:text=Defaults%20to%20false-,prefetch,-%2D%20Prefetch%20the%20page)を開始できます。
- [動的インポートは、](https://nextjs.org/docs/advanced-features/dynamic-import)最初にロードされるコードを手動で分割するもう 1 つの方法です。

### Build Time and Runtime
**ビルド時間**(またはビルド ステップ) は、アプリケーション コードを実稼働用に準備する一連のステップに付けられた名前です。    
アプリケーションを構築すると、Next.js はコードを運用環境に最適化されたファイルに変換し、[サーバー](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)にデプロイしてユーザーが使用できるようにします。   
これらのファイルには次のものが含まれます。  
- 静的に生成されたページの HTML ファイル
- [サーバー](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)上でページを[レンダリングする](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)ための JavaScript コード[](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)
- [クライアント](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)上でページをインタラクティブにするための JavaScript コード[](https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server)
- CSSファイル

**ランタイム**(またはリクエスト時間) とは、ユーザーのリクエストに応答してアプリケーションが実行される時間を指します。

### Client and Server
- クライアント: リクエストをサーバーに送信する。応答を受信して、インターフェースに変換する
- サーバー: コードを保存する。リクエストを受信し、処理内容を送り返す。

### What is Rendering?
Next.js では、下記の 3 種類のレンダリング方法が使用できます。  
- サーバー側レンダリング
- 静的サイト生成
- クライアントサイドレンダリング   
    
サーバーサイド レンダリングと静的サイト生成は、結果がクライアントに送信される前に外部データのフェッチと React コンポーネントの HTML への変換が行われるため、**プリレンダリング**とも呼ばれます。
    
#### クライアントサイドレンダリング vs. プリレンダリング
標準の React アプリケーションでは、ブラウザーは UI を構築するための JavaScript 命令とともに空の HTML シェルをサーバーから受け取ります。最初のレンダリング作業はユーザーのデバイスで行われるため、これは**クライアントサイドレンダリング**と呼ばれます。  
    
![](https://nextjs.org/static/images/learn/foundations/client-side-rendering.png)

対照的に、Next.js はデフォルトですべてのページを**プリレンダリング(サーバーサイドレンダリング)** します。
    
![](https://nextjs.org/static/images/learn/foundations/pre-rendering.png)


### サーバーサイドレンダリング
リクエスト**ごと**にサーバー上で HTML が生成されます。  
ページをインタラクティブにするために生成された HTML、JSON データ、および JavaScript 命令がクライアントに送信されます。
    
クライアントでは、HTML は高速な非対話型ページを表示するために使用されますが、React は JSON データと JavaScript 命令を使用してコンポーネントを対話型にします (たとえば、イベント ハンドラーをボタンにアタッチします)。このプロセスは**hydration: 水和**と呼ばれます。
   
Next.js では、 [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)を使用してサーバー側でページをレンダリングすることを選択できます。

> **注: React 18 および Next 12** ** では、**React server components** のアルファ版が導入されています。  サーバー コンポーネントはサーバー上で完全にレンダリングされるため、レンダリングにクライアント側の JavaScript は必要ありません。さらに、サーバー コンポーネントを使用すると、開発者は一部のロジックをサーバー上に保持し、そのロジックの結果のみをクライアントに送信できます。これにより、クライアントに送信されるバンドル サイズが削減され、クライアント側のレンダリング パフォーマンスが向上します。[React サーバー コンポーネントの詳細については、こちらをご覧ください](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)。

### 静的サイトの生成
静的サイト生成では、HTML はサーバー上で生成されますが、サーバー側のレンダリングとは異なり、実行時にサーバーは存在しません。代わりに、コンテンツはアプリケーションのデプロイ時にビルド時に一度生成され、HTML は [CDN](https://nextjs.org/learn/foundations/how-nextjs-works/cdns-and-edge) に保存されリクエストごとに再利用されます。

Next.js では、 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) を使用してページを静的に生成することを選択できます。

>**注:**　サイトを構築した _後_、 [増分静的再生成](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)を使用して静的ページを作成または更新 できます。これは、データが変更された場合にサイト全体を再構築する必要がないことを意味します。

Next.js の利点は、静的サイト生成、サーバー側レンダリング、クライアント側レンダリングなど、ユースケースに最も適したレンダリング方法をページごとに選択できることです。特定の使用例にどのレンダリング方法が適しているかについて詳しくは、[データ取得に関するドキュメント](https://nextjs.org/docs/basic-features/data-fetching/overview)を参照してください。

## What is the Network?
Next.js アプリケーションの場合、アプリケーション コードは**オリジン サーバー**、**コンテンツ配信ネットワーク (CDN)**、および**エッジ**に配布できます。

#### オリジンサーバー
- サーバーとは、アプリケーション コードの元のバージョンを保存して実行するメイン コンピューターを指します。
- オリジンサーバーはリクエストを受信すると、応答を送信する前に何らかの計算を行います。この計算作業の結果は、CDN (コンテンツ配信ネットワーク) に移動できます。

#### CDN (Content Delivery Network)
- CDN は静的コンテンツ (HTML や画像ファイルなど) を世界中の複数の場所に保存し、クライアントとオリジン サーバーの間に配置されます。
- 新しいリクエストが受信されると、ユーザーに最も近い CDN ロケーションがキャッシュされた結果で応答できます。  
- リクエストごとに計算を行う必要がなくなるため、オリジンの負荷が軽減されます。
- 地理的に近い場所から応答が返されるため、ユーザーにとっても高速になります。    
- Next.js では、プリレンダリングを事前に実行できるため、CDN は作業の静的な結果を保存するのに適しており、コンテンツ配信が高速化されます。  
    
![](https://nextjs.org/static/images/learn/foundations/cdn.png)

#### Edge
エッジは、ユーザーに最も近いネットワークの周縁 (_エッジ_) の一般化された概念です。 CDN はネットワークのエッジに静的コンテンツを保存するため、「エッジ」の一部と見なすことができます。

CDN と同様に、エッジ サーバーは世界中の複数の場所に分散されます。ただし、静的コンテンツを保存する CDN とは異なり、一部のエッジ サーバーはコードの小さなスニペットを実行できます。

**これは、キャッシュ**と**コード実行の**両方をユーザーに近い Edge で実行できることを意味します。

従来クライアント側またはサーバー側で行われていた一部の作業を Edge に移動することで、クライアントに送信されるコードの量が減り、ユーザーのリクエストの一部をすべて処理する必要がなくなるため、アプリケーションのパフォーマンスを向上させることができます。オリジンサーバーに戻るため、待ち時間が短縮されます。[こちらの Next.js を使用した Edge の例を参照してください](https://vercel.com/features/edge-functions#:~:text=Unlock%20the%20potential%20of%20edge%20computing)。

**追加のリソース:**
- [https://vercel.com/docs/concepts/edge-network/overview](https://vercel.com/docs/concepts/edge-network/overview?utm_source=next-site&utm_medium=learnpages&utm_campaign=learn_foundations_how-nextjs-works_cdns-and-edge)

