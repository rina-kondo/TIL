
## 型とパラメータ
```typescript
	@ApiProperty({
	  description: 'The age of a cat',
	  minimum: 1,
	  default: 1,
	})
	age: number;

// 配列
	@ApiProperty({ type: [String] })
	names: string[];

// 列挙型
	@ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
	role: UserRole;
		// もしくは
	export enum UserRole {
	  Admin = 'Admin',
	  Moderator = 'Moderator',
	  User = 'User',
	}
		// 使用例
	@ApiQuery({ name: 'role', enum: UserRole })
	async filterByRole(@Query('role') role: UserRole = UserRole.User) {}
	// enumの再利用 (ex. CatDetail内でCatBreadを引用)
	export class CatDetail {
	  @ApiProperty({ enum: CatBreed, enumName: 'CatBreed' })
	  breed: CatBreed;
	}

// oneOf
	type Pet = Cat | Dog;
	
	@ApiProperty({
	  type: 'array',
	  items: {
	    oneOf: [
	      { $ref: getSchemaPath(Cat) },
	      { $ref: getSchemaPath(Dog) },
	    ],
	  },
	})
	pets: Pet[];

	// Extra modelsを作成することで引用できるようになる
	@ApiExtraModels(Cat)
	export class CreateCatDto {}

```

```typescript
@ApiBody({ type: [CreateUserDto] })
createBulk(@Body() usersDto: CreateUserDto[])
```

## オペレーション
```typescript
// タグ
	@ApiTags('cats')
	@Controller('cats')
	export class CatsController {}

// ヘッダー
	@ApiHeader({
	  name: 'X-MyHeader',
	  description: 'Custom header',
	})
	@Controller('cats')
	export class CatsController {}
```

### レスポンス
```ts
	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
	// ↓デコレータでステータスコードを指定する記法
	@ApiForbiddenResponse({ description: 'Forbidden.'})
	async create(@Body() createCatDto: CreateCatDto) {
	  this.catsService.create(createCatDto);
	}


// 戻りモデルの指定
	// モデルの定義
	export class Cat {
	  @ApiProperty()
	  id: number;
	
	  @ApiProperty()
	  name: string;
	
	  @ApiProperty()
	  age: number;
	
	  @ApiProperty()
	  breed: string;
	}
	
	// モデルの使用
	@ApiTags('cats')
	@Controller('cats')
	export class CatsController {
	  @Post()
	  @ApiCreatedResponse({
	    description: 'The record has been successfully created.',
	    // 戻りモデルの指定
	    type: Cat,
	  })
	  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
	    return this.catsService.create(createCatDto);
	  }
```


#### ステータスコードのデコレータ一覧

<details>
  <summary>ステータスコードのデコレータ一覧</summary>

(ステータスコードと説明は GPTから引用)

|デコレータ|HTTP ステータスコード|説明|
|---|---|---|
|`@ApiOkResponse()`|200|リクエストが正常に完了したことを示します。|
|`@ApiCreatedResponse()`|201|新たにリソースが作成されたことを示します。|
|`@ApiAcceptedResponse()`|202|リクエストが受け入れられ、非同期処理が開始されたことを示します。|
|`@ApiNoContentResponse()`|204|リクエストは成功したが、返すべきコンテンツがないことを示します。|
|`@ApiMovedPermanentlyResponse()`|301|リクエストしたリソースが恒久的に新しいURLに移動されたことを示します。|
|`@ApiFoundResponse()`|302|リクエストしたリソースが一時的に新しいURLに移動されたことを示します。|
|`@ApiBadRequestResponse()`|400|サーバーがリクエストを解析できなかったことを示します。|
|`@ApiUnauthorizedResponse()`|401|リクエストが認証に失敗したことを示します。|
|`@ApiNotFoundResponse()`|404|リクエストされたリソースが見つからなかったことを示します。|
|`@ApiForbiddenResponse()`|403|リクエストが許可されていないことを示します。|
|`@ApiMethodNotAllowedResponse()`|405|リクエストメソッドが許可されていないことを示します。|
|`@ApiNotAcceptableResponse()`|406|サーバーがリクエストの "Accept" ヘッダーと一致するレスポンスを生成できないことを示します。|
|`@ApiRequestTimeoutResponse()`|408|クライアントがリクエストを中断したことを示します。|
|`@ApiConflictResponse()`|409|リクエストがサーバーの現在の状態と競合することを示します。|
|`@ApiPreconditionFailedResponse()`|412|リクエストヘッダーの前提条件がサーバーにより評価され、それがfalseになったことを示します。|
|`@ApiTooManyRequestsResponse()`|429|クライアントが指定した時間内に許可されたリクエスト数を超えたことを示します。|
|`@ApiGoneResponse()`|410|リクエストされたリソースが永久的に削除されていることを示します。|
|`@ApiPayloadTooLargeResponse()`|413|リクエストが大きすぎるため、サーバーが処理できないことを示します。|
|`@ApiUnsupportedMediaTypeResponse()`|415|リクエストがサポートされていないメディアタイプであることを示します。|
|`@ApiUnprocessableEntityResponse()`|422|サーバーが理解できる形式のリクエストであるが、リクエスト内の指示を適用できないことを示します。|
|`@ApiInternalServerErrorResponse()`|500|サーバー内部でエラーが発生したことを示します。|
|`@ApiNotImplementedResponse()`|501|サーバーがリクエストを実装していないことを示します。|
|`@ApiBadGatewayResponse()`|502|サーバーがゲートウェイまたは|


</details>


### ファイルのアップロード
[ファイル アップロード](https://docs.nestjs.com/techniques/file-upload)手法を使用した例
```typescript
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'List of cats',
  type: FileUploadDto,
})
uploadFile(@UploadedFile() file) {}

// FileUpliadDto
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
```


## セキュリティ
```typescript
// セキュリティの定義
	@ApiSecurity('basic')
	@Controller('cats')
	export class CatsController {}
	
	// ベースドキュメントにセキュリティ定義を追加
	const options = new DocumentBuilder().addSecurity('basic', {
	  type: 'http',
	  scheme: 'basic',
	});

// 下記は組み込みされているため簡易的に定義可能

// 基本認証
	@ApiBasicAuth()
	@Controller('cats')
	export class CatsController {}
	//ベースドキュメント
	const options = new DocumentBuilder().addBasicAuth();

// ベアラー認証
	@ApiBearerAuth()
	@Controller('cats')
	export class CatsController {}
	
	//ベースドキュメント
	const options = new DocumentBuilder().addBearerAuth();

// OAuth2認証
	@ApiOAuth2(['pets:write'])
	@Controller('cats')
	export class CatsController {}
	
	//ベースドキュメント
	const options = new DocumentBuilder().addOAuth2();

// Cookie認証
	@ApiCookieAuth()
	@Controller('cats')
	export class CatsController {}
	//ベースドキュメント
	const options = new DocumentBuilder().addCookieAuth('optional-session-id');

```


## マップされた型

以下のDTO (Data Transfer Object = データ転送オブジェクト)を構築する場合
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}

export class AdditionalCatInfo {
  @ApiProperty()
  color: string;
}
```
### Partial
**`PartialType`:** 
型をプロパティ全て引用して、下記の条件を含めた新しい型を生成
- 型定義やバリデーションは引き継がれる
- それぞれのプロパティが**オプショナルになる**
```typescript
export class UpdateCatDto extends PartialType(CreateCatDto) {}
```

### Pick
**`PickType`:** 
プロパティのセットを選択して新しい型(クラス)を作成
```typescript
export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}
```

#### Omit
**`OmitType`:** 
すべてプロパティから不要なプロパティを選択して、それらを除いた新しい型(クラス)を作成
```typescript
export class UpdateCatDto extends OmitType(CreateCatDto, ['name'] as const) {}
```

#### Intersection
複数の型を組み合わせて新しい型を作成
```typescript
export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}
```


#### Composition
上記の合わせ技.  
（下記は`name`プロパティを引用してオプショナルにして新しい型を作成）
```typescript
export class UpdateCatDto extends PartialType(
  OmitType(CreateCatDto, ['name'] as const),
) {}
```

## デコレータ

|デコレータ|適用対象|説明|
|---|---|---|
|`@ApiBasicAuth()`|メソッド/コントローラー|Basic認証の使用を示す|
|`@ApiBearerAuth()`|メソッド/コントローラー|Bearer認証の使用を示す|
|`@ApiBody()`|メソッド|リクエストのボディパラメータを定義する|
|`@ApiConsumes()`|メソッド/コントローラー|APIが受け入れるMIMEタイプを指定する|
|`@ApiCookieAuth()`|メソッド/コントローラー|Cookie認証の使用を示す|
|`@ApiExcludeController()`|コントローラ|特定のコントローラをAPIドキュメントから除外する|
|`@ApiExcludeEndpoint()`|メソッド|特定のエンドポイントをAPIドキュメントから除外する|
|`@ApiExtension()`|メソッド|OpenAPI拡張フィールドを指定する|
|`@ApiExtraModels()`|メソッド/コントローラー|追加のモデルをAPIドキュメントに含める|
|`@ApiHeader()`|メソッド/コントローラー|リクエストヘッダーを定義する|
|`@ApiHideProperty()`|モデル|特定のプロパティをAPIドキュメントから隠す|
|`@ApiOAuth2()`|メソッド/コントローラー|OAuth2認証の使用を示す|
|`@ApiOperation()`|メソッド|特定の操作を定義する|
|`@ApiParam()`|メソッド|パスパラメータを定義する|
|`@ApiProduces()`|メソッド/コントローラー|APIが生成するMIMEタイプを指定する|
|`@ApiProperty()`|モデル|モデルのプロパティを定義する|
|`@ApiPropertyOptional()`|モデル|オプショナルなモデルのプロパティを定義する|
|`@ApiQuery()`|メソッド|クエリパラメータを定義する|
|`@ApiResponse()`|メソッド/コントローラー|レスポンスのステータスコードと内容を定義する|
|`@ApiSecurity()`|メソッド/コントローラー|セキュリティ要件を定義する|
|`@ApiTags()`|メソッド/コントローラー|APIドキュメントにタグを追加する|


## Swagger(CLI)プラグイン

### クラス定義の簡素化
#### `"classValidatorShim": false`（デフォルト）
```ts
export class CreateUserDto {
	@ApiProperty()   
	email: string;
	
	@ApiProperty()
	password: string;
	
	@ApiProperty({ enum: RoleEnum, default: [], isArray: true })   
	roles: RoleEnum[] = []; 
	
	@ApiProperty({ required: false, default: true })   
	isEnabled?: boolean = true; 
}
```

#### `"classValidatorShim": true`（Swaggerプラグインを有効化）

```ts
export class CreateUserDto {
	email: string;   
	password: string;   
	roles: RoleEnum[] = [];   
	isEnabled?: boolean = true; 
}
```

<details>
  <summary>詳細な説明</summary>
  
Swaggerプラグインは自動的に以下の作業を行います：

- すべてのDTOプロパティに`@ApiProperty`を注釈付けします（ただし、`@ApiHideProperty`が使用されている場合は除きます）。
- 必須プロパティは、クエスチョンマーク（例えば、`name?: string`ならば`required: false`）によって設定されます。
- `type`や`enum`プロパティは、型（配列もサポート）に基づいて設定されます。
- `default`プロパティは、指定されたデフォルト値に基づいて設定されます。
- `class-validator`デコレータに基づいていくつかのバリデーションルールが設定されます（`classValidatorShim`が`true`に設定されている場合）。
- 適切なステータスと型（レスポンスモデル）を持つレスポンスデコレータがすべてのエンドポイントに追加されます。
</details>


プラグインによる解析が行われるためには、ファイル名が以下のサフィックスを持っている必要があります：['.dto.ts', '.entity.ts']（例：`create-user.dto.ts`）。

**注意：** Swaggerプラグインは、TypeScriptの型と`class-validator`デコレータから`@ApiProperty()`注釈を導き出します。これにより、生成されるSwagger UIドキュメンテーションのためにAPIを明確に説明するのに役立ちます。しかし、実行時の検証はまだ`class-validator`デコレータによって処理されます。したがって、`IsEmail()`、`IsNumber()`などのバリデータの使用を続けることが必要です。

したがって、ドキュメンテーションの生成のために自動的な注釈に依存する場合、実行時の検証を希望する場合、`class-validator`デコレータはまだ必要です。

**ヒント：** DTOでマップ型ユーティリティ（`PartialType`など）を使用するときは、`@nestjs/swagger`からインポートしてください。

プラグインはAbstract Syntax Treeに基づいて適切なデコレータを適用します。したがって、コード全体に散らばる`@ApiProperty`デコレータに悩むことはありません。

**ヒント：** プラグインは自動的にSwaggerプロパティを生成しますが、それらを上書きする必要がある場合は、`@ApiProperty()`を通じて明示的に設定できます。

### コメントの自動認識
- コメントに基づいてプロパティとエンドポイントの説明が生成されます（`introspectComments`が`true`に設定されている場合）。
- コメントに基づいてプロパティの例の値が生成されます（`introspectComments`が`true`に設定されている場合）。

#### `"introspectComments": false `（デフォルト）
```ts
/**  
* ユーザーの役割リスト  
* @example ['admin']  
*/ 
@ApiProperty({
	description: `ユーザーの役割リスト`,
	example: ['admin'],
})
roles: RoleEnum[] = [];
```

#### `"introspectComments": true `（Swaggerプラグインを有効化）
コメントの自動認識を有効にすると、CLIプラグインがこれらのコメントを抽出し、プロパティの説明:`discription`を自動的に提供します。

```ts
/**  
* ユーザーの役割リスト  
* @example ['admin']  
*/
roles: RoleEnum[] = [];
```

プラグインオプションには`dtoKeyOfComment`と`controllerKeyOfComment`があり、これらを使用してApiPropertyデコレータとApiOperationデコレータに対するプラグインの値設定方法をカスタマイズできます。以下に例を示します：

```ts
export class SomeController {   
	/**    
	* リソースの作成    
	*/   
	@Post()  
	create() 
	{} 
}
```


これらのオプションはデフォルトで"description"に設定されています。
つまり、プラグインは"Create some resource"をApiOperationオペレーターのdescriptionキーに割り当てます。
これは以下のようになります：


```ts
@ApiOperation({ description: "リソースの作成" })
```

ヒント: モデルに対しても同様のロジックが適用されますが、それはApiPropertyデコレータに対してです。


### CLIプラグインを有効にする
`nest-cli.json`
```json
{   
	"collection": "@nestjs/schematics",
	"sourceRoot": "src",   
	"compilerOptions": {     
		"plugins": ["@nestjs/swagger"]   
	} 
}
```

`options`プロパティを使用して、プラグインの動作をカスタマイズできます。

```json
"plugins": [
	{     
		"name": "@nestjs/swagger",
		"options": {
			// trueに設定すると、class-validatorの検証デコレーターが再利用されます 
			 "classValidatorShim": true, 
			 // trueに設定すると、コメントからプロパティの説明や例を生成します
			 "introspectComments": true 
		} 
	}
]
```


|Option|Default|Description|
|---|---|---|
|dtoFileNameSuffix|['.dto.ts', '.entity.ts']|DTO (Data Transfer Object) ファイルの接尾辞|
|controllerFileNameSuffix|.controller.ts|コントローラーファイルの接尾辞|
|classValidatorShim|true|`true`に設定されている場合、モジュールはclass-validatorのバリデーションデコレータを再利用します（例：@Max(10)はスキーマ定義にmax: 10を追加します）|
|dtoKeyOfComment|'description'|ApiPropertyにコメントテキストを設定するプロパティのキー|
|controllerKeyOfComment|'description'|ApiOperationにコメントテキストを設定するプロパティのキー|
|introspectComments|false|コメントを検出するかどうかの設定|


プラグイン オプションが更新されるたびに、必ず`/dist`フォルダーを削除し、アプリケーションを再構築してください。CLI を使用せずにカスタム`webpack`構成を使用する場合は、このプラグインを以下と組み合わせて使用​​できます`ts-loader`。

```ts
getCustomTransformers: (program: any) => ({
  before: [require('@nestjs/swagger/plugin').before({}, program)]
}),
```

この設定は、NestJSのSwaggerプラグインをwebpackのts-loaderと組み合わせて使用するためのものです。`getCustomTransformers`メソッドを用いて、TypeScriptのトランスフォーマーをカスタマイズします。この設定では、`before`フックにNestJSのSwaggerプラグインが追加され、TypeScriptのコンパイル前にプラグインの動作が実行されるようにしています。



### `ts-jest`(e2e テスト)との統合[#](https://docs.nestjs.com/openapi/cli-plugin#integration-with-ts-jest-e2e-tests)

e2e テストを実行するには、`ts-jest`メモリ内でソース コード ファイルをオンザフライでコンパイルします。つまり、Nest CLI コンパイラを使用せず、プラグインを適用したり、AST 変換を実行したりしません。

プラグインを有効にするには、e2e テスト ディレクトリに次のファイルを作成します。

```javascript

const transformer = require('@nestjs/swagger/plugin');

module.exports.name = 'nestjs-swagger-transformer';
// you should change the version number anytime you change the configuration below - otherwise, jest will not detect changes
module.exports.version = 1;

module.exports.factory = (cs) => {
  return transformer.before(
    {
      // @nestjs/swagger/plugin options (can be empty)
    },
    cs.program, // "cs.tsCompiler.program" for older versions of Jest (<= v27)
  );
};
```

これを配置したら、`jest`構成ファイル内に AST トランスフォーマーをインポートします。デフォルト (スターター アプリケーション内) では、e2e テスト構成ファイルはフォルダーの下にあり`test`、 という名前が付けられます`jest-e2e.json`。

```json

{
  ... // other configuration
  "globals": {
    "ts-jest": {
      "astTransformers": {
        "before": ["<path to the file created above>"]
      }
    }
  }
}
```

を使用する場合は`jest@^29`、以前のアプローチは非推奨になったため、以下のスニペットを使用してください。

```json

{
  ... // other configuration
  "transform": {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        "astTransformers": {
          "before": ["<path to the file created above>"]
        }
      }
    ]
  }
}
```

#### トラブルシューティング`jest`(e2e テスト) [#](https://docs.nestjs.com/openapi/cli-plugin#troubleshooting-jest-e2e-tests)

`jest`設定の変更が認識されない場合は、Jest がすでにビルド結果を**キャッシュしている可能性があります。**新しい設定を適用するには、Jest のキャッシュ ディレクトリをクリアする必要があります。

キャッシュ ディレクトリをクリアするには、NestJS プロジェクト フォルダーで次のコマンドを実行します。

```bash

$ npx jest --clearCache
```

自動キャッシュクリアが失敗した場合でも、次のコマンドを使用してキャッシュフォルダーを手動で削除できます。

```bash

# Find jest cache directory (usually /tmp/jest_rs)
# by running the following command in your NestJS project root
$ npx jest --showConfig | grep cache
# ex result:
#   "cache": true,
#   "cacheDirectory": "/tmp/jest_rs"

# Remove or empty the Jest cache directory
$ rm -rf  <cacheDirectory value>
# ex:
# rm -rf /tmp/jest_rs
```
