## AWSの仮想ネットワーク構成
### [VPC](https://aws.amazon.com/jp/vpc/features/)
「Virtual Private Cloud」の略で、理的な環境（リージョン）上に構築する仮想ネットワークのこと。  
- 接続の保護とモニタリング、トラフィックのスクリーニング、仮想ネットワーク内のインスタンスのアクセス制限を行います。
- 仮想ネットワークの設定、管理、および検証に費やす時間を短縮します。
- 独自の IP アドレス範囲の選択、サブネットの作成、ルートテーブルの設定により、仮想ネットワークをカスタマイズします。
VPCは、サーバーやサービスをAWSで使うために必要な仮想ネットワークを構築するサービスです。  

VPC(仮想ネッºトワーク)を構築するには、そのネットワークが持つIPアドレスの範囲を定義する必要があります。  

#### CIDR
Classless Inter-Domain Routing」の略で、ネットワークを構成する際に必要なIPアドレスの範囲を決める方法です。  
[TIL/temporary-storage/IPaddress.md at main · rina-kondo/TIL · GitHub](https://github.com/rina-kondo/TIL/blob/main/temporary-storage/IPaddress.md)   

|IPアドレス範囲|CIDR表記|
|---|---|
|10.0.0.0 ～ 10.255.255.255|10.0.0.0/8|
|172.16.0.0 ～ 172.31.255.255|172.16.0.0/12|
|192.168.0.0 ～ 192.168.255.255|192.168.0.0/16|
    
### サブネット
VPCのIPアドレス範囲の中で、さらに小さな仮想ネットワークを作成するAWSのサービスです。特徴↓
- サブネットは物理的なAZ上に構築されるため、 耐障害性を考えて_異なるAZ_にネットワークを作成できる
- サブネットでは、 インターネットへの公開／非公開を設定できる。(非公開=プライベートサブネットは、VPC内としか通信できない)
- 複数のサブネットを作成する場合は、IPアドレスの範囲を重複して作成できない

### ルートテーブル
AWS上の仮想的なネットワーク環境のことで、 サブネット内のAWSリソース（EC2インスタンスなど）がどこに通信しにいくのか、そのルールを定めます。

### インターネットゲートウェイ
EC2インスタンスなどのAWSリソースとインターネット間で通信できるようにします。役割↓
- ルートテーブルにインターネットへのルートを追加する
- EC2インスタンスのプライベートIPアドレスをパブリックIPアドレスに変換する


## VPC構築
0. VPCの構成を決める
	- リージョン: 東京リージョン
	- VPCのCIDR: 192.168.0.0/16
	- サブネットの構成とそのアベイラビリティゾーン
	- 各サブネットのIPアドレス: 251個 (/24)
	- ルートテーブル: 2つ（パブリックサブネット用、プライベートサブネット用）
	- インターネットゲートウェイ: 1つ
	- ネットワークACL: デフォルト（すべて許可）
	- 名前タグ: 任意の名前を設定
1. VPC作成
2. サブネット作成
		パブリックの場合、アクション>サブネットの設定を編集 から パブリックIPv4アドレスの自動割り当てを有効化 する
3. ルートテーブル作成(2つ目以降を作成する場合)
4. インターネットゲートウェイ作成 &VPCにアタッチ
5. サブネットのパブリック・プライベート設定
		ルートテーブルにインターネットゲートウェイを設定（そのルートテーブルはパブリックになる）
		ルートテーブルとサブネットを関連付けする
6.  ACL作成(カスタムする場合)


