import { supabase, AssetOtp } from "@/lib/supabase";

const generateOtpCode = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const code = (array[0] % 1000000).toString().padStart(6, "0");
  return code;
};

export class AssetOtpService {
  static async createOtpForUser(userId: string) {
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("asset_otps")
      .insert({ user_id: userId, code, expires_at: expiresAt })
      .select()
      .single<AssetOtp>();

    if (error) {
      console.error("Error creating OTP:", error);
      throw error;
    }

    return { code, record: data };
  }

  static async verifyOtp(userId: string, code: string) {
    const { data, error } = await supabase
      .from("asset_otps")
      .select("*")
      .eq("user_id", userId)
      .eq("code", code)
      .order("created_at", { ascending: false })
      .limit(1)
      .single<AssetOtp>();

    if (error || !data) {
      return { ok: false as const, reason: "invalid" as const };
    }

    const now = new Date();
    const expiresAt = new Date(data.expires_at);

    if (data.used_at || expiresAt < now) {
      return { ok: false as const, reason: "expired" as const };
    }

    await supabase
      .from("asset_otps")
      .update({ used_at: new Date().toISOString() })
      .eq("id", data.id);

    return { ok: true as const };
  }

  // Send OTP email via Supabase Edge Function that uses Resend server-side
  static async sendOtpEmail(params: { email: string; fullName: string; code: string }) {
    const { error } = await supabase.functions.invoke("send-asset-otp", {
      body: {
        email: params.email,
        fullName: params.fullName,
        code: params.code,
      },
    });

    if (error) {
      console.error("Error sending OTP email via function:", error);
      throw error;
    }
  }
}

