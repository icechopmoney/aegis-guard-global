import { motion } from "framer-motion";
import { Shield, Mail, MapPin, Building2, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ContactService } from "../services/contactService";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setSending(true);
    try {
      const submission = await ContactService.submitContactForm(form);
      if (submission) {
        setForm({ name: "", email: "", subject: "", message: "" });
        toast({ 
          title: "Message Sent Successfully", 
          description: "We'll get back to you within 24 hours." 
        });
      } else {
        toast({ 
          title: "Error", 
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ 
        title: "Error", 
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Contact Us
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Reach out to our team for inquiries about asset protection, vault storage, and secure logistics services.
          </p>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-2 mb-16">
        {/* Left: Info cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email</h3>
                <a href="mailto:info@primeVaultservices.org" className="text-primary hover:underline text-sm">
                  info@primeVaultservices.org
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Head Office</h3>
                <p className="text-muted-foreground text-sm">Noorderlaan 169, 2030 Antwerpen, Belgium</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Branch Office</h3>
                <p className="text-muted-foreground text-sm">Inselkammerstraße 8, 82008 Unterhaching, Germany</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-card border border-border rounded-lg p-8 shadow-card space-y-5"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Send a Message</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Email Address</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Subject</label>
              <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Inquiry about vault services" />
              {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Message</label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={sending} className="w-full bg-gradient-gold text-primary-foreground font-semibold uppercase tracking-wider hover:opacity-90">
              {sending ? "Sending…" : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Map */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg overflow-hidden border border-border shadow-card"
        >
          <iframe
            title="Head Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.5!2d4.4067!3d51.2394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f700402a90ab%3A0x3fbebd52e4b0a5f8!2sNoorderlaan%20169%2C%202030%20Antwerpen%2C%20Belgium!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
