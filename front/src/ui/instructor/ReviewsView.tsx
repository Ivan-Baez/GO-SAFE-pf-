import InstructorSidebar from "@/components/dashboard/InstructorSidebar"
import Reviews from "@/components/dashboard/Reviews"

export default function ReviwesView(){
    return(
        <section className="min-h-screen bg-gray-50 w-full flex">
          <InstructorSidebar />
          <Reviews/>
        </section>
    )
}