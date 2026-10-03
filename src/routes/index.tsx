import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import studySpace from "@/assets/studytrack-study-space.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyTrack AI — Understand your time. Study smarter." },
      { name: "description", content: "A calmer way to track study sessions, build focus, and make steady progress toward your goals." },
      { property: "og:title", content: "StudyTrack AI — Understand your time. Study smarter." },
      { property: "og:description", content: "Build focus and make steady progress toward your study goals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">S</span>
          STUDYTRACK <span className="-ml-2 text-primary">AI</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/login" className="px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">Sign in</Link>
          <Button asChild size="sm"><Link to="/register">Get started <ArrowRight className="size-4" /></Link></Button>
        </nav>
      </header>

      <section className="relative isolate min-h-[76vh] overflow-hidden border-y border-border">
        <img src={studySpace} alt="A student settling into a focused study session" width={1536} height={1024} className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="study-grid absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto flex min-h-[76vh] w-full max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="max-w-2xl rise-in">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> A better rhythm starts here</p>
            <h1 className="display-font text-6xl uppercase leading-[.98] sm:text-7xl">Understand your time.<br /><span className="text-primary">Study smarter.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">Turn study hours into visible progress. Track your sessions, protect your focus, and build habits that last.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/register">Create your study plan <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/login">I already have an account</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:grid-cols-3 lg:px-10">
        <article className="flex gap-4 border-t border-border pt-5"><Clock3 className="mt-1 size-5 shrink-0 text-primary" /><div><h2 className="font-semibold">See where time goes</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Keep a clear record of study sessions by subject and topic.</p></div></article>
        <article className="flex gap-4 border-t border-border pt-5"><Target className="mt-1 size-5 shrink-0 text-primary" /><div><h2 className="font-semibold">Make goals achievable</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Set a daily target that fits your routine and track your progress.</p></div></article>
        <article className="flex gap-4 border-t border-border pt-5"><TrendingUp className="mt-1 size-5 shrink-0 text-primary" /><div><h2 className="font-semibold">Build steady momentum</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use your own study history to spot patterns and keep improving.</p></div></article>
      </section>
    </main>
  );
}
