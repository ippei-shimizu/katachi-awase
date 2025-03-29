"use client";

import { createAdminUser, updateAdminUser } from "@/app/admin/services/adminUsers";
import { AdminUser, AdminUserCreate, AdminUserUpdate } from "@api/admin/types/admin-user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const baseFieldsSchema = {
  name: z.string().min(1, { message: "名前は必須項目です" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
};

const createSchema = z
  .object({
    ...baseFieldsSchema,
    password: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }),
    passwordConfirmation: z.string().min(6, { message: "パスワード（確認）は6文字以上で入力してください" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

const updateSchema = z
  .object({
    ...baseFieldsSchema,
    password: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }).optional(),
    passwordConfirmation: z.string().min(6, { message: "パスワード（確認）は6文字以上で入力してください" }).optional(),
  })
  .refine((data) => !data.password || !data.passwordConfirmation || data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

type CreateFormValues = z.infer<typeof createSchema>;
type UpdateFormValues = z.infer<typeof updateSchema>;

type FormValues = AdminUserFormProps["mode"] extends "create" ? CreateFormValues : UpdateFormValues;

interface AdminUserFormProps {
  mode: "create" | "edit";
  userData?: AdminUser;
}

export default function AdminUserForm({ mode, userData }: AdminUserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = mode === "create" ? createSchema : updateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
    }
  }, [userData, setValue, mode]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const { ...submitData } = data;

      if (mode === "edit" && !submitData.password) {
        delete submitData.password;
      }

      if (mode === "create") {
        await createAdminUser({
          name: submitData.name,
          email: submitData.email,
          password: submitData.password,
          passwordConfirmation: submitData.passwordConfirmation,
        } as AdminUserCreate);
      } else {
        if (!userData) throw new Error("ユーザーデータが見つかりません");
        await updateAdminUser(userData.id, {
          name: submitData.name,
          email: submitData.email,
          password: submitData.password,
          passwordConfirmation: submitData.passwordConfirmation,
        } as AdminUserUpdate);
      }

      router.push("/admin/admin-users");
      router.refresh();
    } catch (err) {
      console.error("ユーザー処理エラー:", err);
      setError(err instanceof Error ? err.message : `ユーザーの${mode === "create" ? "作成" : "更新"}に失敗しました`);
      setIsSubmitting(false);
    }
  };

  const formTitle = mode === "create" ? "管理者ユーザーの新規作成" : "管理者ユーザーの編集";
  const submitButtonText = mode === "create" ? "作成する" : "更新する";

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800">{formTitle}</h2>
      </div>

      {error && (
        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              名前
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {mode === "edit" ? "パスワード（変更する場合のみ）" : "パスワード"}
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              {mode === "edit" ? "パスワード確認（変更する場合のみ）" : "パスワード（確認）"}
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.passwordConfirmation && (
              <p className="mt-1 text-sm text-red-600">{errors.passwordConfirmation.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-5">
          <Link
            href="/admin/admin-users"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white p-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 p-2 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "送信中..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
