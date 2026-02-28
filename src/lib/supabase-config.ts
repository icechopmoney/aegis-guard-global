// Supabase Configuration
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
}

// Validate that we have the required credentials
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  console.warn('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.')
}

// For development - show if credentials are loaded
if (import.meta.env.DEV) {
  console.log('Supabase URL configured:', !!supabaseConfig.url)
  console.log('Supabase Anon Key configured:', !!supabaseConfig.anonKey)
}
