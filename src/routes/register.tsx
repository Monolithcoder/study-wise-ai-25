import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import studySpace from "@/assets/studytrack-study-space.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — StudyTrack AI" },
      { name: "description", content: "Create a StudyTrack AI account and build a study routine that works for you." },
      { property: "og:title", content: "Create your account — StudyTrack AI" },
      { property: "og:description", content: "Build a study routine that works for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { data, error: registerError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName.trim() } } });
    setBusy(false);
    if (registerError) {
      setError(registerError.message);
      return;
    }
    if (!data.session) {
      toast.success("Check your inbox to confirm your email, then sign in.");
      await navigate({ to: "/login" });
      return;
    }
    toast.success("Your account is ready.");
    await navigate({ to: "/onboarding" });
  }

  return (
    <main className="min-h-screen bg-background md:grid md:grid-cols-[1.1fr_.9fr]">
      <section className="study-grid relative hidden min-h-screen overflow-hidden border-r border-border md:block">
        <img src={studySpace} alt="A student studying in a quiet library" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/10" />
        <div className="absolute left-12 top-10 flex items-center gap-3 text-sm font-semibold tracking-wide"><span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">S</span>STUDYTRACK <span className="text-primary">AI</span></div>
        <div className="absolute bottom-14 left-12 max-w-lg"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">a better kind of study habit</p><h1 className="display-font text-6xl uppercase leading-[.98]">Build a rhythm<br />that <span className="text-primary">sticks.</span></h1><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">A little more focus today. A lot more progress over time.</p></div>
      </section>
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-[410px]">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" /> Back to home</Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your next chapter</p>
          <h2 className="display-font text-4xl uppercase">Start with a plan.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Create an account to make your study time count.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label htmlFor="full-name" className="block space-y-2 text-sm font-medium">Your name<span className="relative block"><UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="full-name" required autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="How should we address you?" className="h-11 pl-10" /></span></label>
            <label htmlFor="email" className="block space-y-2 text-sm font-medium">Email address<span className="relative block"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" className="h-11 pl-10" /></span></label>
            <label htmlFor="password" className="block space-y-2 text-sm font-medium">Password<span className="relative block"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="h-11 pl-10 pr-11" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></span></label>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy} className="h-11 w-full">{busy ? "Creating your account…" : "Create account"}<ArrowRight className="size-4" /></Button>
          </form>
          <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
}