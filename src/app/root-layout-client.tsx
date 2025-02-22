"use client";

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define public routes
  const isPublicRoute =
    pathname === "/" || // Welcome page
    pathname.startsWith("/auth/sign-in") ||
    pathname.startsWith("/auth/sign-up");

  return (
    <ClerkProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}>
        {/* Show Sidebar only for private pages */}
        {!isPublicRoute && <Sidebar />}
        
        <div className="flex-1 ml-64 p-6 overflow-auto">
          {/* Show Welcome Page if the user is not authenticated and on "/" */}
          {pathname === "/" && (
            <SignedOut>
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold">Welcome to My App</h1>
                <p className="text-gray-600 mt-2">Sign in to access exclusive features.</p>
                <div className="mt-4 space-x-4">
                  <Link href="/auth/sign-in" className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</Link>
                  <Link href="/auth/sign-up" className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</Link>
                </div>
              </div>
            </SignedOut>
          )}

          {/* If the user is trying to access a private page, protect it */}
          {!isPublicRoute ? (
            <>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </ClerkProvider>
  );
}
