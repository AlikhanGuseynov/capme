import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          date: string;
          qr_code_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          date: string;
          qr_code_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          date?: string;
          qr_code_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      uploads: {
        Row: {
          id: string;
          event_id: string;
          file_url: string;
          file_type: string;
          faces_detected: string[];
          uploader_name: string | null;
          uploader_email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          file_url: string;
          file_type: string;
          faces_detected?: string[];
          uploader_name?: string | null;
          uploader_email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          file_url?: string;
          file_type?: string;
          faces_detected?: string[];
          uploader_name?: string | null;
          uploader_email?: string | null;
          created_at?: string;
        };
      };
      faces: {
        Row: {
          id: string;
          face_id: string;
          vector: number[];
          media_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          face_id: string;
          vector: number[];
          media_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          face_id?: string;
          vector?: number[];
          media_id?: string;
          created_at?: string;
        };
      };
      claims: {
        Row: {
          id: string;
          event_id: string;
          selfie_url: string;
          matched_media_ids: string[];
          payment_status: string;
          download_url: string | null;
          user_email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          selfie_url: string;
          matched_media_ids?: string[];
          payment_status?: string;
          download_url?: string | null;
          user_email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          selfie_url?: string;
          matched_media_ids?: string[];
          payment_status?: string;
          download_url?: string | null;
          user_email?: string | null;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          claim_id: string;
          amount: number;
          stripe_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          claim_id: string;
          amount: number;
          stripe_id: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          claim_id?: string;
          amount?: number;
          stripe_id?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
};