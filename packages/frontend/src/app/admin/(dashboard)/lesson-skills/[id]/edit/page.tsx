import LessonSkillDeleteButton from "@/app/admin/(dashboard)/lesson-skills/_components/LessonSkillDeleteButton";
import LessonSkillForm from "@/app/admin/(dashboard)/lesson-skills/_components/LessonSkillForm";
import { getLessonSkill } from "@/app/admin/services/lessonSkills";

export const metadata = {
  title: "レッスンスキル編集 | 管理画面",
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const lessonSkillResponse = await getLessonSkill((await params).id);

  if ("error" in lessonSkillResponse) {
    return <p className="text-red-700">エラー: {lessonSkillResponse.error}</p>;
  }

  const lessonSkill = lessonSkillResponse.data[0];

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <LessonSkillForm mode="edit" skillData={lessonSkill} />
      <div className="mt-5 flex flex-col items-end">
        <p className="text-right text-sm text-gray-500">
          このレッスンスキルを削除すると、関連するすべてのデータが永久に失われます。 <br />
          この操作は元に戻せません。
        </p>
        <div className="mt-2">
          <LessonSkillDeleteButton lessonSkillId={lessonSkill.id} />
        </div>
      </div>
    </div>
  );
}
