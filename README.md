# katachi-awase

## Setup

## Migration

```bash
$ cd packages/api
```

schema.tsに基づき、マイグレーションファイル生成

```bash
$ pnpm run db:generate
```

データベースに変更を適用

```bash
$ pnpm run db:migrate
```

データベース管理インターフェース

```bash
$ pnpm run db:studio
```

## URL

- frontend : http://localhost:3000/ 
- api : http://localhost:8787/ 
- supabase : http://127.0.0.1:54323/project/default 
