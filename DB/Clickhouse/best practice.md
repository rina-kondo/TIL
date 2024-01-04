# ベストプラクティス(公式)
## 書き込み回数は少ないほうがよい
デフォルトでは、ClickHouseに送信された`INSERT`リクエストは即座に実行される（同期処理）
作成されたパーツはバックグラウンドでより大きなパーツにマージされるため（読み取りクエリ用にデータを最適化するため）、1秒間に複数の`INSERT`クエリを送信すると、バックグラウンドでのマージが新しいパーツの数に追いつかない状況になる可能性がある。

そのため、`INSERT`を送信する場合、少ないデータのリクエストを大量に行うより、大量のデータを数回リクエストするほうがよい。

目安としての公式の推奨
- 一般的には、一度に**少なくとも1,000行、理想的には10,000行から100,000行のかなり大きなバッチでデータを挿入**する
- サイズにかかわらず、`INSERT`のクエリの数は**1秒あたり1回程度**に抑える

これを実現するには
- 大規模なバッチ挿入を可能にするバッファメカニズムの実装（外部実装か、Clickhouseのバファテーブルエンジンの利用）
- 非同期挿入 (外部実装か、clickhouseの非同期挿入モードの利用)
## 非同期挿入とバッファ
[Asynchronous Inserts (async_insert) | ClickHouse Docs](https://clickhouse.com/docs/en/cloud/bestpractices/asynchronous-inserts)
async_insert(非同期挿入)
- `async_insert=0`(default) : 同期処理。`INSERT`の即時実行とパーツのマージが行われる。
- `async_insert=1`: 非同期挿入モード。ClickHouse は受信した挿入をまずメモリ内バッファに保存してから、定期的にディスクにフラッシュします。フラッシュのしきい値は
	- バッファサイズ(nKBに達したとき): `async_insert_max_data_size`
	-  バッファの実行間隔: `async_insert_busy_timeout_ms`
- `wait_for_async_insert=1`とするとバッファからフラッシュされてパーツが書き込まれたあと、確認応答等とともに返される。(非同期にする場合は設定推奨。クライアントがエラーを検知せず高速書き込みを続けることを避けるため。)
## ミューテーションを避ける
`ALTER`クエリ(Update, Delete など) を実行すると、新しいミューテーションバージョンが生成される。つまり、`ALTER`クエリ実行時のデータ全部を書き換える操作を実行することになり、大量の書き込み要求が発生、コストの増加につながる。

更新については、MergeTreeエンジンのかわりに、`ReplacingMergeTree`や`CollapsingMergeTree`のようなテーブルエンジンを利用することで、ミューテーションの作成を避けることができます。
## Null許容列を避ける
Nullableカラム（例えばNullable(String)）はUInt8型の別のカラムを作成します。
この追加カラムは、ユーザーがNullableカラムを扱うたびに処理しなければなりません。これは、使用されるストレージスペースの増加につながり、ほとんどの場合パフォーマンスに悪影響を及ぼします。

Bad
```sql
CREATE TABLE default.sample(
	`x` Int8,    
	`y` Nullable(Int8)
)
ENGINE = MergeTree
ORDER BY x
```
Good (デフォルトにnull値を割り当てていい場合)
```sql
CREATE TABLE default.sample2(
	`x` Int8,
	`y` Int8 DEFAULT 0
)
ENGINE = MergeTree
ORDER BY x
```
## `OPTIMIZE FINAL`を避ける
`OPTIMIZE TABLE ... FINAL`クエリを使用すると、特定のテーブルのデータ・パーツを1つのデータ・パーツにスケジュール外のマージを開始します。
このプロセスの間、ClickHouseは全てのデータ・パートを読み込み、圧縮を解除し、マージし、1つのパートに圧縮し、オブジェクト・ストアに書き戻します。
この最適化では、すでに1つのパーツにマージされていても、1つのパーツに書き換えることに注意してください。
## カーディナリティの低いパーティショニングキーを選択する
[Choose a Low Cardinality Partitioning Key | ClickHouse Docs](https://clickhouse.com/docs/en/cloud/bestpractices/low-cardinality-partitioning-key)
Partitionを設定している場合、個別のパーティションキーごとに分割し、書き込みの処理を行う。
そのため、書き込みリクエストの数を最小限にするには、カーディナリティの低いパーティション キーを使用するか、テーブルにパーティション キーを使用しないようにします。
