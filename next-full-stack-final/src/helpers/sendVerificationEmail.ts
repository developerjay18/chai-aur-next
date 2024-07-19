import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  username: string,
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "JAY <onboarding@resend.dev>",
      to: email,
      subject: "Mstry Msg | Verification Email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: false,
      message: "ERROR WHILE SENDING VERIFICATION MAIL FROM BACKEND",
    };
  } catch (error) {
    console.error("ERROR WHILE SENDING VERIFICATION MAIL", error);
    return {
      success: false,
      message: "ERROR WHILE SENDING VERIFICATION MAIL FROM BACKEND",
    };
  }
}
