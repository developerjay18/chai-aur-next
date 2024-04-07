import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.models';

// connecting with database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'USER TOKEN NOT FOUND OR IT IS EXPIRED MAYBE' },
        { status: 401 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "USER'S EMAIL VERIFIED SUCCESSFULLY",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'SIGNUP ROUTE FAILED TRY AGAIN' },
      { status: 501 }
    );
  }
}
