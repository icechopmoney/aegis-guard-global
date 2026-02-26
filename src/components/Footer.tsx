import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-16">
    <div className="container mx-auto px-6">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              IRON<span className="text-gradient-gold">CLAD</span>
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
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Compliance</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">Operations</h4>
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
        © 2026 IronClad Global Security. All rights reserved. This is a fictional company for demonstration purposes.
      </p>
    </div>
  </footer>
);

export default Footer;
