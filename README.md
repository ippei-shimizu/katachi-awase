# katachi-awase

## Description

## Setup
### Frontend
```bash
$ cd frontend
```
```bash
$ pnpm install
```
```bash
$ pnpm dev
```

### API
```bash
$ cd api
```
```bash
$ pnpm install
```
``` bash
$ pnpm dev
```

### Database
```bash
$ cd api
```
ローカル環境にSupabaseのインスタンスを起動
```bash
$ supabase start
```
Supabaseのインスタンスを停止
```bash
$ supabase stop
```
マイグレーションを実行
```bash
$ npx prisma migrate dev --name ${マイグレーション名}
```
