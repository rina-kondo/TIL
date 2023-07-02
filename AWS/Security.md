## AWSの責任共有モデル
AWSでは、「AWS側で担保する範囲」、「利用者側で担保しなければならない範囲」をそれぞれ定義しています。

## AWS側のセキュリティ
#### 1. セキュリティを担保するための設計（例）
- 物理セキュリティの担保
    - データセンターおよびハードウェアの管理　
    - 物理アクセス可能な権限の管理
    - ストレージの破棄
- ネットワークセキュリティの担保
    - ネットワークセキュリティ
        - DDoS、MITM（中間者攻撃）、IPスプーフィング、ポートスキャン など
    - ネットワークで転送されるトラフィックのセキュリティ機能の提供
        - セキュリティグループ
        - ネットワークアクセスコントロールリスト （ACL）
        - サブネット、ルートテーブル、インターネットゲートウェイ

#### 2. 継続的なモニタリング
AWSサービスは、AWSによって継続的にスキャンおよびテストされています。

#### 3. 高度な自動化
AWSでは、ほとんどのセキュリティツールが専用に構築され、AWS独特の環境やスケール要件に合わせてカスタマイズされています。

#### 4. 高い可用性
AWSのデータセンターは、複数の地理的リージョンや各リージョン内の複数のアベイラビリティーゾーンに構築されています。  
システムが継続して稼働するための最大限の弾力性を確保しています。

#### 5. 高い信頼性
特定のセキュリティ管理が目的どおりに実施・運用されているかどうか、監査人によって検証されています。

## AWS利用者側のセキュリティ
- AWSのサービスや機能を利用する際のセキュリティ対策
- Webアプリケーション側で行うセキュリティ対策

## AWSのサービスや機能を用いたセキュリティ対策
### AWSアカウントへのアクセス管理のサービス
**AWSサービスにアクセスするユーザ・権限を管理**
- IAM（Identity and Access Management）
	ユーザー・グループ作成と権限付与ができる
- MFA（Multi-Factor Authentication）
	2段階認証、多段階認証
     
**AWSサービスへのアクセスや操作を記録・監視・保持**
- CloudTrail
    
 **データ保護**
データやアカウントなどを不正アクセスから保護するサービスです。モニタリングや脅威の検出などを行います。
-  [KMS（AWS Key Management Service）](https://aws.amazon.com/jp/kms/?c=sc&sec=srv)
- [AWS Certificate Manager](https://aws.amazon.com/jp/certificate-manager/?c=sc&sec=srv)　など
    
**Identity ＆ Access Management**
AWSアカウントと各サービスへのアクセスを管理、監査するサービスです。
-  [IAM（AWS Identity and Access Management）](https://aws.amazon.com/jp/iam/?c=sc&sec=srv)
- [AWS Secrets Manager](https://aws.amazon.com/jp/secrets-manager/?c=sc&sec=srv)　など
    
**インフラストラクチャの保護**
ウェブアプリケーションを保護するサービスです。
-  [WAF（AWS Web Application Firewall）](https://aws.amazon.com/jp/waf/?c=sc&sec=srv)
- [Amazon Inspector](https://aws.amazon.com/jp/inspector/?c=sc&sec=srv)　など
    
**脅威の検出と継続的なモニタリング**
クラウド環境内の動作を継続的にモニタリングすることによって、脅威を識別するサービスです。
-  [Amazon GuardDuty](https://aws.amazon.com/jp/guardduty/?c=sc&sec=srv)
- [AWS Security Hub](https://aws.amazon.com/jp/security-hub/?c=sc&sec=srv)　など

**コンプライアンスとデータプライバシー**
法令や規則を遵守するためのサービスです。
-  [AWS Artifact](https://aws.amazon.com/jp/artifact/?c=sc&sec=srv)

## ウェブアプリケーション側で行うセキュリティ対策
### 脆弱性対策
- アプリケーションのプログラムミス
- 古いバージョンのソフトウェアを利用することで、既知の脆弱性への対処不足
- SQLインジェクション
- クロスサイトスクリプティング
- 強制ブラウジング
- Cookieの濫用（改ざん）
- バックドア、デバッグオプション
- [情報セキュリティ対策](https://www.ipa.go.jp/security/10threats/index.html)

ご自身が開発するアプリケーションの脆弱性だけでなく、Nginxなどのミドルウェアやプログラム言語自体にも脆弱性が見つかることもあります。  
たとえば、Ruby on Railsでセキュリティアラート（問題）がある場合は、以下のようなセキュリティに関するアップデートを確認してください。
[Security fix releases of Rails](https://weblog.rubyonrails.org/2019/3/13/Rails-4-2-5-1-5-1-6-2-have-been-released/)
