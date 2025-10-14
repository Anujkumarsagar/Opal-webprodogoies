import { SignUp } from "@clerk/nextjs";

type Props = {
  searchParams: { redirect_url?: string };
};

export default async function SignUpPage({ searchParams }: Props) {
  const redirectUrl = (await searchParams)?.redirect_url;
  
  // Always send to /auth/callback
  const callbackUrl = `/auth/callback${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`;

  return (
    <SignUp
      afterSignUpUrl={callbackUrl}
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
        },
      }}
    />
  );
}