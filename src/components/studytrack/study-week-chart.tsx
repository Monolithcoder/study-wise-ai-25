import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type StudySession = { start_time: string; duration_minutes: number | null };

export function StudyWeekChart({ sessions }: { sessions: StudySession[] }) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));
    const totalMinutes = sessions
      .filter((session) => {
        const sessionDate = new Date(session.start_time);
        return sessionDate.getFullYear() === date.getFullYear() && sessionDate.getMonth() === date.getMonth() && sessionDate.getDate() === date.getDate();
      })
      .reduce((sum, session) => sum + (session.duration_minutes ?? 0), 0);
    return { day: date.toLocaleDateString(undefined, { weekday: "short" }), minutes: totalMinutes };
  });

  return (
    <div className="mt-5 h-56 w-full" role="img" aria-label="Study minutes logged each day over the last seven days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={days} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} allowDecimals={false} />
          <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={{ backgroundColor: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: "4px", color: "var(--color-popover-foreground)" }} formatter={(value) => [`${value} min`, "Study time"]} />
          <Bar dataKey="minutes" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}