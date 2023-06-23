# ごちゃ混ぜ

### Gemfileのproduction以外をbundleinstallする
```console
$ bundle install --without production

↑は現在非推奨らしい？
$ bundle config set --local without 'production'
```
    
#### `gem "net-smtp"`  
Simple Mail Transfer Protocol (SMTP)を使用して電子メールを送信するためのライブラリです。SMTPは、電子メールメッセージを送信するための標準的なプロトコルです。
    
#### `gem "net-pop"`  
Post Office Protocol (POP)を使用してメールサーバーから電子メールを取得するためのライブラリです。POPは、メールサーバーからクライアントにメールをダウンロードするためのプロトコルです。
    
#### `gem "net-imap"`
Internet Message Access Protocol (IMAP)を使用してメールサーバー上で電子メールを管理するためのライブラリです。IMAPは、メールクライアントとメールサーバー間でメッセージを同期するためのプロトコルで、メールをサーバー上で直接管理できます。
