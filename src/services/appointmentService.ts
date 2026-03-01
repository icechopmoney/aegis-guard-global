import { supabase, Appointment } from "@/lib/supabase";

export class AppointmentService {
  static async createAppointment(payload: {
    full_name: string;
    email: string;
    phone_number: string;
    preferred_date: string;
    preferred_time: string;
    service_type: Appointment["service_type"];
    message?: string;
  }): Promise<Appointment | null> {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert({
          full_name: payload.full_name,
          email: payload.email,
          phone_number: payload.phone_number,
          preferred_date: payload.preferred_date,
          preferred_time: payload.preferred_time,
          service_type: payload.service_type,
          message: payload.message ?? null,
        })
        .select()
        .single<Appointment>();

      if (error) {
        console.error("Error creating appointment:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Unexpected error creating appointment:", error);
      return null;
    }
  }
}

