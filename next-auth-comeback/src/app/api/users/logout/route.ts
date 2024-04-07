import { connectDB } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

// connecting with database
connectDB();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'USER LOGGED OUT SUCCESSFULLY',
      success: true,
      status: 200,
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'SIGNUP ROUTE FAILED TRY AGAIN' },
      { status: 501 }
    );
  }
}
