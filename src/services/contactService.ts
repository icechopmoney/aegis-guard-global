import { supabase, ContactSubmission } from '../lib/supabase'

export class ContactService {
  // Submit contact form
  static async submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactSubmission | null> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([formData])
        .select()
        .single()

      if (error) {
        console.error('Error submitting contact form:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error:', error)
      return null
    }
  }

  // Get all contact submissions (admin only)
  static async getAllSubmissions(): Promise<ContactSubmission[]> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contact submissions:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Unexpected error:', error)
      return []
    }
  }

  // Update submission status (admin only)
  static async updateSubmissionStatus(id: string, status: 'pending' | 'reviewed' | 'responded'): Promise<ContactSubmission | null> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating submission status:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error:', error)
      return null
    }
  }

  // Delete submission (admin only)
  static async deleteSubmission(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting submission:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Unexpected error:', error)
      return false
    }
  }

  // Get submission statistics (admin only)
  static async getSubmissionStats(): Promise<{
    total: number
    pending: number
    reviewed: number
    responded: number
  }> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('status')

      if (error) {
        console.error('Error fetching submission stats:', error)
        return { total: 0, pending: 0, reviewed: 0, responded: 0 }
      }

      const submissions = data || []
      return {
        total: submissions.length,
        pending: submissions.filter(s => s.status === 'pending').length,
        reviewed: submissions.filter(s => s.status === 'reviewed').length,
        responded: submissions.filter(s => s.status === 'responded').length
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      return { total: 0, pending: 0, reviewed: 0, responded: 0 }
    }
  }
}
