### Prisma
Prismaを構成するモジュール
- Prisma Client: 
	データに合わせて自動生成される型安全なクエリビルダー。メソッドでデータベースを操作するための機能。
- Prisma Migrate: 
	マイグレーションシステム。設定ファイル（schema.prisma）に基づき実行される。
- Prisma Studio: データベースを操作するためのGUIツール。

型定義: [Prisma schema API (Reference)](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types)   
Prisma CLI: [Prisma CLI Command Reference](https://www.prisma.io/docs/reference/api-reference/command-reference)   
Prisma Migrate: [開発および運用における Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production)   


### Prisma Migrate: **`schema.prisma`**
- 基礎となるデータベース内のテーブルを表す
- 生成された Prisma Client API の基盤として機能します
```prisma
generator client {
  provider = "prisma-client-js"
}

// dbを接続
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
  role  Role    @default(USER)
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}

enum Role {
  USER
  ADMIN
}
```

`node_modules/.prisma` フォルダに schema の情報をコピー   
=>`prisma.schema` ファイルを変更した際は実行

```console
$ npx prisma migrate dev
```

### Prisma Client: **`script.ts`**
新しいUserレコードを作成する
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
	  // ... you will write your Prisma Client queries here
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  ```

`npx ts-node script.ts`でスクリプトを実行できる


### 1対1のリレーションの定義
**`schema.prisma`**
```ts
// ...

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  profile Profile?  // relation (nullを許容)
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int     @unique  // uniqueを書くことで1対1を保証する
}
```

レコードを作成するクエリ   
**`script.ts`**
```ts
// ..
async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Elsa",
      email: "elsa@prisma.io",
      profile: {
        create: {
          bio: "Markdown ninja"
        }
      }
    },
    include: {
      profile: true
    }
  })
  console.dir(user, { depth:Infinity })
}
//..
```

<details>
  <summary>console</summary>

```
{
  id: 1,
  email: 'elsa@prisma.io',
  name: 'Elsa',
  profile: { id: 1, bio: 'Markdown ninja', userId: 1 }
}
```

</details>

### 1対多のリレーションの定義
**`script.ts`**
```ts
model User {
  id        Int    @id @default(autoincrement())
  name      String
  email     String  @unique
  posts     Post[]  // 配列型を定義
}

model Post {
  id         Int       @id @default(autoincrement())
  title      String
  content    String?
  published  Boolean   @default(false)
  createdAt  DateTime  @default(now())

  author     User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId   Int
}
```

レコードを作成するクエリ   
**`script.ts`**
```ts
//..
async function main() {
  const post = await prisma.post.create({
    data: {
      title: "Prisma & Devhub playground",
      author: {
        create: {
          name: "Elsa",
          email: "elsa@prisma.io",
        }
      }
    },
    include: {
      author: true
    }
  })
  console.dir(post, { depth:Infinity })
}
//..
```

<details>
  <summary>console</summary>
  
```
{
  id: 1,
  title: 'Prisma & Devhub playground',
  content: null,
  published: false,
  createdAt: 2022-12-16T22:34:46.575Z,
  authorId: 1,
  author: { id: 1, name: 'Elsa', email: 'elsa@prisma.io' }
}
```

</details>

### 明示的な多対多のリレーション
**`shema.prisma`**
```ts
model Post {
  id        Int          @id @default(autoincrement())
  title     String
  content   String?
  published Boolean      @default(false)
  tags      TagOnPosts[] // 配列型
}

model Tag {
  id    Int          @id @default(autoincrement())
  name  String
  posts TagOnPosts[] // 配列型
}

model TagOnPosts {
  post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId Int
  tag    Tag @relation(fields: [tagId], references: [id], onDelete: Cascade)
  tagId  Int

  @@id([postId, tagId]) // 複合プライマリキーを定義(組み合わせの一意を保証)
}
```

レコードを作成するクエリ   
**`script.ts`**
```ts
async function main() {
  const post = await prisma.post.create({
    data: {
      title: "Prisma & Devhub playground",
      tags: {
        create: [
          {
            tag: {
              create: {
                name: "playground"
              }
            }
          }
        ]
      }
    },
    include: {
      tags: true
    }
  })
  console.dir(post, { depth:Infinity })
}
```

<details>
  <summary>console</summary>
  
```
{
  id: 1,
  title: 'Prisma & Devhub playground',
  content: null,
  published: false,
  tags: [ { postId: 1, tagId: 1 } ]
}
```

</details>

### 暗黙的な多対多のリレーション
**`schema.prisma`**
```ts
model Post {
  id         Int       @id @default(autoincrement())
  title      String
  content    String?
  published  Boolean   @default(false)
  createdAt  DateTime  @default(now())

  tags       Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String

  posts Post[]
}
```

レコードを作成するクエリ   
**`script.ts`**
```ts
async function main() {
  const post = await prisma.post.create({
    data: {
      title: "Prisma & Devhub playground",
      tags: {
        create: [
          {
            name: "playground"
          }
        ]
      }
    },
    include: {
      tags: true
    }
  })
  console.dir(post, { depth:Infinity })
}
```

<details>
  <summary>console</summary>

```
{
  id: 1,
  title: 'Prisma & Devhub playground',
  content: null,
  published: false,
  createdAt: 2022-12-16T22:35:00.967Z,
  tags: [ { id: 1, name: 'playground' } ]
}
```

</details>

### 同じモデルからの多対多
```prisma
model User {
  id           Int     @id @default(autoincrement())
  name         String?
  writtenPosts Post[]
  pinnedPost   Post?
}

model Post {
  id         Int     @id @default(autoincrement())
  title      String?
  author     User    @relation(fields: [authorId], references: [id])
  authorId   Int
  pinnedBy   User?   @relation(fields: [pinnedById], references: [id])
  pinnedById Int?
}
```


#### ネストされたデータの出力
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  ```

<details>
  <summary>出力確認`$ npx ts-node script.ts`</summary>
  
```console
// 出力結果
[
  { id: 1, email: 'alice@prisma.io', name: 'Alice', posts: [] },
  {
    id: 2,
    email: 'bob@prisma.io',
    name: 'Bob',
    posts: [
      {
        id: 1,
        title: 'Hello World',
        content: null,
        published: false,
        authorId: 2
      }
    ]
  }
]
```

</details>

