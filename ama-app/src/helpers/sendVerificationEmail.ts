import VerificationEmail from '../../emails/verificationEmail';
import { resend } from '@/lib/resend';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: '<onboarding@resend.dev>',
      to: email,
      subject: 'Ama App | Verification Email',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: 'verification email sent successfully',
    };
  } catch (error) {
    console.log('Error sending verification email');
    return {
      success: false,
      message: 'Failure sending verification email',
    };
  }
}
