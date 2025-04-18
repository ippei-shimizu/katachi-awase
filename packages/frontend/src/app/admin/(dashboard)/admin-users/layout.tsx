export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">管理者ユーザー管理</h1>
      <main>{children}</main>
    </div>
  );
}
