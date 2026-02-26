import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, AlertTriangle, Loader2, Lock, FileText, User, Globe, Calendar, Package, DollarSign, Archive } from "lucide-react";

interface VaultCertificate {
  vaultCode: string;
  assignedCustodian: string;
  transactionCode: string;
  securityCode: string;
  depositorName: string;
  depositorNationality: string;
  nextOfKin: string;
  nextOfKinNationality: string;
  dateOfDeposit: string;
  purposeOfDeposit: string;
  securityCharges: string;
  consignmentPackage: string;
  consignmentContent: string;
}

const mockData: Record<string, VaultCertificate> = {
  "AF-2026-0042": {
    vaultCode: "VC-8741-ZRCH-A3",
    assignedCustodian: "Col. Heinrich Brauer",
    transactionCode: "TXN-2026-AF0042-GLD",
    securityCode: "SEC-9827-DELTA-7X",
    depositorName: "Laurent M. Beaumont",
    depositorNationality: "France",
    nextOfKin: "Isabelle C. Beaumont",
    nextOfKinNationality: "France",
    dateOfDeposit: "24 February 2026",
    purposeOfDeposit: "Private Storage — Long-Term Investment Holding",
    securityCharges: "CHF 47,500.00 / Annum",
    consignmentPackage: "Sealed Vault Crate — Class IV Armored",
    consignmentContent: "Gold Bullion — 12 × 1kg LBMA-Certified Bars",
  },
  "AF-2026-0099": {
    vaultCode: "VC-3392-ZRCH-B7",
    assignedCustodian: "Cmdr. Elena Vogt",
    transactionCode: "TXN-2026-AF0099-ART",
    securityCode: "SEC-5510-OMEGA-2K",
    depositorName: "Dimitri A. Konstantinos",
    depositorNationality: "Greece",
    nextOfKin: "Sophia E. Konstantinos",
    nextOfKinNationality: "Greece",
    dateOfDeposit: "10 February 2026",
    purposeOfDeposit: "Legal Custody — Insured Art Collection",
    securityCharges: "CHF 62,000.00 / Annum",
    consignmentPackage: "Climate-Controlled Precious Metals Locker",
    consignmentContent: "Fine Art — 4 Paintings, Authenticated & Insured ($12.4M)",
  },
  "AF-2026-0155": {
    vaultCode: "VC-6178-SING-D1",
    assignedCustodian: "Maj. Rajesh Anand",
    transactionCode: "TXN-2026-AF0155-CUR",
    securityCode: "SEC-7743-ALPHA-9R",
    depositorName: "Chen Wei Lin",
    depositorNationality: "Singapore",
    nextOfKin: "Chen Mei Xiang",
    nextOfKinNationality: "Singapore",
    dateOfDeposit: "15 January 2026",
    purposeOfDeposit: "International Transfer — Multi-Denomination Currency",
    securityCharges: "SGD 28,750.00 / Annum",
    consignmentPackage: "Armored Case — Dual-Lock Biometric Seal",
    consignmentContent: "Currency — Multi-Denomination (USD, EUR, GBP, CHF) — $3.2M Equivalent",
  },
};

const CertField = ({ label, value, icon: Icon, delay = 0 }: { label: string; value: string; icon: React.ElementType; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex gap-4 py-4 border-b border-border/50 last:border-b-0"
  >
    <div className="mt-0.5">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </motion.div>
);

const TrackAsset = () => {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<VaultCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);
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
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Secure Tracking</span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
              Vault <span className="text-gradient-gold">Certificate</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Enter your tracking reference number to retrieve your vault certificate details.
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 max-w-2xl py-12 text-center">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="container mx-auto px-6 max-w-2xl py-8">
            <div className="bg-gradient-card border border-destructive/30 rounded-lg p-8 text-center shadow-card">
              <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Reference Not Found</h3>
              <p className="text-sm text-muted-foreground">No vault certificate matches this tracking reference.</p>
              <p className="mt-4 text-xs text-muted-foreground">
                Try:{" "}
                <button onClick={() => { setTrackingId("AF-2026-0042"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0042</button>,{" "}
                <button onClick={() => { setTrackingId("AF-2026-0099"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0099</button>, or{" "}
                <button onClick={() => { setTrackingId("AF-2026-0155"); setNotFound(false); }} className="text-primary hover:underline font-mono">AF-2026-0155</button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Certificate */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 max-w-3xl pb-24"
          >
            <div className="bg-gradient-card border border-primary/20 rounded-lg shadow-card overflow-hidden">
              {/* Certificate Header */}
              <div className="border-b border-primary/20 px-8 py-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 21px)",
                }} />
                <div className="relative">
                  <Shield className="mx-auto h-8 w-8 text-primary mb-3" />
                  <h2 className="font-display text-2xl font-bold text-foreground tracking-wider">
                    VAULT <span className="text-gradient-gold">CERTIFICATE</span>
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mt-2">
                    IronClad Global Security — Confidential Document
                  </p>
                </div>
              </div>

              {/* Vault Code & Custodian */}
              <div className="grid md:grid-cols-2 border-b border-border">
                <div className="border-b md:border-b-0 md:border-r border-border px-8 py-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary mb-2">Vault Code</p>
                  <p className="font-mono text-lg font-bold text-foreground tracking-widest">{result.vaultCode}</p>
                </div>
                <div className="px-8 py-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary mb-2">Assigned Custodian</p>
                  <p className="font-display text-lg font-semibold text-foreground">{result.assignedCustodian}</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px flex-1 bg-primary/20" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Certificate Details</span>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>

                <div className="grid md:grid-cols-2 gap-x-8">
                  <div>
                    <CertField icon={FileText} label="Transaction Code" value={result.transactionCode} delay={0.1} />
                    <CertField icon={Lock} label="Security Code" value={result.securityCode} delay={0.15} />
                    <CertField icon={User} label="Depositor Name" value={result.depositorName} delay={0.2} />
                    <CertField icon={Globe} label="Depositor Nationality" value={result.depositorNationality} delay={0.25} />
                    <CertField icon={User} label="Next of Kin" value={result.nextOfKin} delay={0.3} />
                    <CertField icon={Globe} label="Next of Kin Nationality" value={result.nextOfKinNationality} delay={0.35} />
                  </div>
                  <div>
                    <CertField icon={Calendar} label="Date of Deposit" value={result.dateOfDeposit} delay={0.2} />
                    <CertField icon={FileText} label="Purpose of Deposit" value={result.purposeOfDeposit} delay={0.25} />
                    <CertField icon={DollarSign} label="Security Charges" value={result.securityCharges} delay={0.3} />
                    <CertField icon={Package} label="Consignment Package" value={result.consignmentPackage} delay={0.35} />
                    <CertField icon={Archive} label="Consignment Content" value={result.consignmentContent} delay={0.4} />
                  </div>
                </div>
              </div>

              {/* Footer seal */}
              <div className="border-t border-primary/20 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 text-primary" />
                  Encrypted & tamper-proof — verified by IronClad Security
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 text-primary" />
                  {trackingId.toUpperCase()}
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
