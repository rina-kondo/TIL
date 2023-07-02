## スケジュールイベント
イベントが発生するのは、EC2インスタンスのメンテナンスが行われるときや、回復不可能な障害が検出されたときなど。メール通知が来る。  
EC2のマネジメントコンソールからスケジュールを確認できる。  
対応は通知メールに従う。  
- Instance stop: インスタンスが停止する。再起動すると、別の物理サーバーへ移行される
- Instance retirement:
	- Instance Store-Backed AMIの場合：Instance Storeによってバックアップされた後、**削除**される
	- EBS-Backed AMIの場合：Amazon EBSによってバックアップされた後、**停止**する

- Instance reboot: インスタンスが再起動される

## Auto Recovery
AWSでは、実行中のEC2インスタンスに対して、定期的にステータスチェック（監視）を行っています。

- システムステータスチェック（StatusCheckFailed_System): EC2インスタンスをホストしているハードウェア側の障害
	- ネットワーク接続の喪失
	- システム電源の喪失
	- 物理ホストのソフトウェアの問題
	- ネットワーク到達可能性に影響する、物理ホスト上のハードウェアの問題
- インスタンスステータスチェック（StatusCheckFailed_Instance）：EC2インスタンス内部で発生している障害。ユーザーが関与して修復する必要がある
	- 誤ったネットワーク設定や起動設定
	- メモリの枯渇
	- ファイルシステムの破損

## Amazon CloudWatch
CloudWatchを使うと、「利用者がサービスを使える状態であるか」、「利用者の増加によってシステムへの負荷が増えていないか」など、サービスの状態を監視できます。

- モニタリング: 死活監視／性能監視／キャパシティ監視
- 結果を可視化: 取得メトリクス（監視項目）の値をグラフで表示する
- アラート通知: 各メトリクスをベースとしたアラームを設定する
- [CloudWatchメトリクスを発行するAWSのサービス](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html)

### メトリクス
- 標準メトリクス: CPU使用率、Disk利用量、ネットワーク利用量などを監視する
- カスタムメトリクス: 標準メトリクスでは収集できない項目を独自に定義できる

- CPUUtilization: CPUの利用比率
- DiskReadOps: ディスクから読み取られた（Readされた）**回数**
- DiskWriteOps: ディスクに書き込まれた（Writeされた）**回数**
- DiscReadBytes: ディスクから読み取られた**バイト数**
- DiscWriteBytes: ディスクに書き込まれた**バイト数**
- NetworkIn: ネットワークから受信されたバイト数
- NetworkOut: ネットワークから送信されたバイト数
- [インスタンスの利用可能なCloudWatchメトリクスのリスト表示](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html)

### アラームの設定
CloudWatchを用いて設定できる

### CloudWatchの料金
- 初期費用なし、従量課金制
- 標準の監視：無料
    - EC2インスタンスの標準監視：5分間隔
    - サービスによって標準監視間隔は異なる（例：EBS、ELB、RDSは1分間隔が無料）

### その他
- CloudWatchで取得されるメトリクスの情報は統計情報
	正確な数字との間に、若干の乖離が発生する可能性があります。
	近似計算とかしてるってことかな・・？
- メトリクスの保管期間は2週間
	バックアップしたいなら↓
	- CLIを利用してメトリクスデータを取得する
	- CloudWatch Logsに保管する
	- DynamoDBなどのDBに保管する


## AWSの自動化ツール
### User Data
EC2を起動(作成)した後、決まったソフトウェアやライブラリをインストールしたり設定する場合、その処理を自動実行するように設定できる
1. ユーザーデータを設定する　　　
AWSマネジメントコンソールからEC2インスタンスを起動するときに、「高度な詳細」を開いた画面の「ユーザーデータ」欄に、コンソールで入力するコマンドを記述します。
2.  `sudo tail -100 /var/log/cloud-init-output.log` インストール時のログを確認
		=> `tail`はファイルの後ろからxxx行目という指定。ログをさらに遡りたい場合、`-100`をもっと大きい値に設定する

##### より複雑な環境構築をしたい
- AWS CloudFormation
- AWS OpsWorks
- もあるよ

### Instance Metadata
実行中のEC2インスタンスに関するデータを取得する機能です。ユーザーデータなど、マネジメントコンソールで確認できない項目も取得できます。  
インスタンスメタデータは暗号化などで保護されていないため、EC2インスタンスにアクセスできるユーザーならば誰でも参照できてしまいます。このため、ユーザーデータには、秘密情報などの重要な情報は保存しないでください。

コマンド一覧を確認する
```console
$ ec2-metadata --help
```
<details>
	<summary>コマンド一覧</summary>
	
	```console
	[ec2-user@ip-172-31-14-95 ~]$ ec2-metadata --help
	ec2-metadata v0.1.2
	Use to retrieve EC2 instance metadata from within a running EC2 instance.
	e.g. to retrieve instance id: ec2-metadata -i
	         to retrieve ami id: ec2-metadata -a
	         to get help: ec2-metadata --help
	For more information on Amazon EC2 instance meta-data, refer to the documentation at
	http://docs.amazonwebservices.com/AWSEC2/2008-05-05/DeveloperGuide/AESDG-chapter-instancedata.html
	
	Usage: ec2-metadata <option>
	Options:
	--all                     Show all metadata information for this host (also default).
	-a/--ami-id               The AMI ID used to launch this instance
	-l/--ami-launch-index     The index of this instance in the reservation (per AMI).
	-m/--ami-manifest-path    The manifest path of the AMI with which the instance was launched.
	-n/--ancestor-ami-ids     The AMI IDs of any instances that were rebundled to create this AMI.
	-b/--block-device-mapping Defines native device names to use when exposing virtual devices.
	-i/--instance-id          The ID of this instance
	-t/--instance-type        The type of instance to launch. For more information, see Instance Types.
	-h/--local-hostname       The local hostname of the instance.
	-o/--local-ipv4           Public IP address if launched with direct addressing; private IP address if launched with public addressing.
	-k/--kernel-id            The ID of the kernel launched with this instance, if applicable.
	-z/--availability-zone    The availability zone in which the instance launched. Same as placement
	-c/--product-codes        Product codes associated with this instance.
	-p/--public-hostname      The public hostname of the instance.
	-v/--public-ipv4          NATted public IP Address
	-u/--public-keys          Public keys. Only available if supplied at instance launch time
	-r/--ramdisk-id           The ID of the RAM disk launched with this instance, if applicable.
	-e/--reservation-id       ID of the reservation.
	-s/--security-groups      Names of the security groups the instance is launched in. Only available if supplied at instance launch time
	-d/--user-data            User-supplied data.Only available if supplied at instance launch time.
	```

</details>

コマンド実行
```console
$ ec2-metadata -t (インスタンスタイプを確認)
$ ec2-metadata -d (ユーザーデータを確認)
```
### Launch Template (起動テンプレート)
EC2インスタンスを起動するための情報を、テンプレートとして保存できるサービスです
- EC2マネジメントコンソールから設定可能
- キーペアは未設定にしておく（テンプレート使用時に追加）


## Trusted Advisor
AWS利用状況における下記を確認できる。
- コスト最適化（Cost Optimization）
- パフォーマンス（Performance）
- セキュリティ（Security）
- フォールトトレランス（Fault Tolerance）
- サービス制限（Service limits）
推奨設定は、AWSに蓄積されたベストプラクティスに基づいており、その内容をマネジメントコンソールで確認したり、メールで受信することが可能です（設定が必要）。

## 制限緩和と上限申請

|リソース|デフォルトの制限|
|---|---|
|同時起動インスタンス数|インスタンスタイプや購入オプションによって異なる|
|EC2-Classic用Elastic IPアドレス|5つまで|
|インスタンスあたりのEC2-Classic用セキュリティグループ|500まで|
|EC2-Classic用セキュリティグループあたりのルール|100まで|
|キーペア|5,000まで|
|AMIの同時コピー|リージョンあたり50個まで|
上限申請はサポートセンターから申請可能

## コスト最適化
コストの最適化は、「アーキテクチャを最適化することによって、コストも最適化される」と考えるとよいでしょう。

|優先度（推奨） ※上から高い順|検討事項|効果|最適化に必要な構成変更|
|---|---|---|---|
|基本|マネージドサービス活用、運用自動化、インスタンス数／タイプの最適化、ストレージタイプの最適化|非常に大きい|必要|
|割引オプションの活用|リザーブドインスタンスやリザーブドキャパシティの活用|大きい|不要|
|応用・上級|ECSやスポットインスタンスの活用、サーバーレス構成 など|非常に大きい|必要|
|細かいリソースの無駄チェック|EBS、EIP、Snapshot など|小さい|不要|

### コスト管理関連ツール
- Cost Explorer: 各サービスの使用料を時系列でグラフ化するツール
- AWS Budgets: 予算のしきい値を超えたとき（または、超えると予測されたとき）に、アラートを発信できる
- Trusted Advisor: コスト最適化のための推奨事項を教えてくれる(プラン加入で利用可)
- Pricing Calculator: 概算料金を見積もるツール
