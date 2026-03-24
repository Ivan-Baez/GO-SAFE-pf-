
import AdminInstructors from "@/ui/admin/AdminInstructors";
import { AdminSidebar } from "@/ui/user/AdminSidebar";

export default function AdminInstructorsPage() {

  return (
    <section className="min-h-screen bg-gray-50 w-full flex ">
        <AdminSidebar/>
        <div className="w-full mx-auto flex-1">
        <AdminInstructors/>
        </div>
   </section>
  );
}