export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          stripe_customer_id: string | null
          subscription_tier: 'free' | 'pro' | 'enterprise'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          created_at?: string
        }
      }
      brand_kits: {
        Row: {
          id: string
          author_id: string
          name: string
          font_body: string
          font_display: string
          color_primary: string
          color_secondary: string
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          name: string
          font_body?: string
          font_display?: string
          color_primary?: string
          color_secondary?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          name?: string
          font_body?: string
          font_display?: string
          color_primary?: string
          color_secondary?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      curricula: {
        Row: {
          id: string
          author_id: string
          brand_kit_id: string | null
          title: string
          description: string | null
          target_audience: string | null
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          brand_kit_id?: string | null
          title: string
          description?: string | null
          target_audience?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          brand_kit_id?: string | null
          title?: string
          description?: string | null
          target_audience?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          curriculum_id: string
          title: string
          content: string | null
          order_index: number
          estimated_duration_mins: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          curriculum_id: string
          title: string
          content?: string | null
          order_index?: number
          estimated_duration_mins?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          curriculum_id?: string
          title?: string
          content?: string | null
          order_index?: number
          estimated_duration_mins?: number
          created_at?: string
          updated_at?: string
        }
      }
      video_assets: {
        Row: {
          id: string
          module_id: string
          status: 'queued' | 'rendering' | 'completed' | 'failed'
          mp4_url: string | null
          duration_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          status?: 'queued' | 'rendering' | 'completed' | 'failed'
          mp4_url?: string | null
          duration_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          status?: 'queued' | 'rendering' | 'completed' | 'failed'
          mp4_url?: string | null
          duration_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
