import LessonCategoryDeleteButton from "@/app/admin/(dashboard)/lesson-category/_components/LessonCategoryDeleteButton";
import LessonCategoryForm from "@/app/admin/(dashboard)/lesson-category/_components/LessonCategoryForm";
import { getLessonCategory } from "@/app/admin/services/lessonCategories";

export const metadata = {
  title: "レッスンカテゴリー編集 | 管理画面",
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const lessonCategoryResponse = await getLessonCategory((await params).id);

  if ("error" in lessonCategoryResponse) {
    return <p className="text-red-700">エラー: {lessonCategoryResponse.error}</p>;
  }

  const lessonCategory = lessonCategoryResponse.data[0];

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <LessonCategoryForm mode="edit" categoryData={lessonCategory} />
      <div className="mt-5 flex flex-col items-end">
        <p className="text-right text-sm text-gray-500">
          このレッスンカテゴリーを削除すると、関連するすべてのデータが永久に失われます。 <br />
          この操作は元に戻せません。
        </p>
        <div className="mt-2">
          <LessonCategoryDeleteButton lessonCategoryId={lessonCategory.id} />
        </div>
      </div>
    </div>
  );
}
