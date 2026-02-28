import { motion } from "framer-motion";
import { Shield, Mail, MapPin, Building2 } from "lucide-react";

const Contact = () => {
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

      <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-2">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Email */}
          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email</h3>
                <a
                  href="mailto:info@primeVaultservices.org"
                  className="text-primary hover:underline text-sm"
                >
                  info@primeVaultservices.org
                </a>
              </div>
            </div>
          </div>

          {/* Head Office */}
          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Head Office</h3>
                <p className="text-muted-foreground text-sm">
                  Noorderlaan 169, 2030 Antwerpen, Belgium
                </p>
              </div>
            </div>
          </div>

          {/* Branch Office */}
          <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Branch Office</h3>
                <p className="text-muted-foreground text-sm">
                  Inselkammerstraße 8, 82008 Unterhaching, Germany
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg overflow-hidden border border-border shadow-card min-h-[400px]"
        >
          <iframe
            title="Head Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.5!2d4.4067!3d51.2394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f700402a90ab%3A0x3fbebd52e4b0a5f8!2sNoorderlaan%20169%2C%202030%20Antwerpen%2C%20Belgium!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 400 }}
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
