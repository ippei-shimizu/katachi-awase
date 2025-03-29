import AdminUserForm from "@/app/admin/(dashboard)/admin-users/_components/AdminUserForm";

export const metadata = {
  title: "管理者ユーザー作成 | 管理画面",
  description: "新しい管理者ユーザーを作成します",
};

export default function Page() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <AdminUserForm mode="create" />
    </div>
  );
}
