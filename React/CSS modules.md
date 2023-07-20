Next.js 前提   
    
- CSS モジュールは、一意のクラス名を自動的に作成することで、CSS をローカルにスコープします。衝突を心配することなく、異なるファイルで同じクラス名を使用できます。
- CSS モジュールはオプションの機能であり、拡張子がのファイルに対してのみ有効.module.cssです。通常の<link>スタイルシートとグローバル CSS ファイルは引き続きサポートされます。
- In production, all CSS Module files will be automatically concatenated into many minified and code-split .css files. These .css files represent hot execution paths in your application, ensuring the minimal amount of CSS is loaded for your application to paint.

## .modules.scssファイルをどこに配置するか
1. `components`ディレクトリと同じ階層に置く  
`components/Button.tsx`のスタイルは`components/Button.module.scss`に書くパターン

2. `styles`ディレクトリを作ってcomponentsと同じ階層で配置  
`components/Button.tsx`のスタイルは`styles/components/Button.module.scss`に書くパターン  


#### 参考:  
[Styling: CSS Modules | Next.js](https://nextjs.org/docs/pages/building-your-application/styling/css-modules#global-styles)  
[Next.jsにCSS Modulesを導入する](https://zenn.dev/catnose99/scraps/5e3d51d75113d3#comment-1a556066794f35)  
[React CSSで悩む全ての人へ【2022年版】 | ramble - ランブル -](https://ramble.impl.co.jp/1414/#toc2)
