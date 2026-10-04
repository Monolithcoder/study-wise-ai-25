import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [
      { title: "Completing sign-in — StudyTrack AI" },
      { name: "description", content: "Finishing your secure sign-in to StudyTrack AI." },
      { property: "og:title", content: "Completing sign-in — StudyTrack AI" },
      { property: "og:description", content: "Finishing your secure sign-in to StudyTrack AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError || !data.session) {
        setError("We couldn't confirm your sign-in. Please try again.");
        return;
      }
      void navigate({ to: "/dashboard", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <section className="w-full max-w-md border-t border-border pt-6 text-center">
        <p className="text-xs font-semibold uppercase text-primary">StudyTrack AI</p>
        <h1 className="display-font mt-3 text-4xl uppercase">{error ? "Sign-in paused." : "One moment."}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error || "We're securely finishing your sign-in."}</p>
        {error && <Button asChild className="mt-6"><Link to="/login">Back to sign in</Link></Button>}
      </section>
    </main>
  );
}