"use client";

import { createLessonSkill, updateLessonSkill } from "@/app/admin/services/lessonSkills";
import { LessonSkill, LessonSkillCreate, LessonSkillUpdate } from "@api/admin/types/lesson-skill";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1, { message: "スキル名は必須項目です" }),
  slug: z
    .string()
    .min(1, { message: "スラッグは必須項目です" })
    .regex(/^[a-z0-9-]+$/, { message: "スラッグは小文字英数字とハイフンのみ使用できます" }),
  position: z.coerce.number().int().min(0, { message: "表示順は0以上の整数で入力してください" }),
});

type FormValues = z.infer<typeof skillSchema>;

interface LessonSkillFormProps {
  mode: "create" | "edit";
  skillData?: LessonSkill;
}

export default function LessonSkillForm({ mode, skillData }: LessonSkillFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      slug: "",
      position: 0,
    },
  });

  useEffect(() => {
    if (mode === "edit" && skillData) {
      setValue("name", skillData.name);
      setValue("slug", skillData.slug);
      setValue("position", skillData.position);
    }
  }, [skillData, setValue, mode]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (mode === "create") {
        await createLessonSkill({
          name: data.name,
          slug: data.slug,
          position: data.position,
        } as LessonSkillCreate);
      } else {
        if (!skillData) throw new Error("スキルデータが見つかりません");
        await updateLessonSkill(skillData.id, {
          name: data.name,
          slug: data.slug,
          position: data.position,
        } as LessonSkillUpdate);
      }

      router.push("/admin/lesson-skills");
      router.refresh();
    } catch (err) {
      console.error("スキル処理エラー:", err);
      setError(err instanceof Error ? err.message : `スキルの${mode === "create" ? "作成" : "更新"}に失敗しました`);
      setIsSubmitting(false);
    }
  };

  const formTitle = mode === "create" ? "レッスンスキルの新規作成" : "レッスンスキルの編集";
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
              スキル名
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
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              スラッグ
            </label>
            <input
              id="slug"
              type="text"
              {...register("slug")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">URLで使用される識別子です（例: beginner, intermediate）</p>
            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              表示順
            </label>
            <input
              id="position"
              type="number"
              min="0"
              step="1"
              {...register("position")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">小さい数字ほど先頭に表示されます</p>
            {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-5">
          <Link
            href="/admin/lesson-skills"
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
