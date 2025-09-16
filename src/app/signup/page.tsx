import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-headline font-bold text-center mb-8 text-primary">Create an Account</h1>
      <AuthForm mode="signup" />
    </div>
  );
}
