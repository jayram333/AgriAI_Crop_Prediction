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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      crops: {
        Row: {
          area: number | null
          created_at: string
          crop_type: string
          crop_variety: string | null
          expected_harvest_date: string | null
          farm_id: string
          id: string
          planting_date: string | null
          updated_at: string
        }
        Insert: {
          area?: number | null
          created_at?: string
          crop_type: string
          crop_variety?: string | null
          expected_harvest_date?: string | null
          farm_id: string
          id?: string
          planting_date?: string | null
          updated_at?: string
        }
        Update: {
          area?: number | null
          created_at?: string
          crop_type?: string
          crop_variety?: string | null
          expected_harvest_date?: string | null
          farm_id?: string
          id?: string
          planting_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crops_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string
          farm_name: string
          id: string
          irrigation_method: string | null
          location: string | null
          total_area: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_name: string
          id?: string
          irrigation_method?: string | null
          location?: string | null
          total_area?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          farm_name?: string
          id?: string
          irrigation_method?: string | null
          location?: string | null
          total_area?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          farm_location: string | null
          full_name: string | null
          id: string
          phone: string | null
          preferred_language: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_location?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          farm_location?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          description: string | null
          farm_id: string
          id: string
          priority: string | null
          recommendation_type: string
          recommended_date: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          farm_id: string
          id?: string
          priority?: string | null
          recommendation_type: string
          recommended_date?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          farm_id?: string
          id?: string
          priority?: string | null
          recommendation_type?: string
          recommended_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      soil_data: {
        Row: {
          created_at: string
          farm_id: string
          id: string
          moisture_percentage: number | null
          nitrogen_level: number | null
          organic_matter: number | null
          ph_level: number | null
          phosphorus_level: number | null
          potassium_level: number | null
          recorded_at: string
          soil_texture: string | null
        }
        Insert: {
          created_at?: string
          farm_id: string
          id?: string
          moisture_percentage?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recorded_at?: string
          soil_texture?: string | null
        }
        Update: {
          created_at?: string
          farm_id?: string
          id?: string
          moisture_percentage?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recorded_at?: string
          soil_texture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soil_data_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      weather_data: {
        Row: {
          created_at: string
          humidity: number | null
          id: string
          location: string
          rainfall: number | null
          recorded_at: string
          sunlight_hours: number | null
          temperature: number | null
          wind_speed: number | null
        }
        Insert: {
          created_at?: string
          humidity?: number | null
          id?: string
          location: string
          rainfall?: number | null
          recorded_at?: string
          sunlight_hours?: number | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Update: {
          created_at?: string
          humidity?: number | null
          id?: string
          location?: string
          rainfall?: number | null
          recorded_at?: string
          sunlight_hours?: number | null
          temperature?: number | null
          wind_speed?: number | null
        }
        Relationships: []
      }
      yield_predictions: {
        Row: {
          confidence_score: number | null
          created_at: string
          crop_id: string
          id: string
          input_parameters: Json | null
          model_version: string | null
          predicted_yield: number | null
          prediction_date: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          crop_id: string
          id?: string
          input_parameters?: Json | null
          model_version?: string | null
          predicted_yield?: number | null
          prediction_date: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          crop_id?: string
          id?: string
          input_parameters?: Json | null
          model_version?: string | null
          predicted_yield?: number | null
          prediction_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "yield_predictions_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
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
