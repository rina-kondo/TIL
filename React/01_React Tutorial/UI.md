## コンポーネント: UIの構成部品
React では、HTMLと CSS と JavaScript を、独自の「コンポーネント」と呼ばれる、**アプリのための再利用可能な UI 要素**にまとめて記載することができます。 

## 〜コンポーネントの作り方〜
### Step 1: コンポーネントをエクスポートする
`export default`でファイル内のメインの関数をマークする

### Step 2: 関数を定義する
`function Profile()`のように書くことで`Profile`という名前のJavaScript関数を定義します。  
これをJSXで`<Profile />`のように使用できます(後述)。  
(注意) Reactで動作させるために、**名前は大文字から始める必要があります**。  

### Step 3: マークアップを加える
`return()`の括弧内にweb上で表記する内容を書きます。    
それをJSXでマークアップする。見た目はHTML、本質はJS、その名もJSX。


## 〜コンポーネントを使う〜
<details>
  <summary>コード例</summary>

`<Profile />`みたいな感じで使えます
```js:App.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

export default function Gallery(){
	return(
		<section>
			<h1>Amazing scientists</h1>
			<Profile />
			<Profile />
		</section>
	);
}
```
</details>

### 注意点   
    
- 大文字・小文字の違いに気をつける.  
 `<section>` は小文字なので、React はこれが HTML タグを指しているのだと理解します。    
 `<Profile />` は大文字で始まっているので、React は `Profile` という名前の独自コンポーネントを使いたいのだと理解します。    
- コンポーネントの定義をネストさせてはいけません   
めっちゃ遅くなって、バグにも繋がります  
コンポーネントはトップレベルで定義する   


## 隅から隅までコンポーネント
React アプリケーションは「ルート (root)」コンポーネントから始まります。  
ルートコンポーネントは  
- [Create React App](https://create-react-app.dev/) を使う場合、`src/App.js` 内に定義
- [Next.js](https://nextjs.org/) を使っている場合は `pages/index.js` に定義
されます   
     
ページの内容全て、再利用しない大枠(ヘッダーなど)もコンポーネントを使用します。  
- Reactの場合、空の HTML ファイルから始めて JavaScript で React にページ内容の管理を引き継がせる  
- 対してNext.jsは、React コンポーネントから HTML ファイル_自体も_自動生成するのです。これにより、JavaScript コードがロードされる前にコンテンツの一部をアプリが表示できるようになります.  

その一方で、多くのウェブサイトでは React を [“対話機能をちょっと添える”](https://ja.react.dev/learn/add-react-to-a-website) ためにのみ使っています。そのようなサイトはページ全体のためのルートコンポーネントを 1 つだけ持つのではなく、たくさんのルートコンポーネントを持っています。必要しだいで、React を使う量は多くても少なくても構わないのです！  


## コンポーネントのエクスポートとインポート

 |構文|Export 文|Import 文|
|---|---|---|
|Default|`export default function Button() {}`|`import Button from './Button.js';`|
|Named|`export function Button() {}`|`import { Button } from './Button.js';`|
- _デフォルト_ インポート書く場合、`import` の後には好きな名前を書くことができます。例えば `import Banana from './Button.js'` と書いたとしても、同じデフォルトエクスポートされたものを得ることができます。
- 名前付きエクスポートでは、エクスポート側とインポート側で名前が合致していなければなりません。
- 常に意味の通った名前を付けるようにする。

### ルートコンポーネントファイル
Create React Appを使うと、 `src/App.js`がルートコンポーネントファイルとして作成される。Next.jsはファイルベースのルーティングがある。  


## JSX (= JavaScript Extension) [](https://ja.react.dev/learn/writing-markup-with-jsx)
個々の React のコンポーネントは JavaScript の関数であり、React がブラウザに表示するためのマークアップを含めることができます。  
それはReact コンポーネントが JSX と呼ばれる拡張構文を使用することで達成できます。  

#### JSXのルール
##### 1. 単一のルート要素を返す
一つの関数から二つの値を直接返すことはできないです。JSXも同様です。  
コンポーネントから複数の要素を返すには、コンポーネント全体を`<div></div>` や`<></>`で囲む必要があります。  
`<></>`はフラグメントと呼ばれるらしい。

##### 2. 全てのタグを閉じる
例
- `<img src="http">`  =>  `<img src="http" />`
- `<li>list-item`  => `<li>list-item</li>` 
- `<br />`

##### 3. (ほぼ)全てキャメルケース
予約語とかの関係らしい。
全リストは [React DOM コンポーネントに存在する属性の一覧](https://ja.react.dev/reference/react-dom/components/common)にあります。

#### JSXコンバータ
既存のHTMLがある場合、[コンバータ](https://transform.tools/html-to-jsx)を使うといいよ

## {}でJavaScriptを含める
{}で変数を扱える。使える箇所は、①テキストとして、②属性として のみです。
<details>
	<summary>コード例</summary>
	```js:App.js
	const today = new Date();

	function formatDate(date) {
	  return new Intl.DateTimeFormat(
	    'en-US',
	    { weekday: 'long' }
	  ).format(date);
	}

	export default function TodoList() {
	  return (
	    <h1>To Do List for {formatDate(today)}</h1>
	  );
	}

	```
</details>

### ダブル{}用途例
JSX 内でインラインの CSS スタイルを使うときなどに使用することがある。  
`{{ }}`はラップしているだけのただのオブジェクトです。
<details>
<summary>コード例</summary>
```js:App.js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```	
</details>

**注意：** インラインの `style` 属性はキャメルケースで書きます。例えば HTML で `<ul style="background-color: black">` となっていれば、あなたのコンポーネントでは `<ul style={{ backgroundColor: 'black' }}>` になります。


## コンポーネントにpropsを渡す

### props のデフォルト値を指定する 
props にデフォルト値を指定したい場合、分割代入の中でパラメータ名の直後に = とデフォルト値を書くことができます
```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

`size={null}` や `size={0}` を渡した場合にはデフォルト値は使われません。

### props のデフォルト値を指定する 
propsの受け渡しが長くなる場合。。
```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
簡潔にpropsを受け渡す場合

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

これにより、Profile に渡された props を、個々の名前を列挙することなくすべて Avatar に転送できます。  
    
**注意：** スプレッド構文は慎重に使ってください。  
この構文をあらゆるコンポーネントで使っているなら、何かが間違っています。多くの場合は、コンポーネントを分割して JSX として children を渡すべきというサインです。(下記)


### childrenとしてJSXを渡す
HTMLのこんなネストを
```html
<div>
  <img />
</div>
```
同様に独自コンポーネントもネストしたくなることがあります。
```js
<Card>
  <Avatar />
</Card>
```

JSX タグ内でコンテンツをネストした場合、親側のコンポーネントはその中身を `children` という props として受け取ります。

```js: App.js {}
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
`<Card>`自身はReactの組み込みコンポーネントではない。  
`children` プロパティを有するコンポーネントには、親に任意の JSX で「埋めて」もらうための「穴」が開いている、と考えることができます。`children` は、パネルやグリッドのような視覚的に何かを囲む要素に使うことができます。

![A puzzle-like Card tile with a slot for "children" pieces like text and Avatar](https://ja.react.dev/images/docs/illustrations/i_children-prop.png)

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

<details>
  <summary>チャレンジ問題1</summary>
  
```js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
	className="avatar"
	src={imageSrc}
	alt={person.name}
	width={imageSize}
	height={imageSize}
      />
      <ul>
	<li>
	  <b>Profession:</b> {person.profession}
	</li>
	<li>
	  <b>Awards: {person.awards.length} </b>
	  ({person.awards.join(', ')})
	</li>
	<li>
	  <b>Discovered: </b>
	  {person.discovery}
	</li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
	imageId: 'szV5sdG',
	name: 'Maria Skłodowska-Curie',
	profession: 'physicist and chemist',
	discovery: 'polonium (chemical element)',
	awards: [
	  'Nobel Prize in Physics',
	  'Nobel Prize in Chemistry',
	  'Davy Medal',
	  'Matteucci Medal'
	],
      }} />
      <Profile person={{
	imageId: 'YfeOqp2',
	name: 'Katsuko Saruhashi',
	profession: 'geochemist',
	discovery: 'a method for measuring carbon dioxide in seawater',
	awards: [
	  'Miyake Prize for geochemistry',
	  'Tanaka Prize'
	],
      }} />
    </div>
  );
}

```
</details>


## 条件付きレンダー 
下記コードの各 `Item` に梱包が終わっているかどうか表示させたいとしましょう。
<details>
<summary>コード</summary>
	
```js{359}
function Item({ name, isPacked }) {
return <li className="item">{name}</li>; //ここを条件分岐させる
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
	<Item 
	  isPacked={true} 
	  name="Space suit" 
	/>
	<Item 
	  isPacked={true} 
	  name="Helmet with a golden leaf" 
	/>
	<Item 
	  isPacked={false} 
	  name="Photo of Tam" 
	/>
      </ul>
    </section>
  );
}
```
</details>

### if/else文
```js
if (isPacked) {  
	return <li className="item">{name} ✔</li>;  
}  
return <li className="item">{name}</li>;
```
### 三項演算子
```js
return (  
	<li className="item">  
		{isPacked ? name + ' ✔' : name}  
	</li>  
);
```
### 論理AND演算子
```js
return (  
	<li className="item">  
		{name} {isPacked && '✔'}  
	</li>  
);
```


#### **`&&` の左辺に数値を置かない**

JavaScript は条件をテストする際、左の辺を自動的に真偽値に変換します。しかし、左の辺が `0` の場合は、式全体がその `0` という値に評価されてしまうため、React は何もレンダーしないのではなく **`0` を表示します。.  
    
たとえば、よくある間違いとして `messageCount && <p>New messages</p>` のようにコードを書くことが挙げられます。`messageCount` が `0` の場合は何も表示しないと思われがちですが、実際には `0` そのものが表示されてしまいます！  
    
これを修正するには、左の値を真偽値にしてください： `messageCount > 0 && <p>New messages</p>`。

<details>
  <summary>チャレンジ問題2</summary>
  ```js
  function Item({ name, importance }) {
	  return (
	    <li className="item">
	      {name}
	      {importance > 0 && ' '}
	      {importance > 0 &&
	        <i>(Importance: {importance})</i>
	      }
	    </li>
	  );
	}
	
	export default function PackingList() {
	  return (
	    <section>
	      <h1>Sally Ride's Packing List</h1>
	      <ul>
	        <Item 
	          importance={9} 
	          name="Space suit" 
	        />
	        <Item 
	          importance={0} 
	          name="Helmet with a golden leaf" 
	        />
	        <Item 
	          importance={6} 
	          name="Photo of Tam" 
	        />
	      </ul>
	    </section>
	  );
	}
	```
</details>

<details>
  <summary>チャレンジ問題3</summary>
  ```js
  const drinks = {
	  tea: {
	    part: 'leaf',
	    caffeine: '15–70 mg/cup',
	    age: '4,000+ years'
	  },
	  coffee: {
	    part: 'bean',
	    caffeine: '80–185 mg/cup',
	    age: '1,000+ years'
	  }
	};
	
	function Drink({ name }) {
	  const info = drinks[name];
	  return (
	    <section>
	      <h1>{name}</h1>
	      <dl>
	        <dt>Part of plant</dt>
	        <dd>{info.part}</dd>
	        <dt>Caffeine content</dt>
	        <dd>{info.caffeine}</dd>
	        <dt>Age</dt>
	        <dd>{info.age}</dd>
	      </dl>
	    </section>
	  );
	}
	
	export default function DrinkList() {
	  return (
	    <div>
	      <Drink name="tea" />
	      <Drink name="coffee" />
	    </div>
	  );
	}

	```
</details>


## リストのレンダー
### 配列をマップする
下記のようなリスト項目をレンダーするとします
```html
<ul>
	<li>Creola Katherine Johnson: mathematician</li>  
	<li>Mario José Molina-Pasquel Henríquez: chemist</li>  
	<li>Mohammad Abdus Salam: physicist</li>  
	<li>Percy Lavon Julian: chemist</li>  
	<li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

#### Step1.データを配列に移動
```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

#### Step2.`people`のメンバーを`listItems`という新しい配列にマップする
Peopleを`<li></li>`で囲む作業
```js:App.js
const listItems = people.map(person => <li>{person}</li>);
```

#### Step3.コンポーネントからlistItemsを`<ul>`で囲んで`return`する
御返しよ！！
```js
return <ul>{listItem}</ul>;
```

### 配列をフィルタする
#### Step0.配列を作成
<details>
  <summary>配列</summary>
```js: data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```
</details>

#### Step1. `people` に対して `filter()` を呼び出し新しい`chemists`配列を**作成**
```js
import { people } from './data.js';

const chemists = people.filter(person=>
	person.profession === 'chemist'
);
```

#### Step2. `chemists` に対して **map** を適用
`map()` 内で直接 JSX 要素を使用する場合、必ず key が必要です！
```js
const listItem = chemists.map(person =>>
	<li key={person.id}>
		<img
			src={getImageUrl(person)}
			alt={person.name}
		/>
		<p>
			<b>{person.name}:</b>
			{' '+ person.progession + ' '}
			known for {person.accomplishment}
		</p>
	</li>
);
```

#### Step3.コンポーネントから`listItems`を返す
```js
return <ul>{listItems}</ul>
```


### 複数のDOMノードをmapでレンダーする場合
```js
import { Fragment } from 'react';

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

### `key`をどこから得るのか

- **データベースからのデータ
- **ローカルで生成されたデータ：** データがローカルで生成されて保持される場合（例：ノートを取るアプリにおけるノート）は、アイテムを作成する際に、インクリメンタルなカウンタや [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)、または [`uuid`](https://www.npmjs.com/package/uuid) などのパッケージを使用します。

- `key={Math.random()}` などとしてキーをその場で生成してはいけません。こうするとキーがレンダーごとに一切合致しなくなり、コンポーネントと DOM が毎回再作成されるようになります。
- コンポーネントは `key` を props として受け取らないということに注意してください。コンポーネントが ID を必要とする場合は、別の props として渡す必要があります：`<Profile key={id} userId={id} />`。

<details>
  <summary>チャレンジ問題4</summary>
  ```js
	import { Fragment } from 'react';
	
	const poem = {
	  lines: [
	    'I write, erase, rewrite',
	    'Erase again, and then',
	    'A poppy blooms.'
	  ]
	};
	
	export default function Poem() {
	  return (
	    <article>
	      {poem.lines.map((line, index) =>
	        <Fragment id={index}>
	        {index>0 && <hr />}
	          <p key={index}>
	          {line}
	        </p>
	        </Fragment>
	      )}
	    </article>
	  );
	}
```
</details>

### コンポーネントを純粋に保つ
**React は、あなたが書くすべてのコンポーネントが純関数であると仮定しています**。  
    
下記の`cups` 変数と `[]` 配列は、`TeaGathering` 内で _同一のレンダー中に_ 作成されたものであるため、コンポーネントは純粋です。  
これはローカルミューテーションと呼ばれます。
```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

