### Prismaを構成するモジュール
- Prisma Client: 
	データに合わせて自動生成される型安全なクエリビルダー。メソッドでデータベースを操作するための機能。
- Prisma Migrate: 
	マイグレーションシステム。設定ファイル（schema.prisma）に基づき実行される。
- Prisma Studio: データベースを操作するためのGUIツール。


### Prisma Migrate: **`schema.prisma`**
- 基礎となるデータベース内のテーブルを表す
- 生成された Prisma Client API の基盤として機能します

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

`node_modules/.prisma` フォルダに schema の情報をコピー
=>`prisma.schema` ファイルを変更した際は実行
```console
$ npx prisma generate
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

#### リレーションの操作
##### ネストされたデータをレコード
script.ts
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
        },
      },
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
##### ネストされたデータの出力
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

```
npx ts-node script.ts

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
