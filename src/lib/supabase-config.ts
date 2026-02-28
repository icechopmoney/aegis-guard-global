// Supabase Configuration
// Replace these values with your actual Supabase project credentials
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-full-anon-key-here'
}
