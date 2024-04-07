import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.models';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { getDataFromToken } from '@/helpers/getDataFromToken';

// connecting with database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findById({ _id: userId }).select('-password');

    return NextResponse.json({
      message: 'USER FETCHED SUCCESSFULLY',
      status: 200,
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'SIGNUP ROUTE FAILED TRY AGAIN' },
      { status: 501 }
    );
  }
}
