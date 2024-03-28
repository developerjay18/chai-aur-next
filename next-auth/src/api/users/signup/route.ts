import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/user.models';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helpers/mailer';

connectDB();

// take data
// check already exists or not
// validate data [pending...] [through NPM package]
// hash password
// create new user
// save in database
// send verification email
// return response

// this function is for post method in signup route
async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        {
          error: 'USER ALREADY EXISTS WITH SAME EMAIL',
        },
        { status: 401 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    await sendEmail({ email, emailType: 'VERIFY', userID: createdUser._id });

    return NextResponse.json({
      message: 'USER CREATED SUCCESSFULLY',
      status: 200,
      success: true,
      user: createdUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
