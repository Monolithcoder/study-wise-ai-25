import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getStudyDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const userId = context.userId;
    const [profileResult, subjectsResult, sessionsResult, goalsResult, scheduleResult] =
      await Promise.all([
        context.supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
        context.supabase.from("subjects").select("*").eq("user_id", userId).order("created_at"),
        context.supabase
          .from("study_sessions")
          .select("*")
          .eq("user_id", userId)
          .order("start_time", { ascending: false })
          .limit(30),
        context.supabase.from("goals").select("*").eq("user_id", userId).eq("status", "active").limit(5),
        context.supabase
          .from("schedule_items")
          .select("*")
          .eq("user_id", userId)
          .gte("start_time", new Date().toISOString().slice(0, 10))
          .order("start_time")
          .limit(5),
      ]);

    const failure = [profileResult, subjectsResult, sessionsResult, goalsResult, scheduleResult].find(
      (result) => result.error,
    );
    if (failure?.error) throw new Error("Your study data could not be loaded. Please try again.");

    return {
      profile: profileResult.data,
      subjects: subjectsResult.data ?? [],
      sessions: sessionsResult.data ?? [],
      goals: goalsResult.data ?? [],
      schedule: scheduleResult.data ?? [],
    };
  });

const onboardingSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  college: z.string().trim().max(120),
  course: z.string().trim().max(100),
  branch: z.string().trim().max(100),
  semester: z.string().trim().max(40),
  dailyTargetMinutes: z.number().int().min(30).max(1440),
  preferredStudyTime: z.enum(["morning", "afternoon", "evening", "night"]),
  subjects: z.array(z.string().trim().min(1).max(80)).max(12),
});

export const saveStudyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => onboardingSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("profiles").upsert(
      {
        user_id: context.userId,
        full_name: data.fullName,
        college: data.college || null,
        course: data.course || null,
        branch: data.branch || null,
        semester: data.semester || null,
        daily_study_target_minutes: data.dailyTargetMinutes,
        preferred_study_time: data.preferredStudyTime,
        onboarding_completed: true,
      },
      { onConflict: "user_id" },
    );
    if (error) throw new Error("Your profile could not be saved. Please try again.");

    const { data: existingSubjects, error: subjectReadError } = await context.supabase
      .from("subjects")
      .select("name")
      .eq("user_id", context.userId);
    if (subjectReadError) throw new Error("Your subjects could not be loaded.");

    const existingNames = new Set((existingSubjects ?? []).map((subject) => subject.name.toLowerCase()));
    const newSubjects = data.subjects
      .map((name) => name.trim())
      .filter((name, index, names) => name && names.indexOf(name) === index && !existingNames.has(name.toLowerCase()));
    if (newSubjects.length) {
      const { error: insertError } = await context.supabase.from("subjects").insert(
        newSubjects.map((name, index) => ({
          user_id: context.userId,
          name,
          priority: index === 0 ? "high" : "medium",
          difficulty: "medium",
        })),
      );
      if (insertError) throw new Error("Your subjects could not be saved.");
    }

    return { ok: true };
  });

const studySessionSchema = z.object({
  subjectId: z.string().uuid().nullable(),
  topic: z.string().trim().min(1).max(160),
  goal: z.string().trim().max(240),
  startTime: z.string().datetime(),
  durationMinutes: z.number().int().min(1).max(1440),
});

export const saveStudySession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => studySessionSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("study_sessions").insert({
      user_id: context.userId,
      subject_id: data.subjectId,
      topic: data.topic,
      goal: data.goal || null,
      start_time: data.startTime,
      end_time: new Date(Date.parse(data.startTime) + data.durationMinutes * 60_000).toISOString(),
      duration_minutes: data.durationMinutes,
      status: "completed",
    });
    if (error) throw new Error("The study session could not be saved. Please try again.");
    return { ok: true };
  });