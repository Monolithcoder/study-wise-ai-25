import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, Clock3, Play, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStudyDashboard, saveStudySession } from "@/lib/studytrack.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your study dashboard — StudyTrack AI" },
      { name: "description", content: "Review your study activity, subjects, and daily focus target." },
      { property: "og:title", content: "Your study dashboard — StudyTrack AI" },
      { property: "og:description", content: "See your study progress and plan your next focused session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const loadDashboard = useServerFn(getStudyDashboard);
  const [dashboard, setDashboard] = useState<Awaited<ReturnType<typeof getStudyDashboard>> | null>(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let mounted = true;
    void loadDashboard().then((data) => { if (mounted) setDashboard(data); }).catch(() => {
      if (mounted) setError("Your study data couldn't be loaded. Refresh to try again.");
    });
    return () => { mounted = false; };
  }, [loadDashboard, refresh]);

  if (error) return <main className="mx-auto max-w-6xl px-6 py-16"><p role="alert" className="text-sm text-destructive">{error}</p><Button className="mt-4" onClick={() => { setError(""); setRefresh((value) => value + 1); }}>Try again</Button></main>;
  if (!dashboard) return <main className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted-foreground">Loading your study space…</main>;

  const today = new Date().toLocaleDateString();
  const minutesToday = dashboard.sessions.filter((session) => new Date(session.start_time).toLocaleDateString() === today).reduce((total, session) => total + (session.duration_minutes ?? 0), 0);
  const target = dashboard.profile?.daily_study_target_minutes ?? 120;
  const progress = Math.min(100, Math.round((minutesToday / Math.max(target, 1)) * 100));
  const name = dashboard.profile?.full_name?.trim().split(/\s+/)[0] || "there";

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide"><span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">S</span>STUDYTRACK <span className="-ml-2 text-primary">AI</span></Link>
          <span className="hidden text-sm text-muted-foreground sm:block">Your study space</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Today</p><h1 className="display-font mt-2 text-5xl uppercase">Good to see you, {name}.</h1><p className="mt-3 text-sm text-muted-foreground">A focused hour adds up. Let’s make today count.</p></div>
          <Button asChild><Link to="/onboarding">Update your plan <ArrowRight className="size-4" /></Link></Button>
        </section>

        {!dashboard.profile?.onboarding_completed && <section className="mt-8 flex flex-wrap items-center justify-between gap-4 border-l-2 border-primary bg-card px-5 py-4"><div><h2 className="font-semibold">Finish setting up your study profile</h2><p className="mt-1 text-sm text-muted-foreground">Add your subjects and choose a daily target to personalize this page.</p></div><Button asChild variant="outline"><Link to="/onboarding">Set up profile</Link></Button></section>}

        <section className="mt-8 grid gap-8 md:grid-cols-[1.1fr_.9fr]">
          <div className="border-t border-border pt-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><Target className="size-4 text-primary" /> Daily focus target</h2>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div><p className="display-font text-5xl uppercase">{Math.floor(minutesToday / 60)}h {minutesToday % 60}m</p><p className="mt-2 text-sm text-muted-foreground">of {Math.floor(target / 60)}h {target % 60}m planned today</p></div>
              <span className="text-2xl font-semibold text-primary">{progress}%</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress}%` }} /></div>
            <div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => document.getElementById("session-topic")?.focus()}><Play className="size-4" /> Start a study session</Button><Button variant="outline" asChild><Link to="/onboarding">Edit daily target</Link></Button></div>
          </div>
          <div className="border-t border-border pt-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><BookOpen className="size-4 text-primary" /> Your subjects</h2>
            {dashboard.subjects.length ? <ul className="mt-4 divide-y divide-border">{dashboard.subjects.slice(0, 5).map((subject) => <li key={subject.id} className="flex items-center justify-between py-3"><span className="font-medium">{subject.name}</span><span className="text-xs capitalize text-muted-foreground">{subject.priority} priority</span></li>)}</ul> : <div className="mt-4"><p className="text-sm text-muted-foreground">Your subject list is ready when you are.</p><Button asChild variant="link" className="mt-2 h-auto px-0"><Link to="/onboarding">Add subjects <ArrowRight className="size-4" /></Link></Button></div>}
          </div>
        </section>

        <section className="mt-10 border-t border-border pt-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold"><Clock3 className="size-4 text-primary" /> Recent study sessions</h2>
          {dashboard.sessions.length ? <ul className="mt-4 divide-y divide-border">{dashboard.sessions.slice(0, 6).map((session) => {
            const subject = dashboard.subjects.find((item) => item.id === session.subject_id)?.name ?? "Study session";
            return <li key={session.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-medium">{session.topic || subject}</p><p className="mt-1 text-xs text-muted-foreground">{subject} · {new Date(session.start_time).toLocaleDateString()}</p></div><span className="text-sm text-muted-foreground">{session.duration_minutes} min</span></li>;
          })}</ul> : <p className="mt-4 text-sm text-muted-foreground">Your first session will show up here. Start a study session when you’re ready.</p>}
          <SessionForm subjects={dashboard.subjects} onSaved={() => setRefresh((value) => value + 1)} />
        </section>
      </div>
    </main>
  );
}

function SessionForm({ subjects, onSaved }: { subjects: Awaited<ReturnType<typeof getStudyDashboard>>["subjects"]; onSaved: () => void }) {
  const saveSession = useServerFn(saveStudySession);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("25");
  const [subjectId, setSubjectId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveSession({ data: { subjectId: subjectId || null, topic, goal, startTime: new Date().toISOString(), durationMinutes: Number(duration) } });
      setTopic("");
      setGoal("");
      setOpen(false);
      onSaved();
    } catch {
      setError("We couldn't save that session. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="mt-6">
    {!open ? <Button variant="outline" onClick={() => setOpen(true)}><Play className="size-4" /> Log a session</Button> : <form onSubmit={submit} className="max-w-xl space-y-4 border-t border-border pt-5">
      <h3 className="font-semibold">Log a focused session</h3>
      <label className="block space-y-2 text-sm font-medium">Topic<Input id="session-topic" value={topic} onChange={(event) => setTopic(event.target.value)} required maxLength={160} placeholder="What are you studying?" /></label>
      <label className="block space-y-2 text-sm font-medium">Subject<select value={subjectId} onChange={(event) => setSubjectId(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="">Choose a subject (optional)</option>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</select></label>
      <label className="block space-y-2 text-sm font-medium">Session length<select value={duration} onChange={(event) => setDuration(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="15">15 minutes</option><option value="25">25 minutes</option><option value="45">45 minutes</option><option value="60">1 hour</option><option value="90">90 minutes</option></select></label>
      <label className="block space-y-2 text-sm font-medium">Session goal <Input value={goal} onChange={(event) => setGoal(event.target.value)} maxLength={240} placeholder="Optional" /></label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2"><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save session"}</Button><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button></div>
    </form>}
  </div>;
}