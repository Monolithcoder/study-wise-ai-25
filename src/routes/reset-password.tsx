import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerFn } from "@tanstack/react-start";
import { updatePassword } from "@/lib/studytrack.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — StudyTrack AI" },
      { name: "description", content: "Choose a new password for your StudyTrack AI account." },
      { property: "og:title", content: "Reset your password — StudyTrack AI" },
      { property: "og:description", content: "Choose a new password for your StudyTrack AI account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const savePassword = useServerFn(updatePassword);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("Those passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      await savePassword({ data: { password } });
      toast.success("Your password has been updated.");
      await navigate({ to: "/dashboard", replace: true });
    } catch {
      setError("This reset link may have expired. Request a new one and try again.");
    } finally {
      setBusy(false);
    }
  }

  useEffectForRecoverySession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <section className="w-full max-w-md">
        <Link to="/login" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to sign in</Link>
        <p className="text-xs font-semibold uppercase text-primary">Account recovery</p>
        <h1 className="display-font mt-3 text-4xl uppercase">Choose a new password.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Use at least 8 characters for your new password.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block space-y-2 text-sm font-medium" htmlFor="new-password">New password
            <span className="relative block"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="new-password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 pl-10" /></span>
          </label>
          <label className="block space-y-2 text-sm font-medium" htmlFor="confirm-password">Confirm new password
            <Input id="confirm-password" type="password" autoComplete="new-password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="h-11" />
          </label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="h-11 w-full">{busy ? "Updating…" : "Update password"}</Button>
        </form>
      </section>
    </main>
  );
}

function useEffectForRecoverySession() {
  // Trigger the auth client to exchange a recovery token when the reset URL opens.
  void supabase.auth.getSession();
}