
import LessonCategoryList from "@/app/admin/(dashboard)/lesson-category/_components/LessonCategoryList";
import { getAdminLessonCategories } from "@/app/admin/services/admin/lessonCategories";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "レッスンカテゴリー一覧 | 管理画面",
};

export default async function Page() {
  const adminLessonCategories = await getAdminLessonCategories();

  return (
    <div>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LessonCategoryList lessonCategories={adminLessonCategories.data} />
      </Suspense>
    </div>
  );
}
