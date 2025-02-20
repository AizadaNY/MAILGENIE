import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EmailMarketingPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/sign-in"); // Redirect if not authenticated
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
      <p>Email Marketing Page</p>
    </div>
  );
}