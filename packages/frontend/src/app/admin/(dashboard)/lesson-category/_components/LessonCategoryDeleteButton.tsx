"use client";

import { deleteLessonCategory } from "@/app/admin/services/lessonCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LessonCategoryDeleteButton({ lessonCategoryId }: { lessonCategoryId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async (userId: number) => {
    if (!window.confirm("このレッスンカテゴリーを削除してもよろしいですか？この操作は元に戻せません。")) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      const success = await deleteLessonCategory(lessonCategoryId);

      if (success) {
        router.push("/admin/lesson-category");
        router.refresh();
      } else {
        setError("レッスンカテゴリーの削除に失敗しました");
      }
    } catch (err) {
      console.error("削除エラー:", err);
      setError(err instanceof Error ? err.message : "ユーザーの削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-md border-l-4 border-red-500 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <button
        onClick={() => onDelete(lessonCategoryId)}
        disabled={isDeleting}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
      >
        {isDeleting ? "削除中..." : "このカテゴリーを削除"}
      </button>
    </div>
  );
}
