import AdminUserDeleteButton from "@/app/admin/admin-users/_components/AdminUserDeleteButton";
import AdminUserForm from "@/app/admin/admin-users/_components/AdminUserForm";
import { getAdminUser } from "@/app/admin/services/adminUsers";

export const metadata = {
  title: "管理者ユーザー編集 | 管理画面",
  description: "管理者ユーザー情報を編集します",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const adminUser = await getAdminUser((await params).id);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <AdminUserForm mode="edit" userData={adminUser} />
      <div className="mt-5 flex flex-col items-end">
        <p className="text-right text-sm text-gray-500">
          このユーザーを削除すると、関連するすべてのデータが永久に失われます。 <br />
          この操作は元に戻せません。
        </p>
        <div className="mt-2">
          <AdminUserDeleteButton adminUserId={adminUser.id} />
        </div>
      </div>
    </div>
  );
}
