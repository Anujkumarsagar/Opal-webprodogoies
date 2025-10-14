import { SignIn } from "@clerk/nextjs";

type Props = {
  searchParams: { redirect_url?: string };
};

export default function SignInPage({ searchParams }: Props) {
  const redirectUrl = searchParams?.redirect_url;
  console.log("search params: ",searchParams?.redirect_url)

  // Always send to /auth/callback
  const callbackUrl = `/auth/callback${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`;

  return (
    <SignIn
      afterSignInUrl={callbackUrl}
      afterSignUpUrl={callbackUrl}
    />
  );
}
