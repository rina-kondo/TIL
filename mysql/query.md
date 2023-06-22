## 存在するデータベースを確認
```
mysql> SHOW DATABASES;
```

初期 (削除ダメ)
```
MySQL [(none)]> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| innodb             |
| mysql              |
| performance_schema |
| sampledb           |
| sys                |
+--------------------+
```

## データベース作成
[データベース名]にデータベース名を入力
```
mysql> CREATE DATABASE [データベース名];
```

## データベースを指定
```
mysql> USE [データベース名];
```

## テーブルを作成
[テーブル名][カラム名][カラム型]に名前を入力
```
mysql> CREATE TABLE [テーブル名] ([カラム名] [カラム型], [カラム名] [カラム型], ...);
```

#### 注意: `Query OK`が返ってきているかを必ず確認する。返ってきていない場合は、スペルミスなどで実行失敗しているかも。
データ型参考　[MySQL :: MySQL 8.0 リファレンスマニュアル :: 11 データ型](https://dev.mysql.com/doc/refman/8.0/ja/data-types.html)

## テーブル一覧確認
```
mysql> SHOW TABLES;
```

## カラム確認
```
mysql> DESC [テーブル名];
```

## テーブルにデータを挿入する
文字データは`'`で囲むこと
```
mysql> INSERT INTO [テーブル名] ([カラム名1], [カラム名2], ...) VALUES ([値1], [値2], ...); 
```

## テーブルにデータを検索する
`*`はワイルドカード
```
mysql> SELECT * FROM [テーブル名]; 
```

## カラムを限定して結果表示
```
mysql> SELECT [カラム名1], [カラム名2], ... FROM [テーブル名];
```

## 条件に合うデータを検索
複数条件は`AND` `OR`を使う
```
mysql> SELECT * FROM [テーブル名] WHERE [条件式];
```

## データを更新
```
mysql> UPDATE [テーブル名] SET [カラム名1] = [値1], [カラム名2] = [値2], ... WHERE [条件式 (id = 3　 など)]; 
```

## データを削除
条件によっては、複数一気に削除もできる
```
mysql> DELETE FROM [テーブル名] WHERE [条件文]
```



