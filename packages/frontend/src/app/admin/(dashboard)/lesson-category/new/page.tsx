import LessonCategoryForm from "@/app/admin/(dashboard)/lesson-category/_components/LessonCategoryForm";

export const metadata = {
  title: "レッスンカテゴリー作成 | 管理画面",
};

export default function Page() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <LessonCategoryForm mode="create" />
    </div>
  );
}
