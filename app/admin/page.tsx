import { isAdminAuthed } from "@/lib/auth";
import { getCatalog, isPersistenceConfigured } from "@/lib/storage";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthed();
  if (!authed) {
    return <AdminLogin />;
  }
  const { products, settings } = await getCatalog();
  const persistence = isPersistenceConfigured();
  return (
    <AdminDashboard
      initialProducts={products}
      initialSettings={settings}
      persistenceConfigured={persistence}
    />
  );
}
