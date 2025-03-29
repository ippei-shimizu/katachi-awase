import LessonSkillList from "@/app/admin/(dashboard)/lesson-skills/_components/LessonSkillList";
import { getLessonSkills } from "@/app/admin/services/lessonSkills";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "レッスンスキル一覧 | 管理画面",
};

export default async function Page() {
  const lessonSkills = await getLessonSkills();

  return (
    <div>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LessonSkillList lessonSkills={lessonSkills.data} />
      </Suspense>
    </div>
  );
}
