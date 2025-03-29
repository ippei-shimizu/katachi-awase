import AdminLessonCategoryList from "@/app/admin/(dashboard)/lesson-category/_components/AdmiLessonCategoryList";
import { getAdminLessonCategories } from "@/app/admin/services/admin/adminLessonCategories";
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
        <AdminLessonCategoryList lessonCategories={adminLessonCategories.data} />
      </Suspense>
    </div>
  );
}
