import InstructorSidebar from "@/components/dashboard/InstructorSidebar"
import Reviews from "@/components/dashboard/Reviews"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default function ReviwesView(){
    return(
        <DashboardLayout sidebar={<InstructorSidebar />}>
          <Reviews />
        </DashboardLayout>
    )
}