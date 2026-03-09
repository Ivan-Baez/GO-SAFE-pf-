import dynamic from "next/dynamic"
import Registerpage from "./register/page"
import RegisterView from "@/ui/RegisterView"

export default function Home(){
    return(
        <div>
            <RegisterView></RegisterView>
        </div>
    )
}