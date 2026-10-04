import { useState } from "react";
import { Chrome } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";

export function GoogleSignInButton() {
  const [busy, setBusy] = useState(false);

  async function continueWithGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth/callback`,
      });
      if (result.error) toast.error("Google sign-in couldn't start. Please try again.");
    } catch {
      toast.error("Google sign-in couldn't start. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button type="button" variant="outline" className="h-11 w-full" disabled={busy} onClick={continueWithGoogle}>
      <Chrome className="size-4" />
      {busy ? "Connecting…" : "Continue with Google"}
    </Button>
  );
}