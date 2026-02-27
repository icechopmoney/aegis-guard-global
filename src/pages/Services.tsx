import { motion } from "framer-motion";
import { Shield, Lock, Truck, UserCheck, Crosshair, Radio } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "High-Value Asset Protection",
    description: "Comprehensive physical and digital protection for assets exceeding $1M in value. Multi-layer perimeter defense with biometric access controls.",
    approach: "Risk assessment, threat modeling, and layered defense architecture tailored to each client's unique asset profile.",
    benefits: ["24/7 armed security", "Biometric vault access", "Insurance-backed guarantees", "Incident response in <4 min"],
    tech: "AI surveillance, seismic sensors, electromagnetic shielding",
  },
  {
    icon: Lock,
    title: "Secure Vault Storage",
    description: "Class III and Class V vault facilities across 12 global locations. Climate-controlled, EMP-hardened, and monitored by redundant systems.",
    approach: "Distributed storage strategy minimizing single-point-of-failure risk with geo-redundant backup facilities.",
    benefits: ["EMP-hardened facilities", "Climate & humidity control", "Dual-key access protocols", "Real-time inventory audits"],
    tech: "Quantum-resistant encryption, time-lock mechanisms, multi-spectral cameras",
  },
  {
    icon: Truck,
    title: "Bullion & Precious Cargo Transport",
    description: "Armored fleet operations for precious metals, gemstones, currency, and high-value cargo with full chain-of-custody documentation.",
    approach: "Route randomization, decoy operations, and satellite-monitored convoy management with armed escort teams.",
    benefits: ["Tamper-proof seals", "GPS + GLONASS tracking", "Armed escort teams", "Full chain-of-custody"],
    tech: "Armored vehicle fleet, satellite comms, real-time route optimization",
  },
  {
    icon: UserCheck,
    title: "Executive & VIP Security",
    description: "Close protection details for high-net-worth individuals, corporate executives, and diplomatic personnel across all threat environments.",
    approach: "Advance team reconnaissance, secure travel corridors, and counter-surveillance sweeps before every engagement.",
    benefits: ["Tier-1 trained operatives", "Advance reconnaissance", "Secure communications", "Medical response capability"],
    tech: "Counter-surveillance drones, encrypted comms, threat intelligence feeds",
  },
  {
    icon: Crosshair,
    title: "Armed Escort Services",
    description: "Tactical escort operations for high-risk corridors and hostile environments. Fully licensed, insured, and compliant with international protocols.",
    approach: "Threat-level assessment with scalable force deployment, from low-profile details to full tactical response teams.",
    benefits: ["Licensed in 48+ countries", "Scalable team deployment", "Hostile environment certified", "Legal compliance guaranteed"],
    tech: "Tactical communications, armored personnel carriers, drone overwatch",
  },
  {
    icon: Radio,
    title: "24/7 Monitoring & Surveillance",
    description: "Global operations center providing continuous monitoring of all protected assets, facilities, and personnel with instant alert escalation.",
    approach: "Layered monitoring combining AI-driven anomaly detection with human analyst oversight for zero false-negative response.",
    benefits: ["99.99% uptime guarantee", "AI anomaly detection", "< 30 second alert response", "Multi-continent redundancy"],
    tech: "Neural network surveillance, satellite imagery, acoustic sensors",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Our Capabilities
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
              Security <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              From vault storage to armed escort, Prime Vault Services provides end-to-end
              protection for the world's most critical assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6 space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-gradient-card rounded-lg border border-border p-8 md:p-10 shadow-card"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Approach</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.approach}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Key Benefits</h4>
                      <ul className="space-y-1">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Technology</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.tech}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
