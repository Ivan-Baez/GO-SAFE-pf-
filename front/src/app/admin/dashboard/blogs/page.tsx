import AdminBlogsView from "@/ui/admin/AdminBlogs";
import { AdminSidebar } from "@/ui/user/AdminSidebar";

export default function AdminBlogsPage() {
  return (
      <section className="min-h-screen bg-gray-50 w-full flex ">
        <AdminSidebar/>
        <div className="w-full mx-auto flex-1">
          <AdminBlogsView />;
        </div>
      </section>
    )
}