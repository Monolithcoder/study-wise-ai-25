import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import studySpace from "@/assets/studytrack-study-space.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — StudyTrack AI" },
      { name: "description", content: "Sign in to your StudyTrack AI study dashboard." },
      { property: "og:title", content: "Sign in — StudyTrack AI" },
      { property: "og:description", content: "Pick up where your best study session left off." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message === "Invalid login credentials" ? "That email and password don't match." : signInError.message);
      return;
    }
    toast.success("Welcome back.");
    await navigate({ to: "/dashboard" });
  }

  async function sendReset() {
    if (!email.trim()) {
      setError("Enter your email address first, then request a reset link.");
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) setError(resetError.message);
    else toast.success("If an account exists for that address, a reset link is on its way.");
  }

  return (
    <main className="min-h-screen bg-background md:grid md:grid-cols-[1.1fr_.9fr]">
      <section className="study-grid relative hidden min-h-screen overflow-hidden border-r border-border md:block">
        <img src={studySpace} alt="A student studying in a quiet library" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/10" />
        <div className="absolute left-12 top-10 flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">S</span>
          STUDYTRACK <span className="text-primary">AI</span>
        </div>
        <div className="absolute bottom-14 left-12 max-w-lg">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> your focus, in focus</p>
          <h1 className="display-font text-6xl uppercase leading-[.98]">Make your<br />time <span className="text-primary">count.</span></h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Understand your time. Improve your focus. Study smarter.</p>
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-[410px]">
          <Link to="/" className="mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" /> Back to home</Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Welcome back</p>
          <h2 className="display-font text-4xl uppercase">Find your flow.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Sign in to pick up where you left off.</p>
          <form onSubmit={submit} className="mt-9 space-y-5">
            <label className="block space-y-2 text-sm font-medium" htmlFor="email">Email address
              <span className="relative block"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" className="h-11 pl-10" /></span>
            </label>
            <label className="block space-y-2 text-sm font-medium" htmlFor="password">Password
              <span className="relative block"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="h-11 pl-10 pr-11" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></span>
            </label>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy} className="h-11 w-full">{busy ? "Signing in…" : "Sign in"}<ArrowRight className="size-4" /></Button>
          </form>
          <button type="button" onClick={sendReset} className="mt-5 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">Forgot your password?</button>
          <p className="mt-9 border-t border-border pt-6 text-sm text-muted-foreground">New to StudyTrack? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
}