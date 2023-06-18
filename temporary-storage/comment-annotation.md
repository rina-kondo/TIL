[TODO: 以外のアノテーションコメントをまとめた - Qiita](https://qiita.com/taka-kawa/items/673716d77795c937d422)

# よく使われる記法と意味

|記法|意味|
|:--:|:--:|
|TODO:|あとで追加、修正するべき機能がある。|
|FIXME:|既知の不具合があるコード。修正が必要。|
|HACK:|あまりきれいじゃないコード。リファクタリングが必要。|
|XXX:|危険！動くけどなぜうごくかわからない。|
|REVIEW:|意図した通りに動くか、見直す必要がある。|
|OPTIMIZE:|無駄が多く、ボトルネックになっている。|
|CHANGED:|コードをどのように変更したか。|
|NOTE:|なぜ、こうなったという情報を残す。|
|WARNING:|注意が必要。|

## VS Codeだと
https://github.com/Gruntfuggly/todo-tree
ファイルに点在しているTODOなどのメモを一覧で見ることができます。
Todo tree: Add Tagを設定するだけで、タグを追加できます。デフォルトでは`TODO`,`FIXME`のみですが、簡単にアレンジすることができます。

![image2](https://raw.githubusercontent.com/Gruntfuggly/todo-tree/master/resources/screenshot.png)

## Atomだと
`TODO`, `FIXME`, `CHANGED`, `XXX`, `IDEA`, `HACK`, `NOTE`, `REVIEW`, `NB`, `BUG`, `QUESTION`, `COMBAK`, `TEMP`, `DEBUG`, `OPTIMIZE`, and `WARNING`がアノテーションコメントとして認識されて、ハイライトされます。

さらに、todo-showというパッケージをインストールすると、ファイルに点在しているTODOなどのメモを一覧で表示してくれます。
https://atom.io/packages/todo-show 



