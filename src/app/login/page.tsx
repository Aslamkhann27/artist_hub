import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-headline font-bold text-center mb-8 text-primary">Login to your Account</h1>
      <AuthForm mode="login" />
    </div>
  );
}
