import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AssetOtpService } from "@/services/assetOtpService";

const AssetAccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const displayName = (user.user_metadata as { full_name?: string } | null)?.full_name || user.email || "Client";

  const handleSendOtp = async () => {
    if (!user) return;
    setSending(true);
    try {
      const { code } = await AssetOtpService.createOtpForUser(user.id);
      await AssetOtpService.sendOtpEmail({
        email: user.email ?? "",
        fullName: displayName,
        code,
      });

      toast({
        title: "Verification Code Sent",
        description: "Check your email for a 6-digit code. It expires in 10 minutes.",
      });

      navigate("/otp-verify");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Unable to Send Code",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-card border border-border rounded-lg p-8 shadow-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-md border border-primary/40 bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Check Your Assets
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">
                One-Time Access Code
              </h1>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Hello {displayName}. We will send a one-time 6-digit code to your registered email address to confirm
            access before showing your vault certificates.
          </p>

          <div className="flex items-center gap-3 mb-6 text-xs text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <span>{user.email}</span>
          </div>

          <Button
            onClick={handleSendOtp}
            disabled={sending}
            className="w-full bg-gradient-gold text-primary-foreground font-semibold uppercase tracking-wider hover:opacity-90"
          >
            {sending ? "Sending Code..." : "Send Verification Code"}
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default AssetAccess;

