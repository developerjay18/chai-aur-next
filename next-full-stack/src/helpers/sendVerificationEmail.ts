import VerificationEmail from '../../emails/VerificationEmail';
import { resend } from '@/lib/resend';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Next full stack | Verification Email',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: false,
      message: 'Error sending verification email',
    };
  } catch (emailError) {
    console.log('Error sending verification email', emailError);
    return {
      success: false,
      message: 'Error sending verification email',
    };
  }
}
