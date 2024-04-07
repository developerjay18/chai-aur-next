import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.models';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

// connecting with database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        { error: 'USER ALREADY EXISTS WITH SAME EMAIL' },
        { status: 401 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'USER CREATED SUCCESSFULLY',
      status: 200,
      savedUser,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'SIGNUP ROUTE FAILED TRY AGAIN' },
      { status: 501 }
    );
  }
}
