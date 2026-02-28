import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './supabase-config'

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)

// Database types
export interface VaultCertificate {
  id: string
  tracking_reference: string
  vault_code: string
  assigned_custodian: string
  transaction_code: string
  security_code: string
  depositor_name: string
  depositor_nationality: string
  next_of_kin: string
  next_of_kin_nationality: string
  date_of_deposit: string
  purpose_of_deposit: string
  security_charges: string
  consignment_package: string
  consignment_content: string
  status: 'active' | 'inactive' | 'archived'
  created_at: string
  updated_at: string
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
