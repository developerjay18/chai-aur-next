import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          message: 'USERNAME ALREADY EXISTS. PLEASE TRY WITH UNIQUE USERNAME B',
          success: false,
        },
        { status: 401 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          message: 'USERNAME ALREADY EXISTS. PLEASE TRY WITH UNIQUE USERNAME B',
          success: false,
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log('ERROR WHILE CREATING USER B', error);
    return NextResponse.json(
      {
        message: 'FAILED WHILE CREATING USER B',
        success: false,
      },
      { status: 501 }
    );
  }
}
