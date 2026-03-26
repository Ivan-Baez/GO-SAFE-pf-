import AdminExperiences from "@/ui/admin/AdminExperiences";
import { AdminSidebar } from "@/ui/user/AdminSidebar";

export default function AdminExperiencesPage() {
  
  return(
    <section className="min-h-screen bg-gray-50 w-full flex ">
      <AdminSidebar/>
      <div className="w-full mx-auto flex-1">
        <AdminExperiences />;
      </div>
    </section>
  ) }