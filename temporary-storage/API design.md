## HTTPリクエスト
- リクエストライン
- ヘッダー
- ボディー
で構成される

#### リクエストライン
`メソッド URI HTTPバージョン`で行う
```
GET /index.html HTTP/1.1 
```

#### リクエストヘッダー
リクエストについての情報や属性(メタデータ)
```
Host: localhost:8080 Connection: keep-alive User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36 Accept: */* Referer: http://localhost:8080/ Accept-Encoding: gzip, deflate, sdch, br Accept-Language: ja,en-US;q=0.8,en;q=0.6 Cookie: user_id=12345678
```
#### リクエストボディ
リクエスト時に送るデータが入る

## レスポンス
- ステータスライン
- ヘッダー
- ボディー
で構成される

#### ステータスライン
`HTTPバージョン ステータスコード フレーズ`
```
HTTP/1.1 200 OK
```

#### ヘッダー
メタ情報など
```
alt-svc: quic=":443"; ma=2592000; v="44,43,39,35" cache-control: private, max-age=0 content-encoding: br content-type: text/html; charset=UTF-8 date: Thu, 23 Aug 2018 15:37:28 GMT expires: -1 server: gws status: 200 x-frame-options: SAMEORIGIN x-xss-protection: 1; mode=block
```

#### ボディー
具体的な応答データ

## REST
RESTとは、分散システムにおいて複数のソフトウェアを連携させるのに適した設計原則の一つ。  
狭義には、それをWebシステムに適用したソフトウェアの設計様式を指し、一般にはこの意味で用いられることがほとんどである。

### RESTful
RESTfulとはRESTで求められている原則に従っていることを指します。

### REST原則
- クライアント・サーバー制約
- ステートレス
- キャッシュ(クライアントサイド)
- 統一インターフェース
- レイヤーシステム
- コードオンデマンド

## Web API設計
- 短くて入力がしやすい
- 省略しない
- 大文字と小文字が混ざってない(基本は小文字)
- 単語はハイフン繋ぎ
- 単語は複数形を使う
- エンコードが必要な文字を使わない
- 更新がしやすい
- ルールが統一されている

### クエリパラメーターとパスパラメーター

|種類|API|
|---|---|
|クエリパラメター|http:///example.com/api/v1/posts?id=1|
|パスパラメター|http:///example.com/api/v1/posts/1|

クエリパラメーターとパスパラメーターの使い分け

- 一意なリソースを表す場合は**パスパラメター**を利用
- 省略しても良い場合は**クエリパラメター**

具体的には検索する際のリクエストは一意にパスが定まらないのでクエリパラメタを利用する。

```
http:///example.com/api/v1/users?name="suzuki"
```

#### Open APIの場合
- パスパラメータ(URI): 特定のリソースを識別するために必要な情報
- クエリパラメータ(URI): 特定のリソース操作して取得する際に必要な情報
- リクエストボディ(JSON): 追加、更新する際の内容

### [HTTP レスポンスステータスコード](https://developer.mozilla.org/ja/docs/Web/HTTP/Status)

### レスポンスデータのフォーマット 
- XML
- JSON

### データ内部構造の設計
- エンベロープを使わない (リクエストヘッダーを使用する)
- ネスト構造を減らす
- プロパティの命名規則を統一する 
- 日付指定 (RFC3339(W3C-DTF)形式 を使う)

### 認証
#### JSON Web Token
JSON Web Token(JWT)は"ジョット"とよび、JSON形式のデータで署名による改ざんチェックを行います。

- ヘッダー
- ペイロード
- 署名
    
**【ヘッダー】**   
署名で利用するアルゴリズムが定義されている。
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**【ペイロード】**   
ペイロードは保存したいデータの実態が入っている。  
- subは同一Issuer内での識別子(ユーザーID等)
- iatはjwtが発行された日時を表す
```
{
  "sub": "1234567890",
  "iat": 1516239022
}
```
**【署名】**.   
署名はデータが改ざんされていないかを確認する。    
 

#### Authorizationヘッダー
認証で利用するヘッダーとしてAuthorizationヘッダーがあります。  
    
先ほど紹介したJWTを利用する場合にAuthorizationヘッダーにトークンを格納しリクエストを送ります。
```
Authorization: [type] [credentials]
```

##### `[type]`

|名前|説明|
|---|---|
|Basic|ベーシック認証でIDとパスワードを平文で送る|
|Bearer|OAuth2.0でJWTはこれを使う|
|Digest|ダイジェスト認証でIDとパスワードをハッシュ化して送る|
|OAuth|OAuth1.0|

##### `[credentials]`
具体的にな認証情報を入れます。


### セキュリティー
#### XSS

XSSは悪意あるユーザーが正規のサイトに不正なスクリプトを埋め込み、正規ユーザーか情報を不正に抜き出すことができる。

対策としてはレスポンスヘッダーに下記を追加する

- `X-XSS-Protection`: `1`に設定することでXSSフィルタリングが有効化
- `X-Frame-Options`: `DENY`でframeタグの呼び出しを拒否する
- `X-Content-Type-Options`: `nosniff`でIEの脆弱性を対応する

#### CSRF
本来拒否すべきアクセス元からのリクエストを処理してしまう。
対策としては下記がある

- アクセス許可していないリクエストを拒否する
    - X-API-Key
    - Authentication
- 悪意のある攻撃者が推測しずらいトークンを発行し照合処理行う
    - X-CSRF-TOKEN

#### HTTP
HTTPは通信経路が暗号化されていないので盗聴されやすい。

対策方法としてはHTTPSを利用する。

#### JWT

先ほど紹介したJWTはクライアント側で編集ができるので、サーバー側での検証が不十分だった場合、改ざんがされた情報を受け入れてしまう可能性がある。

対策方法としてはヘッダーのアルゴリズム(alg)にnoneを指定しない。


