import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("メールアドレスは正しい形式で入力してください"),
  password: z.string().min(1, "パスワードは必須です"),
});

export const adminMeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
