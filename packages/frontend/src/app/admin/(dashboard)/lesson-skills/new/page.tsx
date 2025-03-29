import LessonSkillForm from "@/app/admin/(dashboard)/lesson-skills/_components/LessonSkillForm";

export const metadata = {
  title: "レッスンスキル作成 | 管理画面",
};

export default function Page() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <LessonSkillForm mode="create" />
    </div>
  );
}
