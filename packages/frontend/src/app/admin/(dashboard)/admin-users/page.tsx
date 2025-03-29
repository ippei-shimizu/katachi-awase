import AdminUserList from "@/app/admin/(dashboard)/admin-users/_components/AdminUserList";
import { getAdminUsers } from "@/app/admin/services/admin/adminUsers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "管理者ユーザー一覧 | 管理画面",
};

export default async function Page() {
  const adminUsers = await getAdminUsers();
  return (
    <div>
      <AdminUserList adminUsers={adminUsers.data} />
    </div>
  );
}
