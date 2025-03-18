import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/sign-in"); // Redirect if not authenticated
  }
   
   return (
    <div>
    <Sidebar />
   </div>
  );
}
