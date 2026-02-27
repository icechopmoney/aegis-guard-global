import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, MapPin, Clock, Lock, ChevronRight, Globe, Users, Radio } from "lucide-react";
import heroVault from "@/assets/hero-vault.png";
import monitoringCenter from "@/assets/monitoring-center.png";
import armoredTransport from "@/assets/armored-transport.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stats = [
  { icon: Globe, label: "Countries", value: "48+" },
  { icon: Shield, label: "Assets Protected", value: "$12B+" },
  { icon: Users, label: "Certified Agents", value: "2,400+" },
  { icon: Clock, label: "Uptime", value: "99.99%" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroVault} alt="Secure vault facility" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>

        <div className="container relative mx-auto px-6 pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center gap-2">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Global Asset Protection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
            >
              Advanced Protection for{" "}
              <span className="text-gradient-gold">High-Value Assets</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Prime Vault Services delivers military-grade security, real-time monitoring, and
              secure logistics for the world's most valuable assets. Trusted by
              governments, institutions, and private clients across 48 countries.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="bg-gradient-gold px-8 py-4 font-semibold uppercase tracking-wider text-primary-foreground rounded-sm text-sm transition-opacity hover:opacity-90"
              >
                Request Protection
              </Link>
              <Link
                to="/track"
                className="border border-primary/30 px-8 py-4 font-semibold uppercase tracking-wider text-primary rounded-sm text-sm transition-colors hover:bg-primary/10"
              >
                Track Asset <ChevronRight className="inline h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 border-r border-border py-10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
            >
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="font-display text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Radio className="h-4 w-4 text-primary animate-pulse-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Real-Time Monitoring
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                24/7 Global Operations Center
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our state-of-the-art command center monitors every asset in real time
                across multiple continents. Advanced AI-powered surveillance, 
                geofencing alerts, and encrypted communications ensure your assets
                are never out of sight.
              </p>
              <div className="space-y-4">
                {["AI-powered threat detection", "Encrypted satellite tracking", "Instant alert protocols", "Multi-layered access control"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={monitoringCenter}
                alt="Global monitoring operations center"
                className="rounded-lg shadow-card"
              />
              <div className="absolute inset-0 rounded-lg border border-primary/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 relative"
            >
              <img
                src={armoredTransport}
                alt="Armored transport convoy"
                className="rounded-lg shadow-card"
              />
              <div className="absolute inset-0 rounded-lg border border-primary/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Secure Logistics
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Armored Transport & Escort
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From precious metals to critical documents, our armored fleet and
                trained escort teams deliver your assets with military precision.
                Real-time GPS tracking and tamper-proof seals guarantee chain-of-custody
                integrity from origin to destination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Ready to Secure Your Assets?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Contact our security consultants for a confidential assessment of your protection needs.
            </p>
            <Link
              to="/services"
              className="bg-gradient-gold px-10 py-4 font-semibold uppercase tracking-wider text-primary-foreground rounded-sm text-sm inline-block transition-opacity hover:opacity-90"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
