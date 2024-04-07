import User from '@/models/user.models';
import nodemailer from 'nodemailer';
import { uuid } from 'uuidv4';

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = uuid();

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '9ae2f7b086de27',
        pass: 'b7688f9e7528d3',
      },
    });

    const mailOptions = {
      from: 'jayraiweb@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
        </p>`,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (error: any) {
    throw new Error('EMAIL SENDING FAILED', error);
  }
}
