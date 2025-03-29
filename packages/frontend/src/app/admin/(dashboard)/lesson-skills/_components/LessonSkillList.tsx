import { LessonSkill } from "@api/admin/types/lesson-skill";
import Link from "next/link";

export default function LessonSkillList({ lessonSkills }: { lessonSkills: LessonSkill[] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-semibold text-gray-800">レッスンスキル一覧</h2>
        <Link
          href="/admin/lesson-skills/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                スラッグ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">表示順</th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">作成日</th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {lessonSkills.map((skill) => (
              <tr key={skill.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{skill.id}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{skill.name}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">{skill.slug}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">{skill.position}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                  {new Date(skill.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                  <Link
                    href={`/admin/lesson-skills/${skill.id}/edit`}
                    className="mr-4 text-blue-600 hover:text-blue-900"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
            {lessonSkills.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  レッスンスキルはまだ登録されていません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
