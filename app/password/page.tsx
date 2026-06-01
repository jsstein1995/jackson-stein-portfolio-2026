import { Suspense } from "react";
import { PasswordGate } from "@/components/password-gate";

export const metadata = {
  title: "Password",
  robots: { index: false, follow: false },
};

export default function PasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-6">
          <p className="text-sm tracking-wide text-muted">Password</p>
        </div>
      }
    >
      <PasswordGate />
    </Suspense>
  );
}
