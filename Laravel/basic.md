# Laravel
### ディレクトリ構成
```
─── sample
    ├── app       ・・・アプリケーションのロジック
    ├── bootstrap ・・・laravelフレームワークの起動コード
    ├── config    ・・・設定ファイル
    ├── database  ・・・MigrationファイルなどDB関連
    ├── public    ・・・Webサーバのドキュメントルート
    ├── resources ・・・ビューや言語変換用ファイルなど
    ├── routes    ・・・ルーティング用ファイル
    ├── storage   ・・・フレームワークが使用するファイル
    ├── tests     ・・・テストコード
    └── vendor    ・・・Composerでインストールしたライブラリ
  ```

### ルートファイル
- `.env`
- `artisan`: LaravelのCLI実行ファイル


### データベース設定
#### 接続設定(`.env`)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
```

#### マイグレーション
##### マイグレーションファイル作成
命名規則: 特に無いがわかりやすい名前にする（例　create_books_table）
```
% php artisan make:migration create_books_table --create=books
```
##### `database/migrations/x...x_create_books_table.php`
テーブルの命名規則: 小文字・単数形 （例 books）

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
	        $table->increments('id');
	        $table->string('name', 50);
	        $table->integer('price');
	        $table->string('author', 50)->nullable();
	        $table->timestamps();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
```
詳細: 
[スキーマビルダー 5.0 Laravel](https://readouble.com/laravel/5.0/ja/schema.html)

##### マイグレーション実行
```
% php artisan migrate
```
これでMySQL上にテーブルが作成される

#### モデル
モデルはテーブルとマッピングされたオブジェクトです。
##### モデルを作成 
命名規則: 1文字目が大文字・単数形
```
% php artisan make:model Book
```
##### `App.Book.php`
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    //
}
```

#### seed
##### seedファイルの作成
```
% php artisan make:seeder BooksTableSeeder
```

##### `database/seeds/BooksTableSeeder.php`

```php
<?php

use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

		public function run()
		{
				// テーブルのクリア
				DB::table('books')->truncate();
		
				// 初期データ用意（列名をキーとする連想配列）
				$books = [
					['name' => 'PHP Book',
					 'price' => 2000,
					 'author' => 'PHPER'],
					['name' => 'Laravel Book',
					 'price' => 3000,
					 'author' => null],
					['name' => 'Ruby Book',
					 'price' => 2500,
					 'author' => 'Rubyist']
				 ];
	
				// 登録
				foreach($books as $book) {
					\App\Book::create($book);
				}
			}
}
```


##### `database/seeds/DatabaseSeeder.php`
```php
public function run()
{
     // BooksTableSeederを読み込むように指定
     $this->call(BooksTableSeeder::class);
}

```

##### シーディング実行
```
% php artisan db:seed
```


## ルーティング
#### `routes/web.php`
- **ルート(/)の定義**
```php
<?php
Route::get('/', function () {
		// view関数を呼び出すと、resources/views/ディレクトリを探しにいく
    return view('welcome');
});
```

- **コントローラを経由するルーティングの定義**
```php
<?php
Route::get('book', 'BookController@index');
```
- **Restfulリソースコントローラ (CRUD)**
 `Ruoute::resource`をつかう
```php
<?php
Route::resource('book', 'BookController');
```

 <details>
  <summary>CRUD記述一覧</summary>
  
|リクエストメソッド|URI|コントローラー|CRUD画面を作る際の主な用途|
|---|---|---|---|
|GET|/book|BookController@index|一覧画面の表示|
|GET|/book/{book}|BookController@show|詳細画面の表示|
|GET|/book/create|BookController@create|登録画面の表示|
|POST|/book|BookController@store|登録処理|
|GET|/book/{book}/edit|BookController@edit|編集画面の表示|
|PUT|/book/{book}|BookController@update|編集処理|
|DELETE|/book/{book}|BookController@destroy|削除処理|

</details>

#### ルートパラメータ
**`routes/web.php`**

```php
<?php
Route::get('book/{id}', 'BookController@show');
```

**`app/Http/Controllers/BookController.php(未作成)`**

```php
public function show($id)
{
    return view('book', ['book' => Book::findOrFail($id)]);
}
```

## コントローラ
#### コントローラ作成
```
% php artisan make:controller BookController
```
#### `app/Http/Controllers/BookController.php`
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Book;

class BookController extends Controller
{
  public function index()
  {
      // DBよりBookテーブルの値を全て取得
      $books = Book::all();

      // 取得した値をビュー「book/index」に渡す
      return view('book/index', compact('books'));
  }

  public function edit($id)
  {
      // DBよりURIパラメータと同じIDを持つBookの情報を取得
      $book = Book::findOrFail($id);

      // 取得した値をビュー「book/edit」に渡す
      return view('book/edit', compact('book'));
  }
}
```
- view関数は第一引数にビューの名前、第二引数にビューに渡したい値を設定
- `compact('book')`は`['book' => $book]`と同義


## View
[Laravel入門 - 使い方チュートリアル - - Qiita](https://qiita.com/sano1202/items/6021856b70e4f8d3dc3d)

## CRUD機能
#### Update
**`app/Http/Controllers/BookController.php`**
```php
public function update(Request $request, $id)
{
    $book = Book::findOrFail($id);
    $book->name = $request->name;
    $book->price = $request->price;
    $book->author = $request->author;
    $book->save();

    return redirect("/book");
}
```

#### Delete
**`app/Http/Controllers/BookController.php`**

```php
public function destroy($id)
{
    $book = Book::findOrFail($id);
    $book->delete();

    return redirect("/book");
}
```

#### Create
[Laravel入門 - 使い方チュートリアル - - Qiita](https://qiita.com/sano1202/items/6021856b70e4f8d3dc3d)

### バリデーション
##### フォームリクエストの作成
```
% php artisan make:request BookRequest
```
##### `app/Http/Requests/BookRequest.php`
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    public function rules()
    {
        return [
          'name' => 'required|string|max:50',
          'price' => 'required|integer',
          'author' => 'nullable|string|max:50',
        ];
    }
}

```
詳細: 
[バリデーション 5.7 Laravel](https://readouble.com/laravel/5.7/ja/validation.html)

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
//　バリデーションの参照
use App\Http\Requests\BookRequest;
use App\Book;

class BookController extends Controller
{
    // 中略

		// BookRequest(バリデーションフォームで定義)を型指定
    public function store(BookRequest $request)
    {
        $book = new Book();
        $book->name = $request->name;
        $book->price = $request->price;
        $book->author = $request->author;
        $book->save();

        return redirect("/book");
    }

    // 中略
}
```

##### `views/book/message.blade.php`
```php
<div class="row">
    <div class="col-md-12">
    @if ($errors->any())
        <div class="alert alert-danger">
          <ul>
              @foreach ($errors->all() as $error)
                  <li>{{ $error }}</li>
              @endforeach
          </ul>
        </div>
    @endif
    </div>
</div>
```

これをform.blade.phpに挿入します。
```php
<div class="container ops-main">
    <div class="row">
        <div class="col-md-6">
            <h2>書籍登録</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 col-md-offset-1">

            @include('book/message')

            <!-- 中略 -->
        </div>
    </div>
</div>```


## Psyによるデバッグ
`byebug` みたいなやつ
**`BookController`**
```php
public function edit($id)
{
    // DBよりURIパラメータと同じIDを持つBookの情報を取得
    $book = Book::findOrFail($id);

    // tinkerによるデバッグ
    eval(\Psy\sh());

    // 取得した値をView「book/edit」に渡す
    return view('book/edit', compact('book'));
}
```

ターミナル
```
sy Shell v0.9.9 (PHP 7.1.16 — cli-server) by Justin Hileman
    23|
    24|       // tinkerによるデバッグ
  > 25|       eval(\Psy\sh());
    26|
    27|       // 取得した値をView「book/edit」に渡す
    
    //　echoで変数を出力できる
    echo $book;
		{"id":1,"name":"PHP Book","price":2000,"author":"PHPER","created_at":"2018-10-30 10:33:14","updated_at":"2018-10-30 10:33:14"}


		// lsで参照可能な変数の一覧を表示
		ls
		Variables: $book, $id, $this
```
## Tinker
```console
% php artisan tinker
Psy Shell v0.9.9 (PHP 7.1.16 — cli) by Justin Hileman

// 最初に指定する
>>> use \App\Book;  

// allメソッドで取得
>>> $books = Book::all(); 
=> Illuminate\Database\Eloquent\Collection {#2925
     all: [
       App\Book {#2926
         id: 1,
         name: "PHP Book",
         price: 2000,
         author: "PHPER",
         created_at: "2018-10-30 10:33:14",
         updated_at: "2018-10-30 10:33:14",
       //...//
       },
     ],
   }

// countメソッドでデータ数を取得
>>> $books->count(); 
=> 3

// GET(where)
>>> $expensiveBooks = Book::where('price', '>=', 2500)->get();
=> Illuminate\Database\Eloquent\Collection {#2931
     all: [
       App\Book {#2903
         id: 2,
         //...//

// GET(id)
>>> $book = Book::find(2);

// POST
>>> $newBook = new Book();
=> App\Book {#2934}
>>> $newBook->name = 'Python Book';
=> "Python Book"
>>> $newBook->price = 3500;
=> 3500
>>> $newBook->save();
=> true

// PATCH
>>> $pythonBook = Book::find(4);  // 取得して変数に格納
=> App\Book {#2932
     id: 4,
     name: "Python Book",
     price: 3500,
     author: null,
     created_at: "2018-10-31 01:51:38",
     updated_at: "2018-10-31 01:51:38",
   }
>>> $pythonBook->author = 'Pythonista';
=> "Pythonista"
>>> $pythonBook->save();
=> true

// DERETE
>>> $pythonBook = Book::find(4);  // 取得して変数に格納
=> App\Book {#2932
     id: 4,
     name: "Python Book",
     price: 3500,
     author: null,
     created_at: "2018-10-31 01:51:38",
     updated_at: "2018-10-31 01:51:38",
   }
>>> $pythonBook->delete();
=> true

```


## phpコマンド
##### PHPの組み込みサーバーでプロジェクトを起動
`npm run dev`　みたいなやつ
```
% php artisan serve --host=localhost --port=8000
```

##### ルーティング確認
```
% php artisan route:list
```
##### REPLを起動
`rails c`　みたいなやつ
```
% php artisan tinker
```

