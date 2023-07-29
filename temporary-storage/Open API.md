[OpenAPI-Specification/versions/3.1.0.md at main · OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasDocument)


### Open API 
OpenAPI仕様（旧Swagger仕様）は、REST APIのためのAPI記述形式です。

##### 記述する内容
- 利用可能なエンドポイント(/user)と各エンドポイントでの操作(GET /users, POST /users)
- パラメター操作や入出力
- 認証方法


### Swagger
OpenAPIを利用しREST APIを設計するために使用するツールセット

|ツール名|説明|
|---|---|
|[Swagger Editor](http://editor.swagger.io/)|OpenAPI 定義を記述できるブラウザーベースのエディター。|
|[Swagger UI](https://swagger.io/tools/swagger-ui/)|OpenAPI 定義をインタラクティブなドキュメントとしてレンダリングします。|
|[Swagger Codegen](https://github.com/swagger-api/swagger-codegen)|OpenAPI 定義からサーバー スタブとクライアント ライブラリを生成します。|


### モックサーバーの構築
モックサーバーを使うことでサーバー側の環境を構築せずともOpenAPIのファイルがあれば仮想のデータ通信をフロント側で試すことができます。   
下記はReact×TypeScripの環境の構築例.  
[モックサーバーの構築](https://qiita.com/KNR109/items/7e094dba6bcf37ed73cf#%E3%83%A2%E3%83%83%E3%82%AF%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)


### OpenAPIのデータの型
<details>
  <summary>データ型一覧</summary>

|型|説明|
|---|---|
|integer|整数|
|number|浮動小数点|
|string|文字列|
|boolean|真偽値|
|array|配列|
|object|オブジェクト|

integer型は下記のフォーマットに分類されます。

|フォーマット|説明|
|---|---|
|int32|符号付き32ビット整数|
|int64|符号付き64ビット整数|

number型は下記のフォーマットに分類されます。

|フォーマット|説明|
|---|---|
|float|浮動小数|
|double|倍精度浮動小数|

string型は下記のフォーマットに分類されます。

|フォーマット|説明|
|---|---|
|date|RFC3339(例: 2022-11-06)|
|date-time|RFC3339(例: 2022-11-06T19:20:30+01:00)|
|email|メールアドレス|
|password|パスワード|
|uuid|uuid|

</details>

### スキーマの詳細
```yaml
openapi: 3.0.3  # OpenAPIのバージョン

info:  # OpenAPIのメタデータ
  title: Exsample API
  description: サンプル API
  version: 1.0.0
  contact:
    name: Exsample Developent
    email: dev@example.com
    
servers: # APIを提供しているサーバーを定義
  - url: 'http://localhost:88'
    description: 開発環境
  - url: "http://sample.com"
    description: "本番環境"

tags: # APIを整理するためのタグ
  - name: "users" 
    description: "ユーザーの操作" 
    
paths: # APIで利用できるパスと操作を定義
  '/users/{user_id}':
    get:
      description: ユーザ詳細
      tags:
        - user
      operationId: UserShow
      parameters:
        - $ref: '#/components/parameters/PathUserId'
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
    put:
      description: ユーザ更新
      tags:
        - user
      operationId: UserUpdate
      parameters:
        - $ref: '#/components/parameters/PathUserId'
      requestBody:
        $ref: '#/components/requestBodies/User'
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  '/api/v1/users':                               # POSTを追加でもシンプルに書けます
    post:
      description: ユーザ作成
      tags:
        - user
      operationId: UserCreate
      requestBody:
        $ref: '#/components/requestBodies/User'
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  parameters:
    PathUserId:
      name: user_id
      in: path
      required: true
      schema:
        type: integer
      description: ユーザID
  requestBodies:
    User:
      content:
        application/json:
          schema:
            type: object
            required:
              - name
            properties:
              name:
                type: string
              age:
                type: integer
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        age:
          type: integer
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time}
```


##### メタデータ

|フィールド|型|説明|
|---|---|---|
|summary|string|操作の概要|
|description|string|操作の詳細説明|
|tags|[string]|タグを付与できる|
|deprecated|boolean|廃止になったかを定義する|


##### リクエストパラメータ

|フィールド|型|説明|
|---|---|---|
|name|string|パラメータ名を指定する|
|in|string|パラメータの場所を指定する(query,header,path,cookie)|
|description|string|パラメータに関する説明を記載する|
|required|boolean|パラメータが必須かを定義する|
|schema|object|パラメータお型定義をする。JSONスキーマを元にした記述|
|example||サンプルデータを記述|


##### リクエストボディ

|フィールド|型|説明|
|---|---|---|
|description|string|リクエストボディの説明|
|required|boolean|必須項目の判定|
|content|object|リクエストボディの内容|
|content.{media}|object|メディアタイプをキーにレスポンスボディを定義|
|content.{media}.schema|object|リクエストボディを定義|


#### パラメータ使い分け
- パスパラメータ(URI): 特定のリソースを識別するために必要な情報
- クエリパラメータ(URI): 特定のリソース操作して取得する際に必要な情報
- リクエストボディ(JSON): 追加、更新する際の内容


#### security

OpenAPIで定義できる認証認可は下記。

|種別|形式|説明|
|---|---|---|
|http|Basic|Basic認証|
|http|Bearer|JWTを利用した認可|
|apikey|header|APIkeyを利用した認可|
|apikey|cookie|ログインセッション|
|oauth2|-|OAuth2.0|

例) 記事を新規投稿(POST)する時にAPI keyを要求する
```yaml
components:
  securitySchemes:
    apikey_auth:
      description: "API key authorization"
      type: apiKey
      in: header
      name: "X-Api-Key"
```
コメントのPOSTの箇所でコンポーネントに定義した`apikey_auth`を呼び出す。
```yaml
post:
      summary: "コメントの新規作成"
      tags: ["comments"]
      deprecated: false
      parameters:
        - $ref: "#/components/parameters/CommentId"
      security:
        - apikey_auth: []
```




[OpenAPI (Swagger) まとめ - Qiita](https://qiita.com/KNR109/items/7e094dba6bcf37ed73cf#%E3%83%A2%E3%83%83%E3%82%AF%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)
[OpenAPI Generatorに適したOpenAPIの書き方 - ZOZO TECH BLOG](https://techblog.zozo.com/entry/how-to-write-openapi-for-openapi-generator)
[スキーマファースト開発のためのOpenAPI（Swagger）設計規約 | フューチャー技術ブログ](https://future-architect.github.io/articles/20200409/)
