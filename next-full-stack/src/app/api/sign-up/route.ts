import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

async function POST(request: Request) {
  await dbConnect();

  // take data
  // check username
  // check email
  // generate OTP and verifyCode's Exipry
  // if not registered -> then register
  // if registered -> is verified -> return success false
  // if registered -> not verified -> then change password
  // sending mails to user's email
  // 🔥🔥🔥🔥🔥

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: 'User is already registered and verified',
        },
        { status: 401 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 401 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUSer = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUSer.save();
    }

    // sending mails
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    console.log('Assignment Email response: ', emailResponse);

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send verification email',
        },
        { status: 501 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User registered sucessfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error while regestering user', error);
    return NextResponse.json(
      { success: false, message: 'Error while regestering user' },
      { status: 501 }
    );
  }
}
