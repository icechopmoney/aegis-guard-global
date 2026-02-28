import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-16">
    <div className="container">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              PRIME <span className="text-gradient-gold">VAULT</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Global asset protection and secure logistics for high-value holdings.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Asset Protection</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Vault Storage</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Secure Transport</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Executive Security</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">Offices</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <p className="text-foreground font-medium">Head Office</p>
              <p className="text-muted-foreground">Noorderlaan 169, 2030 Antwerpen, Belgium</p>
            </li>
            <li>
              <p className="text-foreground font-medium">Branch Office</p>
              <p className="text-muted-foreground">Inselkammerstraße 8, 82008 Unterhaching, Germany</p>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@primeVaultservices.org" className="text-muted-foreground hover:text-primary transition-colors">info@primeVaultservices.org</a></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Page</Link></li>
          </ul>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4 mt-6">Operations</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/track" className="text-muted-foreground hover:text-primary transition-colors">Global Coverage</Link></li>
            <li><Link to="/track" className="text-muted-foreground hover:text-primary transition-colors">24/7 Operations Center</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">ISO 27001 Certified</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">TAPA Compliant</Link></li>
          </ul>
        </div>
      </div>
      <div className="glow-line mt-12 mb-6" />
      <p className="text-center text-xs text-muted-foreground">
        © 2026 Prime Vault Services Ltd. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
