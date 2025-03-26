import Link from "next/link";
import navCssStyles from "../css/navCss.module.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignUp,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <>
      <div className="flex gap-2">
        <p>Welcome |&nbsp;</p>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
