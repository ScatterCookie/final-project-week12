import Link from "next/link";
import navcssStyles from "../css/navcss.module.css";
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
    SignUp
  } from "@clerk/nextjs";

export default function Header() {
  return (
    <>
      <div className="flex-col">
        Hiii
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