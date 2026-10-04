import { useEffect, useState, type FormEvent } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveStudySession } from "@/lib/studytrack.functions";

type SubjectOption = { id: string; name: string };

export function FocusTimer({ subjects, onSaved }: { subjects: SubjectOption[]; onSaved: () => void }) {
  const saveSession = useServerFn(saveStudySession);
  const [topic, setTopic] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!running || startedAt === null) return;
    const interval = window.setInterval(() => {
      const nextElapsed = elapsedSeconds + Math.floor((Date.now() - startedAt) / 1000);
      if (nextElapsed >= targetMinutes * 60) {
        setElapsedSeconds(targetMinutes * 60);
        setStartedAt(null);
        setRunning(false);
      } else {
        setElapsedSeconds(nextElapsed);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [elapsedSeconds, running, startedAt, targetMinutes]);

  const completedSeconds = Math.min(targetMinutes * 60, elapsedSeconds + (running && startedAt !== null ? Math.floor((Date.now() - startedAt) / 1000) : 0));
  const remainingSeconds = Math.max(0, targetMinutes * 60 - completedSeconds);
  const minutesDisplay = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
  const secondsDisplay = (remainingSeconds % 60).toString().padStart(2, "0");

  function start() {
    if (elapsedSeconds === 0) setSessionStartedAt(new Date().toISOString());
    setStartedAt(Date.now());
    setRunning(true);
  }

  function pause() {
    if (startedAt !== null) setElapsedSeconds((current) => Math.min(targetMinutes * 60, current + Math.floor((Date.now() - startedAt) / 1000)));
    setStartedAt(null);
    setRunning(false);
  }

  function reset() {
    setElapsedSeconds(0);
    setStartedAt(null);
    setSessionStartedAt(null);
    setRunning(false);
    setError("");
  }

  async function finish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const finalSeconds = Math.min(targetMinutes * 60, elapsedSeconds + (running && startedAt !== null ? Math.floor((Date.now() - startedAt) / 1000) : 0));
    try {
      await saveSession({ data: {
        subjectId: subjectId || null,
        topic,
        goal: "Focused study session",
        startTime: sessionStartedAt ?? new Date().toISOString(),
        durationMinutes: Math.max(1, Math.ceil(finalSeconds / 60)),
      } });
      reset();
      setTopic("");
      onSaved();
    } catch {
      setError("Your session couldn't be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-8 border-t border-border pt-5" aria-labelledby="focus-timer-title">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 id="focus-timer-title" className="flex items-center gap-2 text-sm font-semibold"><Play className="size-4 text-primary" /> Focus timer</h2>
          <p className="mt-2 text-sm text-muted-foreground">Keep one study session in focus.</p>
        </div>
        <p className="display-font text-5xl tabular-nums" aria-live="polite">{minutesDisplay}:{secondsDisplay}</p>
      </div>
      <form onSubmit={finish} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium" htmlFor="timer-topic">What are you studying?
          <Input id="timer-topic" value={topic} onChange={(event) => setTopic(event.target.value)} required maxLength={160} disabled={running || elapsedSeconds > 0} placeholder="Topic or chapter" />
        </label>
        <label className="block space-y-2 text-sm font-medium" htmlFor="timer-subject">Subject
          <select id="timer-subject" value={subjectId} onChange={(event) => setSubjectId(event.target.value)} disabled={running || elapsedSeconds > 0} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
            <option value="">Choose a subject (optional)</option>
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-medium" htmlFor="timer-length">Session length
          <select id="timer-length" value={targetMinutes} onChange={(event) => setTargetMinutes(Number(event.target.value))} disabled={running || elapsedSeconds > 0} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
            <option value="15">15 minutes</option><option value="25">25 minutes</option><option value="45">45 minutes</option><option value="60">1 hour</option>
          </select>
        </label>
        <div className="flex flex-wrap items-end gap-2">
          {!running ? <Button type="button" onClick={start} disabled={!topic.trim() || remainingSeconds === 0}><Play className="size-4" />{elapsedSeconds ? "Resume" : "Start"}</Button> : <Button type="button" variant="outline" onClick={pause}><Pause className="size-4" />Pause</Button>}
          <Button type="submit" variant="outline" disabled={saving || completedSeconds === 0}>{saving ? "Saving…" : "Finish session"}</Button>
          {elapsedSeconds > 0 && !running && <Button type="button" variant="ghost" size="icon" aria-label="Reset timer" title="Reset timer" onClick={reset}><RotateCcw className="size-4" /></Button>}
        </div>
      </form>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      {remainingSeconds === 0 && <p className="mt-3 text-sm text-primary" role="status">Timer complete. Finish the session to save your study time.</p>}
    </section>
  );
}