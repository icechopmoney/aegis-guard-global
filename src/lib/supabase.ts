import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './supabase-config'

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)

// Database types
export interface VaultCertificate {
  id: string
  user_id: string
  tracking_reference: string
  vault_code: string
  ownership: string
  assigned_custodian: string
  transaction_code: string
  security_code: string
  depositor_name: string
  depositor_nationality: string
  date_of_deposit: string
  purpose_of_deposit: string
  vault_charges: string
  consignment_package: string
  consignment_content: string
  status: 'active' | 'inactive' | 'archived'
  created_at: string
  updated_at: string
}

export interface AssetOtp {
  id: string
  user_id: string
  code: string
  expires_at: string
  used_at: string | null
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'pending' | 'reviewed' | 'responded'
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  full_name: string
  email: string
  phone_number: string
  preferred_date: string
  preferred_time: string
  service_type: 'Vault Storage' | 'Asset Deposit' | 'Consultation' | 'Private Security' | 'Other'
  message: string | null
  created_at: string
}
