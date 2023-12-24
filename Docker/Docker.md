## サーバー仮想化
### 仮想化の種類
- ホスト型仮想化： **ホスト OS** にインストールされ **ゲスト OS** を管理する
- ハイパーバイザー型仮想化： **ハードウェア** にインストールされ **ゲスト OS** を管理する
- コンテナ型仮想化： **ホストOS** にインストールされ **アプリケーション** を管理する
### コンテナ型の利点
 - 起動がはやい
 - デプロイしやすい
### コンテナ型の欠点
- ホストOSが違うと起動するコンテナも異なる

## Dockerとは
### Docker Engine
### Docker CLI
	`docker`コマンドで`dockerd`というデーモンに命令を伝え`containerd`というランタイムを操作する
### Docker Desktop
	WindowsやMacでDockerを使うためのGUIアプリケーションのこと
### Docker Compose
`docker compose`コマンドでDocker CLIを複数まとめて実行してくれるツール
Yamlファイルに書くことで実現できる。
### Docker Hub
DockerのイメージレジストリであるSaasサービス。公開されているイメージを``git pull
したり、`git push`できる

### ECS / GKE
[Amazon Elastic Container Service ( ECS )](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/Welcome.html) と [Google Kubernetes Engine ( GKE )](https://cloud.google.com/kubernetes-engine) は、コンテナ管理サービスで、Dcoker Engineが入っているため、コンテナごとデプロイできる。
### ECR / GCR
[Amazon Elastic Container Registry ( ECR )](https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/what-is-ecr.html) と [Google Container Registry ( GCR )](https://cloud.google.com/container-registry) は、非公開のイメージのレジストリのこと。プライベート版 ECR, GCRで、公開したくないけどレジストリに登録しないとデプロイできない場合などに使用する。

### Kubernetes
kubernetesは多数のコンテナを管理するオーケストレーションソフトウェアで、`kubectl`ではじまるコマンドを提供する。コンテナを運用するためのツール。

## Dockerの基本要素
### コンテナ
ホストマシン上の隔離された領域。
コンテナの実態は、LinuxのNamespaseで分離された１プロセス。
- コンテナはイメージをもとに作られる
- DockerのCLIやAPIで生成や起動停止が行える
- 複数コンテナは独立して影響せず、独自に動作する。

### イメージ
イメージはコンテナの実行に必要なパッケージで、ファイルやメタ情報をお集めたもの。
イメージは複数のレイヤーからなる情報で、ホストマシンの何処かに具体的な単一ファイルが存在するわけではない。
イメージには下記のような情報が含まれている
- ベースはなにか
- 環境変数はどうなっているか
- どういう設定ファイルを配置しているか
- デフォルト命令はなにか

### Dockerfile
Dockerfile はベースとなるイメージを指定し、「コマンドのインストール」や「設定ファイルの配置」などのレイヤーを重ねて、新たなイメージを作るための指示が書いてあるテキストファイル。
## 基本のコマンド
### docker container run
`container run` イメジからコンテナを起動するコマンド。
下記のコマンドを一度に実行するコマンド。
- `docker image pull`
- `docker container create`
- `docker container start`
### docker image build
Dockerファイルからイメージを作成するコマンド。
### docker container exec
コンテナに命令を送るコマンド。

## Docker Compose
Yamlファイルを書くことにより、複数のコンテナをまとめて起動できるツール
`docker run nigix` など詳細命令を全部Yamlに書いてGithubに共有することができる

## Kubernetes
- 同じコンテナを複数台起動してクラスタを構築
- コンテナの監視
- コンテナの自動再起動
などできる

## コマンド
### コンテナの起動
```terminal
$ docker container run [option] <image> [command]
$ docker run [option] <image> [command]
```
### コンテナ一覧
```terminal
$ docker container ls [option]
$ docker ps [option]

起動中以外のコンテナを含めて表示
$ docker container ls -a
```
### コンテナを停止
```terminal
$ docker container stop [option] <container>
$ docker stop [option] <container>
```
### コンテナを削除
```terminal
$ docker container rm [option] <container>
$ docker rm [option] <container>

起動中のコンテナを停止して削除
$ docker container rm -f <container>
```
### コンテナを起動
```
$ docker container run [option]

コンテナの標準入力に接続し(-i)、疑似ターミナルを割り当てる(-t)
$ docker container run -it 

バックグラウンドで起動
$ docker container run -d

停止済みとなったときにコンテナを自動で削除
$ docker container run --rm

名前(一意)をつける(名前を指定してコマンドを指定できる)
$ docker container run --name

イメージのアーキテクチャを表示する
$ docker container run --platform
```
### コンテナ内でコマンドを実行する
```
$ docker container exec [option] <container> command

例) mysqlでbash起動する
$ docker container exec -it mysql bash 
```
### イメージ一覧
```
$ docker image ls [option]
```
イメージは [Docker Hub](https://hub.docker.com/) で検索して選ぶ
### イメージをビルドする
```
$ docker image build [option] <path>
```
### イメージのレイヤーを確認する
```
$ docker image history [option] <image>
```
### ボリュームを作成する
```
$ docker volume create [option]
```

### ネットワークを作成する
```
$ docker network create [option] name
```
## Dockerプロセス
- コンテナは **ある１つのコマンドを実行するため** に起動している
    - それはデフォルト命令か指定命令の **どちらか** で、**`PID` が `1` になる**
- 複数のコンテナの `PID = 1` は **Linux の Namespace 機能により衝突しない**

また、**メインプロセスが終了したコンテナは自動で停止する** という重要な点を理解できるようになります。（起動したbashをexitする）
## コンテナの仕様
- コンテナは **起動するたびに違うコンテナ** である
- コンテナの操作は **ほかのコンテナに影響しない**
- 別のコンテナに変更を反映するには、なんらかの対処が必要
    - Dockerfile
    - ボリュームやバインドマウント
## Dockerfile
|命令|効果 `example`|
|---|---|
|`FROM`|ベースイメージを指定する `FROM ubunts:20.04`|
|`RUN`|任意のコマンドを実行する `RUN apt update` `apt install vim`|
|`COPY`|ホストマシンのファイルをイメージに追加する `COPY .vimrc /root/.vimrc |
|`CMD`|デフォルト命令を指定する ``|


## Dockerfileを複数扱うには
### 想定するディレクトリ構成
```Host Machine
$ tree -a .

.
`-- docker   *image buildを実行するファイル
    `-- date
        |-- .vimrc
        `-- Dockerfile
```

### 実行コマンド
```
$ docker image build \
	--tag my-uunts:date \ 
	--file docker/date/Dockerfile \  *Dockerfileの所在
	docker/date　*COPYで指定するときの相対パス
```

## RUNをいくつのレイヤーにするか
[zenn](https://zenn.dev/suzuki_hoge/books/2022-03-docker-practice-8ae36c33424b59/viewer/2-8-dockerfile#(-%E4%BD%99%E8%AB%87-)-run-%E3%82%92%E3%81%84%E3%81%8F%E3%81%A4%E3%81%AE%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC%E3%81%AB%E3%81%99%E3%82%8B%E3%81%8B)

## ボリュームとバインド
### **ボリュームマウント (Volume Mounting):**
    - Dockerが管理するデータの永続化を提供する
    - データはホストマシン内のDockerデータボリュームに保存される
    - コンテナとホスト間でデータのやり取りが行われ、コンテナが停止してもデータは保持される
    
```
# ボリュームの作成 
$ docker volume create my_volume  

# ボリュームのマウント 
$ docker run -v my_volume:/path/in/container my_image
```
    
### **バインドマウント (Bind Mounting):**
    - ホストマシンの任意のディレクトリを直接コンテナにマウントする
    - データはホストディレクトリと直接同期されるため、ホスト上の変更が即座にコンテナに反映される
    - コンテナが停止すると、ホストとのマウントが切断され、データは保持されない
    - ファイルシステムのパーミッションや所有権が直接反映される
 ```
# バインドマウント 
$ docker run -v /host/path:/path/in/container my_image
```

ボリュームマウントはデータの永続性が求められる場合に便利であり
バインドマウントは開発時やデバッグ時にホストとのリアルタイムな同期が必要な場合に適しています。

## Dockerのネットワーク
Docker のコンテナはネットワークドライバというもので Docker ネットワークに接続されます。
###  ブリッジネットワーク(default)
- **同一の Docker Engine 上のコンテナ** が互いに通信をする場合に利用する

デフォルト(設定の指定をしない場合)だと
1. コンテナが通信するためには、全てのコンテナ間をリンクする操作が必要になる
2. コンテナ間の通信は IP アドレスで行う
3. Docker Engine 上の全てのコンテナ ( たとえば別プロジェクト ) に接続できてしまう
　　　　 
ユーザ定義ブリッジネットワーク　は、
1. 相互通信をできるようにするには同じネットワークを割り当てるだけでよい
2. コンテナ間で自動的に DNS 解決を行える
3. 通信できるコンテナが同一ネットワーク上のコンテナに限られ、隔離度があがる
4. DcokerCompose.ymlを使用する場合、自動でユーザー定義ブリッジネットワークになるよ

### オーバーレイネットワーク
- **異なる Docker Engine 上のコンテナ** が互いに通信をする場合に利用する


## デバックノウハウ
### 一覧を確認する

`xxx ls` で対象の一覧を確認できます。

- イメージの一覧は `image ls`
- コンテナの一覧は `container ls`
- ボリュームの一覧は `volume ls`
- ネットワークの一覧は `network ls`

### 詳細を確認する

`xxx inspect` で対象の詳細を確認できます。

- イメージの一覧は `image inspect <image>`
- コンテナの一覧は `container inspect <container>`
- ボリュームの一覧は `volume inspect <volume>`
- ネットワークの一覧は `network inspect <network>`

### コンテナの出力を確認する

`--detach` オプションを付けてバックグラウンドで起動したコンテナでも、出力を確認する方法がいくつかあります。

### container logs を使う
`container logs` はターミナルへ出力されるはずだった内容を表示します。
```txt
$ docker container logs [option] <container>
```

`--follow` もあるので、ほとんど Linux の `tail -f` と同じ感覚で使えます。

[３部: デバッグノウハウ ( 番外編 )｜実践 Docker - ソフトウェアエンジニアの「Docker よくわからない」を終わりにする本](https://zenn.dev/suzuki_hoge/books/2022-03-docker-practice-8ae36c33424b59/viewer/3-9-debug-know-how)

