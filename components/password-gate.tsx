"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function PasswordGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(true);
        setIsSubmitting(false);
        return;
      }

      const from = searchParams.get("from") || "/";
      router.replace(from);
      router.refresh();
    } catch {
      setError(true);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
        aria-label="Password required"
      >
        <label
          htmlFor="site-password"
          className="block text-sm tracking-wide text-muted"
        >
          Password
        </label>
        <input
          id="site-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (error) setError(false);
          }}
          className="mt-3 w-full border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-foreground"
        />
        {error && (
          <p className="mt-3 text-sm text-muted" role="alert">
            Incorrect password
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || password.length === 0}
          className="mt-8 text-sm tracking-wide text-foreground transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
