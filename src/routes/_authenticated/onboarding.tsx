import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerFn } from "@tanstack/react-start";
import { saveStudyProfile } from "@/lib/studytrack.functions";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your study profile — StudyTrack AI" },
      { name: "description", content: "Set your study target, routine, and subjects in StudyTrack AI." },
      { property: "og:title", content: "Set up your study profile — StudyTrack AI" },
      { property: "og:description", content: "Personalize your study routine and choose the subjects you want to track." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const saveProfile = useServerFn(saveStudyProfile);
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [target, setTarget] = useState("120");
  const [studyTime, setStudyTime] = useState("evening");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function addSubject() {
    const next = subjectInput.trim();
    if (!next || subjects.some((subject) => subject.toLowerCase() === next.toLowerCase()) || subjects.length >= 12) return;
    setSubjects((current) => [...current, next]);
    setSubjectInput("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await saveProfile({ data: {
        fullName, college, course, branch, semester,
        dailyTargetMinutes: Number(target),
        preferredStudyTime: studyTime as "morning" | "afternoon" | "evening" | "night",
        subjects,
      } });
      toast.success("Your study profile is ready.");
      await navigate({ to: "/dashboard" });
    } catch {
      setError("We couldn't save your profile. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your starting point</p>
        <h1 className="display-font text-5xl uppercase sm:text-6xl">Make it yours.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A few details help shape a study routine that feels realistic for you.</p>
        <form onSubmit={submit} className="mt-9 space-y-8">
          <section className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
            <Field label="Your name"><Input value={fullName} onChange={(event) => setFullName(event.target.value)} required autoComplete="name" placeholder="Full name" /></Field>
            <Field label="College or university"><Input value={college} onChange={(event) => setCollege(event.target.value)} placeholder="School name" /></Field>
            <Field label="Course"><Input value={course} onChange={(event) => setCourse(event.target.value)} placeholder="e.g. Computer Science" /></Field>
            <Field label="Branch or major"><Input value={branch} onChange={(event) => setBranch(event.target.value)} placeholder="Optional" /></Field>
            <Field label="Semester"><Input value={semester} onChange={(event) => setSemester(event.target.value)} placeholder="e.g. Semester 2" /></Field>
            <Field label="Daily study target">
              <select value={target} onChange={(event) => setTarget(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
                <option value="60">1 hour</option><option value="120">2 hours</option><option value="180">3 hours</option><option value="240">4 hours</option><option value="360">6 hours</option>
              </select>
            </Field>
            <Field label="When do you prefer to study?">
              <select value={studyTime} onChange={(event) => setStudyTime(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
                <option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="night">Night</option>
              </select>
            </Field>
          </section>
          <section className="border-t border-border pt-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><BookOpen className="size-4 text-primary" /> Subjects to track</h2>
            <div className="mt-4 flex gap-2">
              <Input value={subjectInput} onChange={(event) => setSubjectInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSubject(); } }} placeholder="Add a subject" aria-label="Add a subject" />
              <Button type="button" variant="outline" onClick={addSubject}>Add</Button>
            </div>
            {subjects.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{subjects.map((subject) => <li key={subject} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">{subject}<Button type="button" variant="ghost" size="icon" aria-label={`Remove ${subject}`} onClick={() => setSubjects((current) => current.filter((item) => item !== subject))}><X className="size-4" /></Button></li>)}</ul>}
            <p className="mt-3 text-xs text-muted-foreground">You can add up to 12 subjects.</p>
          </section>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Continue to dashboard"}<ArrowRight className="size-4" /></Button>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-medium">{label}{children}</label>;
}