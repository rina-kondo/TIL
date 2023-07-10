## Assets, Metadata, and CSS
[Assets, Metadata, and CSS | Learn Next.js](https://nextjs.org/learn/basics/assets-metadata-css)

### Static Assets
- Next.js は、ルート ディレクトリにある`public`フォルダーの下に画像などの静的ファイルを提供できます。
- `public`内部のファイル、ベース URL(`/`)  から始まるコードによって参照できるようになります。
```jsx
import Image from 'next/image'
 
export function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}
```

- [ビルド時](https://nextjs.org/docs/app/api-reference/next-cli#build)に`public`ディレクトリ内にあるアセットのみがNext.js によって提供されます。実行時に追加されたファイルは同様に使用できません。永続的なファイルストレージおいては、[AWS S3](https://aws.amazon.com/s3/)などのサードパーティ サービスの使用をお勧めします。

### Imageコンポーネント
- Next.js は、デフォルトで画像の最適化もサポートしています。これにより、[WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp)などの最新形式で画像のサイズ変更、最適化、提供が可能になります。ビューポートが小さいデバイスに大きな画像を送信することが回避されます。また、Next.js が将来の画像形式を自動的に採用し、それらの形式をサポートするブラウザーに提供できるようになります。
- Next.js は、ビルド時にイメージを最適化するのではなく、ユーザーのリクエストに応じてオンデマンドでイメージを最適化します。画像の数はビルド時間に影響しません。
- 画像はデフォルトで遅延ロードされます。画像はビューポートにスクロールされるときに読み込まれます。
- 画像は常に、Google が[検索ランキングに使用する](https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html)[Web の核心である](https://web.dev/vitals/#core-web-vitals)[累積レイアウト シフトを](https://web.dev/cls/)回避する方法でレンダリングされます。
- [`next/image`](https://nextjs.org/docs/api-reference/next/image)これはプロフィール写真を表示するために使用した例です。およびprops は`height`、`width`ソース イメージと同じアスペクト比を持つ、希望のレンダリング サイズである必要があります。

- 自動画像最適化の詳細については、[ドキュメントを](https://nextjs.org/docs/basic-features/image-optimization)参照してください。

### Metadata
HTMLの`<head></head>`に記載するメタデータの変更.   
`Head`コンポーネントのインポート
```jsx
import Head from 'next/head';
//...
	<Head>
		<title>First Post</title>
	</Head>
```
### サードパーティのJavaScript
```jsx
import Script from 'next/script';

<Script
	src="https://connect.facebook.net/en_US/sdk.js"
	strategy="lazyOnload"
	onLoad={()=>
		console.log(`script loaded correctly, window.FB has been populated`;
	}
/>
```
- `strategy`: サードパーティのスクリプトをいつロードするかを制御します。
	- `beforeInteractive`: Next.js コードの前、およびページのハイドレーションが発生する前にスクリプトを読み込みます。
	- `afterInteractive`: (**デフォルト**) スクリプトを早い段階でロードしますが、ページ上である程度のハイドレーションが発生した後にロードします。
	- `lazyOnload`: 後でブラウザのアイドル時間中にスクリプトをロードします。
	- `worker`: (実験的) Web ワーカーにスクリプトをロードします。
	- Refer to the [`next/script`](https://nextjs.org/docs/app/api-reference/components/script#strategy) API reference documentation to learn more about each strategy and their use cases.
- 特定のイベントの発生後に実行
	- `onLoad`: スクリプトの読み込みが完了した直後に JavaScript コードを実行するために使用されます。
	- `onReady`: スクリプトの読み込みが完了した後、コンポーネントがマウントされるたびにコードを実行します。
	- `onError`: スクリプトのロードに失敗した場合にコードを実行します。

- このコンポーネントの詳細については、[`Script`ドキュメントを](https://nextjs.org/docs/basic-features/script)参照してください。

### CSS style
#### CSSモジュール
[CSS モジュールを使用する](https://nextjs.org/docs/basic-features/built-in-css-support)と、一意のクラス名を自動的に作成することで、CSS をコンポーネント レベルでローカルにスコープ設定できます。これにより、クラス名の衝突を心配することなく、異なるファイルで同じ CSS クラス名を使用できるようになります。  
    
**重要:** [CSS モジュール](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)を使用するには、CSS ファイル名が`.module.css`で終わる必要があります。

**`pages/file.js`**
```jsx
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>...</Head>
      ...
    </Layout>
  );
}
```

**`conponents/layout.js`**
```jsx
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

**`componets/layout.module.css`**
```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

#### 一意のクラス名を自動的に生成
- これが[CSS モジュール](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)の機能です。_一意のクラス名が自動的に生成されます_。CSS モジュールを使用している限り、クラス名の衝突を心配する必要はありません。

- Next.js のコード分割機能は[CSS モジュール](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)でも機能します。これにより、各ページにロードされる CSS の量が最小限に抑えられます。これにより、バンドル サイズが小さくなります。
- [CSS モジュールは](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)ビルド時に JavaScript バンドルから抽出され、Next.js によって自動的に読み込まれる`.css`ファイルを生成します。

### Global Styles
**`pages/_app.js`**
```jsx
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

**`styles/global.css`**
```css
.piyo {
	piyo: piyo;
}
```

- `_app.js`のデフォルトのエクスポートは、`_app.js`アプリケーション内のすべてのページをラップするトップレベルの React コンポーネントです。このコンポーネントを使用すると、ページ間を移動するときに状態を維持したり、ここで行っているようにグローバル スタイルを追加したりできます。
- [`_app.js`ファイル](https://nextjs.org/docs/advanced-features/custom-app)について詳しくは、こちらをご覧ください。

- `_app.js` を変更した場合、`$ npm run dev`でサーバーを再起動してください。 

### Polishing Layout
 **`styles/utils.module.css`**

### Styling Tips
#### Using `clsx` library to toggle classes
[`clsx`](https://www.npmjs.com/package/clsx)は、クラス名を簡単に切り替えることができるシンプルなライブラリです.    
    
clsxインストール
```console
$ npm install clsx
```
使用方法
```css
.success {
  color: green;
}
.error {
  color: red;
}
```

```jsx
import styles from './alert.module.css';
import { clsx } from 'clsx';

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
```


#### Customizing PostCSS Config
- Next.js は、設定なしですぐに[PostCSS](https://postcss.org/)を使用して CSS をコンパイルします。
- PostCSS 構成をカスタマイズするには、 [`postcss.config.js`](https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-plugins)というトップレベルのファイルを作成します。これは、[ Tailwind CSS](https://tailwindcss.com/)のようなライブラリを使用している場合に便利です。
    
Tailwindインストール
```consol
$ npm install -D tailwindcss autoprefixer postcss
```

- カスタム PostCSS 構成の詳細: [PostCSS ドキュメント](https://nextjs.org/docs/advanced-features/customizing-postcss-config
-  Tailwind CSS: [サンプル](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)

#### Using Sass
You can use component-level Sass via [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) and the `.module.scss` or `.module.sass` extension.
    
sassインストール
```consol
$ npm install -D sass
```
