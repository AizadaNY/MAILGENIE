"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn , isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      router.push("/dashboard"); // ✅ Redirects after sign-up
    }
  }, [isSignedIn, router , isLoaded]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
            footerActionLink: "text-blue-500 hover:text-blue-600",
          },
        }}
      />
    </div>
  );
}
