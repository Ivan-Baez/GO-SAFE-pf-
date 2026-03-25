import AdminUsers from "@/ui/admin/AdminUsers";
import { AdminSidebar } from "@/ui/user/AdminSidebar";

export default function AdminUsersPage() {
  return (
      <section className="min-h-screen bg-gray-50 w-full flex ">
          <AdminSidebar/>
          <div className="w-full mx-auto flex-1">
          <AdminUsers/>;
          </div>
     </section>
    );
}