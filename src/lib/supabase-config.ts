// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wytrwqvamirkquqntzhz.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dHJ3cXZhbWlya3F1cW50emh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzM2MjEsImV4cCI6MjA4Nzg0OTYyMX0.Gr8K5VT_9q32aR9ij4lZ9UVYpVBMtGFBMyJqxfc9LmQ'

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey
}

// Validate that we have the fallback values (not empty strings)
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn('Using fallback Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.')
}

// For development - show if credentials are loaded
if (import.meta.env.DEV) {
  console.log('Supabase URL configured:', !!supabaseConfig.url)
  console.log('Supabase Anon Key configured:', !!supabaseConfig.anonKey)
}
