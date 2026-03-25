import MyBlogsView from "@/ui/MyBlogsView";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";

export default function InstructorBlogsPage() {
  return (
    <section className="min-h-screen bg-gray-50 w-full flex">
      <InstructorSidebar/>
      <div className="w-full h-screen flex-1">
        <MyBlogsView />;
      </div>
    </section>
  ) 
}