## Next.jsアプリを作成する
#### RreactでのWebアプリケーションを構築する
- webpack などのバンドラーを使用してバンドルし、Babel などのコンパイラーを使用してコードを変換する必要があります。
- コード分​​割などの運用環境の最適化を行う必要があります。
- パフォーマンスと SEO のために、一部のページを静的に事前レンダリングしたい場合があります。サーバー側レンダリングまたはクライアント側レンダリングを使用することもできます。
- React アプリをデータ ストアに接続するには、サーバー側のコードを記述する必要がある場合があります。
    
Next.js はこれらの問題を解決できます。しかし、そのようなフレームワークには適切なレベルの抽象化が必要です。そうでないと、あまり役に立ちません.  

- 直感的な[ページベースのルーティング システム (](https://nextjs.org/docs/basic-features/pages)[動的ルート](https://nextjs.org/docs/routing/dynamic-routes)のサポート付き)
- [プリレンダリング](https://nextjs.org/docs/basic-features/pages#pre-rendering)、[静的生成](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)(SSG) と[サーバー側レンダリング](https://nextjs.org/docs/basic-features/pages#server-side-rendering)(SSR) の両方がページごとにサポートされています。
- 自動コード分割によるページ読み込みの高速化
- 最適化されたプリフェッチによる[クライアント側ルーティング](https://nextjs.org/docs/routing/introduction#linking-between-pages)
- [組み込みの CSS](https://nextjs.org/docs/basic-features/built-in-css-support)および[Sass サポート](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)、およびあらゆる[CSS-in-JS](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js)ライブラリのサポート
- [高速リフレッシュ](https://nextjs.org/docs/basic-features/fast-refresh)をサポートする開発環境
- サーバーレス関数を使用して API エンドポイントを構築するための[API ルート](https://nextjs.org/docs/api-routes/introduction)
- 拡張可能
