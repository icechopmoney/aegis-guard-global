import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, MapPin, Clock, Package, AlertTriangle, CheckCircle, Loader2, Lock } from "lucide-react";

interface TrackingResult {
  id: string;
  category: string;
  status: string;
  statusColor: string;
  location: string;
  lastUpdate: string;
  estimatedDelivery: string;
  timeline: { time: string; event: string; done: boolean }[];
}

const mockData: Record<string, TrackingResult> = {
  "AF-2026-0042": {
    id: "AF-2026-0042",
    category: "Precious Metals — Gold Bullion",
    status: "In Transit",
    statusColor: "text-yellow-400",
    location: "Frankfurt, Germany",
    lastUpdate: "2026-02-26T14:32:00Z",
    estimatedDelivery: "2026-02-28",
    timeline: [
      { time: "Feb 24, 08:00", event: "Asset received at origin vault", done: true },
      { time: "Feb 24, 14:15", event: "Security inspection cleared", done: true },
      { time: "Feb 25, 06:00", event: "Loaded into armored transport", done: true },
      { time: "Feb 26, 14:32", event: "In transit — Frankfurt checkpoint", done: true },
      { time: "Feb 27, 10:00", event: "Arrival at destination facility", done: false },
      { time: "Feb 28, 09:00", event: "Final delivery & handover", done: false },
    ],
  },
  "AF-2026-0099": {
    id: "AF-2026-0099",
    category: "Fine Art — Insured Collection",
    status: "In Vault",
    statusColor: "text-emerald-400",
    location: "Zürich, Switzerland",
    lastUpdate: "2026-02-26T09:00:00Z",
    estimatedDelivery: "N/A — Stored",
    timeline: [
      { time: "Feb 10, 11:00", event: "Asset received and cataloged", done: true },
      { time: "Feb 10, 14:00", event: "Climate-controlled vault assigned", done: true },
      { time: "Feb 10, 16:30", event: "Security seal activated", done: true },
      { time: "Daily", event: "Automated environment monitoring", done: true },
    ],
  },
  "AF-2026-0155": {
    id: "AF-2026-0155",
    category: "Currency — Multi-Denomination",
    status: "Delivered",
    statusColor: "text-emerald-400",
    location: "Singapore",
    lastUpdate: "2026-02-22T16:45:00Z",
    estimatedDelivery: "Completed — Feb 22",
    timeline: [
      { time: "Feb 19, 07:00", event: "Asset prepared for dispatch", done: true },
      { time: "Feb 20, 12:00", event: "Armed escort departed", done: true },
      { time: "Feb 21, 18:00", event: "Customs clearance completed", done: true },
      { time: "Feb 22, 16:45", event: "Delivered to client vault", done: true },
    ],
  },
};

const TrackAsset = () => {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const found = mockData[trackingId.trim().toUpperCase()];
    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Secure Tracking
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
              Asset <span className="text-gradient-gold">Tracker</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Enter your tracking reference number to view real-time asset status.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-card border border-border rounded-lg p-8 shadow-card"
          >
            <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Enter Tracking Reference Number
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="e.g. AF-2026-0042"
                  className="w-full rounded-sm border border-border bg-muted px-12 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono tracking-wider"
                  maxLength={20}
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={loading || !trackingId.trim()}
                className="bg-gradient-gold px-8 py-4 font-semibold uppercase tracking-wider text-primary-foreground rounded-sm text-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                Track
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Tracking information is encrypted and updated in real time.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 max-w-2xl py-12 text-center"
          >
            <div className="relative mx-auto h-20 w-20">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
              <Shield className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse-gold" />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Verifying secure connection...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Not Found */}
      <AnimatePresence>
        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 max-w-2xl py-8"
          >
            <div className="bg-gradient-card border border-destructive/30 rounded-lg p-8 text-center shadow-card">
              <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Reference Not Found</h3>
              <p className="text-sm text-muted-foreground">
                No asset matches this tracking reference. Please verify your reference number and try again.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Try: <button onClick={() => { setTrackingId("AF-2026-0042"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0042</button>,{" "}
                <button onClick={() => { setTrackingId("AF-2026-0099"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0099</button>, or{" "}
                <button onClick={() => { setTrackingId("AF-2026-0155"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0155</button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 max-w-4xl pb-24"
          >
            {/* Result Card */}
            <div className="bg-gradient-card border border-border rounded-lg shadow-card overflow-hidden">
              {/* Header bar */}
              <div className="border-b border-border px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm tracking-wider text-foreground">{result.id}</span>
                </div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${result.statusColor}`}>
                  ● {result.status}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 border-b border-border">
                <div className="border-b md:border-b-0 md:border-r border-border px-8 py-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <Package className="h-3 w-3" /> Category
                  </div>
                  <p className="text-sm font-medium text-foreground">{result.category}</p>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-border px-8 py-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" /> Location
                  </div>
                  <p className="text-sm font-medium text-foreground">{result.location}</p>
                </div>
                <div className="border-b lg:border-b-0 lg:border-r border-border px-8 py-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" /> Last Update
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(result.lastUpdate).toLocaleString()}
                  </p>
                </div>
                <div className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" /> Est. Delivery
                  </div>
                  <p className="text-sm font-medium text-foreground">{result.estimatedDelivery}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-8 py-8">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                  Tracking Timeline
                </h4>
                <div className="space-y-4">
                  {result.timeline.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                          event.done
                            ? "bg-primary/20 border border-primary/40"
                            : "bg-muted border border-border"
                        }`}>
                          {event.done ? (
                            <CheckCircle className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                          )}
                        </div>
                        {i < result.timeline.length - 1 && (
                          <div className={`w-px flex-1 min-h-[20px] ${event.done ? "bg-primary/30" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm ${event.done ? "text-foreground" : "text-muted-foreground"}`}>
                          {event.event}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="border-t border-border px-8 py-8">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Live Location
                </h4>
                <div className="relative h-48 rounded-lg bg-muted border border-border overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-primary animate-pulse-gold" />
                      <p className="mt-2 text-sm text-muted-foreground">{result.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">Secure map feed — encrypted channel</p>
                    </div>
                  </div>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />
                  {/* Scan line */}
                  <div className="absolute inset-x-0 h-px bg-primary/30 animate-scan-line" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackAsset;
