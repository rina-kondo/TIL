## ページの作成
Next.js におけるページは、[`pages`ディレクトリ](https://nextjs.org/docs/basic-features/pages)内のファイルからエクスポートされた React コンポーネントです。

ページは、**ファイル名**に基づいてルートに関連付けられます。つまり、[`pages`ディレクトリ](https://nextjs.org/docs/basic-features/pages)配下に JS ファイルを作成するだけで、そのファイルへのパスが URL パスになります。   
- `pages/index.js`は、ルート`/`に関連付けられています。
- `pages/posts/first-post.js`は、`/posts/first-post`ルートに関連付けられています。

### Linkコンポーネント
```js
import Link from 'next/link';

export default function LinkExample() {	
	return(
		<>
			<Link href="/posts/first-post">this page!</Link>
			<Link href="/">root page!</Link>
		</>
	)
}

```

- この[`Link`](https://nextjs.org/docs/api-reference/next/link)コンポーネントにより、同じ Next.js アプリ内の 2 つのページ間の**クライアント側のナビゲーションが可能になります。**
- クライアント側のナビゲーションとは、ページの遷移が**JavaScript を使用し**て行われること(ブラウザがページ全体をロードしていないこと)を意味します。
- ブラウザーによって実行されるデフォルトのナビゲーション`<a href="…">` よりも高速です。

**注:** Next.js アプリの _外部_ ページにリンクする必要がある場合は、`<Link>`ではなく、`<a>`タグを使用してください。

### コードの分割とプリフェッチ
Next.js はコード分割を自動的に行うため、各ページはそのページに必要なものだけを読み込みます。つまり、ホームページが表示されるとき、最初は他のページのコードは提供されません。  
    
これにより、ページが数百ある場合でも、ホームページがすぐに読み込まれることが保証されます。  
    
さらに、Next.js の実稼働ビルドでは、[`Link`](https://nextjs.org/docs/api-reference/next/link)コンポーネントがブラウザーのビューポートに表示されるたびに、Next.js はリンクされたページのコードをバックグラウンドで自動的に**プリフェッチします。** リンクをクリックするまでに、目的のページのコードはバックグラウンドですでに読み込まれており、ページの遷移はほぼ瞬時に行われます。

- `Link`コンポーネントの詳細については[ API リファレンス`next/link`](https://nextjs.org/docs/api-reference/next/link)
- ルーティング全般について[ルーティング ドキュメント](https://nextjs.org/docs/routing/introduction)
