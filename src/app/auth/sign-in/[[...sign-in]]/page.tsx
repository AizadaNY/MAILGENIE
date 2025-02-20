"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn , isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      router.push("/dashboard"); // ✅ Redirects after sign-up
    }
  }, [isSignedIn, router, isLoaded]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

