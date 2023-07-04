## HTTPのステートレス
HTTPはステートレスなプロトコルです。ステート(状態)がレス(ない)なため、リクエストする度に、どんなリクエストをしたのかという情報を保持することができません

### じゃあサイトでログインした状態である、という情報はどうやって判断するの？

## Cookie
Webサーバーが発行し、ブラウザ(クライアント側)で保持されるテキストデータのことです。

> 下記は説明のためで実際はSessionを使用します
1. ブラウザにアクセスしたタイミングで、WebサーバーからCookieが発行され、ブラウザに渡される。
2. ブラウザはCookieを保存する。
3. 次回以降ブラウザは、CookieとともにWebサーバーへアクセスする。
4. WebサーバーはCookieの内容に合わせて、必要な情報を踏まえたページを表示する。

### Cookieだけだと、クライアント側で管理できるから改竄できてまう。。どうする？

## Session
一連の処理の始まりから終わりまでを表す概念のことで、ここではクライアントとサーバーの通信状態のことを指します。Sessionは、Webサーバーで保持されるデータになります。

1. ブラウザにアクセスしたタイミングで、WebサーバーからSeesion_idが発行され、Session_idを保持させたCookieをブラウザに渡される。
2. サーバーはSession_idとユーザー情報(ログイン情報など)を保存する。
3. 次回以降ブラウザは、Session_idを載せたCookieとともにWebサーバーへアクセスする。
5. WebサーバーはSession_idからユーザー情報を特定し、必要な情報を踏まえたページを表示する。