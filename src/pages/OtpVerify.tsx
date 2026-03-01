import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, KeyRound, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { AssetOtpService } from "@/services/assetOtpService";

const OtpVerify = () => {
  const { user, setAssetAccessGranted } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit code from your email.",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);
    try {
      const result = await AssetOtpService.verifyOtp(user.id, code);

      if (!result.ok) {
        toast({
          title: result.reason === "expired" ? "Code Expired" : "Invalid Code",
          description:
            result.reason === "expired"
              ? "This code has expired. Please request a new one."
              : "The code you entered is not valid. Please check and try again.",
          variant: "destructive",
        });
        return;
      }

      setAssetAccessGranted(true);
      toast({
        title: "Verified",
        description: "You can now securely access your vault certificates.",
      });
      navigate("/track");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Verification Failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!user) return;
    setResending(true);
    try {
      const displayName =
        (user.user_metadata as { full_name?: string } | null)?.full_name || user.email || "Client";

      const { code: newCode } = await AssetOtpService.createOtpForUser(user.id);
      await AssetOtpService.sendOtpEmail({
        email: user.email ?? "",
        fullName: displayName,
        code: newCode,
      });

      toast({
        title: "New Code Sent",
        description: "Check your email for a fresh 6-digit code.",
      });
      setCode("");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast({
        title: "Unable to Resend",
        description: "Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="container max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-card border border-border rounded-lg p-8 shadow-card text-center"
        >
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-md border border-primary/40 bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Verify Access
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Enter Your OTP
              </h1>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            A 6-digit verification code was sent to your email. Enter it below to continue.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center tracking-[0.5em] font-mono text-lg"
              placeholder="••••••"
            />

            <Button
              onClick={handleVerify}
              disabled={verifying}
              className="w-full bg-gradient-gold text-primary-foreground font-semibold uppercase tracking-wider hover:opacity-90"
            >
              {verifying ? "Verifying..." : (
                <>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Verify Code
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-2 text-xs text-primary hover:underline disabled:opacity-50"
            >
              <RefreshCw className="h-3 w-3" />
              {resending ? "Resending..." : "Resend Code"}
            </button>
          </div>

          <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
            Your one-time code expires after 10 minutes. For your security, never share this code with anyone.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default OtpVerify;

