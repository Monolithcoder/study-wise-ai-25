export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_type: string
          description: string | null
          earned_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          achievement_type: string
          description?: string | null
          earned_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          achievement_type?: string
          description?: string | null
          earned_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          application_name: string
          category: string
          created_at: string
          duration_minutes: number
          end_time: string | null
          id: string
          is_productive: boolean
          source: string
          start_time: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          application_name: string
          category?: string
          created_at?: string
          duration_minutes?: number
          end_time?: string | null
          id?: string
          is_productive?: boolean
          source?: string
          start_time: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          application_name?: string
          category?: string
          created_at?: string
          duration_minutes?: number
          end_time?: string | null
          id?: string
          is_productive?: boolean
          source?: string
          start_time?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      exams: {
        Row: {
          created_at: string
          exam_date: string
          id: string
          status: string
          subject_id: string | null
          title: string
          topics: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exam_date: string
          id?: string
          status?: string
          subject_id?: string | null
          title: string
          topics?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          exam_date?: string
          id?: string
          status?: string
          subject_id?: string | null
          title?: string
          topics?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          current_value: number
          deadline: string | null
          goal_type: string
          id: string
          status: string
          subject_id: string | null
          target_value: number
          title: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number
          deadline?: string | null
          goal_type?: string
          id?: string
          status?: string
          subject_id?: string | null
          target_value?: number
          title: string
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_value?: number
          deadline?: string | null
          goal_type?: string
          id?: string
          status?: string
          subject_id?: string | null
          target_value?: number
          title?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          notification_type: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          notification_type?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          notification_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          branch: string | null
          college: string | null
          course: string | null
          created_at: string
          daily_study_target_minutes: number
          education_level: string | null
          free_time_hours: number
          full_name: string
          id: string
          onboarding_completed: boolean
          preferred_study_time: string
          semester: string | null
          sleep_hours: number
          updated_at: string
          user_id: string
        }
        Insert: {
          branch?: string | null
          college?: string | null
          course?: string | null
          created_at?: string
          daily_study_target_minutes?: number
          education_level?: string | null
          free_time_hours?: number
          full_name?: string
          id?: string
          onboarding_completed?: boolean
          preferred_study_time?: string
          semester?: string | null
          sleep_hours?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          branch?: string | null
          college?: string | null
          course?: string | null
          created_at?: string
          daily_study_target_minutes?: number
          education_level?: string | null
          free_time_hours?: number
          full_name?: string
          id?: string
          onboarding_completed?: boolean
          preferred_study_time?: string
          semester?: string | null
          sleep_hours?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      schedule_items: {
        Row: {
          created_at: string
          end_time: string
          id: string
          item_type: string
          notes: string | null
          start_time: string
          status: string
          subject_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          item_type?: string
          notes?: string | null
          start_time: string
          status?: string
          subject_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          item_type?: string
          notes?: string | null
          start_time?: string
          status?: string
          subject_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_items_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          created_at: string
          distraction_count: number
          duration_minutes: number
          end_time: string | null
          focus_score: number | null
          goal: string | null
          goal_completed: boolean
          id: string
          notes: string | null
          start_time: string
          status: string
          subject_id: string | null
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          distraction_count?: number
          duration_minutes?: number
          end_time?: string | null
          focus_score?: number | null
          goal?: string | null
          goal_completed?: boolean
          id?: string
          notes?: string | null
          start_time: string
          status?: string
          subject_id?: string | null
          topic?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          distraction_count?: number
          duration_minutes?: number
          end_time?: string | null
          focus_score?: number | null
          goal?: string | null
          goal_completed?: boolean
          id?: string
          notes?: string | null
          start_time?: string
          status?: string
          subject_id?: string | null
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          color: string
          created_at: string
          description: string | null
          difficulty: string
          icon: string
          id: string
          monthly_target_minutes: number
          name: string
          priority: string
          updated_at: string
          user_id: string
          weekly_target_minutes: number
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          icon?: string
          id?: string
          monthly_target_minutes?: number
          name: string
          priority?: string
          updated_at?: string
          user_id: string
          weekly_target_minutes?: number
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          icon?: string
          id?: string
          monthly_target_minutes?: number
          name?: string
          priority?: string
          updated_at?: string
          user_id?: string
          weekly_target_minutes?: number
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          activity_tracking_enabled: boolean
          ai_recommendations_enabled: boolean
          analytics_enabled: boolean
          application_tracking_enabled: boolean
          created_at: string
          exam_alerts_enabled: boolean
          id: string
          notifications_enabled: boolean
          study_reminders_enabled: boolean
          theme: string
          updated_at: string
          user_id: string
          weekly_reports_enabled: boolean
        }
        Insert: {
          activity_tracking_enabled?: boolean
          ai_recommendations_enabled?: boolean
          analytics_enabled?: boolean
          application_tracking_enabled?: boolean
          created_at?: string
          exam_alerts_enabled?: boolean
          id?: string
          notifications_enabled?: boolean
          study_reminders_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id: string
          weekly_reports_enabled?: boolean
        }
        Update: {
          activity_tracking_enabled?: boolean
          ai_recommendations_enabled?: boolean
          analytics_enabled?: boolean
          application_tracking_enabled?: boolean
          created_at?: string
          exam_alerts_enabled?: boolean
          id?: string
          notifications_enabled?: boolean
          study_reminders_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
          weekly_reports_enabled?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
