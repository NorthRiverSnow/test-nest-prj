## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript を利用して作成した、API作成のスターターキットです。
手順に従えば、簡単にAPIを追加・変更することができる様に作られています。

はじめにインストールから始めましょう。
前提条件は、

- node
- yarn
- docker
- docker-compose

上記のコマンドが利用可能であることで。
利用できない場合は、各種、インストールしてください。

## Installation

起動に必要なパッケージをインストールします。

```bash
$ yarn install
```

## Running the app

APIを起動します。

```bash
# debug mode
$ yarn run start:dev

# ⭐️debug mode: Dockerでコンテナを再作成しない
$ yarn start:docker

# ⭐️debug mode: Dockerでコンテナを再作成する(テーブル定義や./scripts/01_initTable.sql、初期データ./scripts/02_initDataを変更した場合に実行)
$ yarn start:docker:cleandb

# docker-compose down: Dockerコンテナを削除する
$ yarn stop:docker
```

[OPEN API](http://localhost:3000/api-docs)にアクセスしてください。
OPEN APIから

## Test

テストの実行は下記です。

```bash
# e2e test: Dockerでコンテナを再作成しない
$ yarn test:docker

# e2e test: Dockerでコンテナを再作成する(テーブル定義./scripts/01_initTable.sqlを変更した場合に実行)
$ yarn test:docker:cleandb

# 2e2 test: テスト用のDockerコンテナを削除する
```

Nest is [MIT licensed](LICENSE).
