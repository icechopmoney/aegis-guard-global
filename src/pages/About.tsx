import { motion } from "framer-motion";
import { Shield, Lock, Users, MapPin } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* Header */}
      <section className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-display text-xs md:text-sm uppercase tracking-[0.3em] text-primary">
              About Us
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Prime Vault Services is the first privately owned vault facility in Antwerp. We offer a purpose-built vault, safe, protected by cutting edge security and sophisticated technology, which surpasses the standards set by banks. As a member of the Safe Deposit Federation (SDF), Prime Vault Services meets the highest standards in both security and privacy. Our facility benefits from the latest technology in vault construction.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="container grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-card border border-border rounded-lg p-6 md:p-8 shadow-card">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We offer various vault sizes and safe boxes to suit all client requirements. The larger vaults are ideal for clients to hold large amounts of valuables, precious metals and artwork which need to be stored securely.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We provide peace of mind with unwavering customer service led by confidentiality and discretion as our core value.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card/60 border border-border rounded-lg p-5 shadow-card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                Vault Excellence
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Purpose-built vault infrastructure that surpasses traditional banking standards for both security and privacy.
              </p>
            </div>

            <div className="bg-card/60 border border-border rounded-lg p-5 shadow-card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                Discreet Service
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confidentiality and discretion as core values, supporting private clients and institutions with equal care.
              </p>
            </div>

            <div className="bg-card/60 border border-border rounded-lg p-5 shadow-card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                Antwerp Heritage
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Located in Antwerp, serving global clients who require trusted, long-term protection for high-value assets.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visual / subtle animation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-xl border border-primary/20 bg-gradient-to-br from-card to-background/60 shadow-card overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-60" />
          <div className="relative p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Safe Deposit Federation (SDF)
              </span>
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">
              As a member of the Safe Deposit Federation (SDF), Prime Vault Services meets the highest standards in both security and privacy. Our facility benefits from the latest technology in vault construction, ensuring resilience against both physical and environmental threats.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Security Focus</p>
                <p>Cutting edge surveillance, access control, and monitoring to safeguard client assets.</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Client Experience</p>
                <p>Private, appointment-based access designed for discretion and peace of mind.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;

