import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, Shield, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AppointmentService } from "@/services/appointmentService";

const serviceTypes = [
  "Vault Storage",
  "Asset Deposit",
  "Consultation",
  "Private Security",
  "Other",
] as const;

const Appointment = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    preferred_date: "",
    preferred_time: "",
    service_type: "Vault Storage" as (typeof serviceTypes)[number],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name.trim() || !form.email.trim() || !form.phone_number.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!form.preferred_date || !form.preferred_time) {
      toast({
        title: "Select Date & Time",
        description: "Please choose your preferred appointment date and time.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await AppointmentService.createAppointment({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone_number: form.phone_number.trim(),
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        service_type: form.service_type,
        message: form.message.trim() || undefined,
      });

      if (!result) {
        toast({
          title: "Unable to Book",
          description: "We could not save your appointment. Please try again shortly.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      toast({
        title: "Appointment Request Received",
        description: "Our team will contact you to confirm your booking.",
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-card border border-border rounded-lg p-8 md:p-10 shadow-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-md border border-primary/40 bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Private Appointment
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Book an Appointment
              </h1>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      placeholder="+32 123 456 789"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Type of Service
                  </label>
                  <select
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      name="preferred_time"
                      value={form.preferred_time}
                      onChange={handleChange}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Message / Additional Notes
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="pl-9"
                    rows={4}
                    placeholder="Share any details that will help our team prepare for your appointment."
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-gold text-primary-foreground font-semibold uppercase tracking-wider hover:opacity-90"
              >
                {submitting ? "Submitting..." : "Submit Appointment Request"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30 mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Appointment Request Received
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Thank you for contacting Prime Vault Services. Our team will review your request and reach out to
                you confidentially to confirm the exact time and details of your appointment.
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
};

export default Appointment;

