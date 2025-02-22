// pages/index.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const MainPage = () => {
  return (
    <div>
      <SignedOut>
        {/* Redirect to sign-in page if not authenticated */}
        <div className="text-center">
          <h1>You are not signed in!</h1>
          <a href="/auth/sign-in" className="text-blue-500">
            Sign in here
          </a>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Content when signed in */}
        <div className="flex justify-between items-center p-6">
          <h1>Welcome to the Dashboard</h1>
          <UserButton />
        </div>
        {/* Add your main page content here */}
      </SignedIn>
    </div>
  )
}

export default MainPage
