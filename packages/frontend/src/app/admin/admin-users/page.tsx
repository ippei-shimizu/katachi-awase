import AdminUserList from "@/app/admin/admin-users/_components/AdminUserList";
import { getAdminUsers } from "@/app/admin/services/adminUsers";

export default async function Page() {
  const adminUsers = await getAdminUsers();
  return (
    <div>
      <AdminUserList adminUsers={adminUsers} />
    </div>
  );
}
