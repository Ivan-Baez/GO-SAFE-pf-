export const dynamic = "force-dynamic";

import BlogsView from "@/ui/BlogsView";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al traer blogs");

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogPage(){
    const blogs = await getBlogs();
    return(
        <section>
            <BlogsView blogs={blogs}/>
        </section>
    )
}