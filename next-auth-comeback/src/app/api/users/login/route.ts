import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connecting with database
connectDB();

export async function POST(request: NextRequest) {
  try {
    console.log("entering into body try");
    
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(email);
    console.log(password);
    


    const user = await User.findOne({ email });
    console.log(user);
    

    if (!user) {
      return NextResponse.json(
        { error: "USER WITH THIS EMAIL DOESN'T EXISTS" },
        { status: 401 }
      );
    }

    console.log("validation 1 completed");
    

    const isValidPassword = await bcryptjs.compare(password, user.password);

    console.log("password checked success");
    

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'PASSWORD IS NOT MATCHING. PLEASE RE-ENTER PASSWORD' },
        { status: 401 }
      );
    }

    console.log("passwoered is valid");
    

    const tokenData = {
      id: user._id,
    };

    console.log("topken generated");
    

    console.log("gernerating proper token");
    
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });
    
    console.log("gernerating proper token success");
    console.log(token);
    

    const response = NextResponse.json({
      message: 'USER LOGGEDIN SUCCESSFULLY',
      success: true,
      status: 200,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'SIGNUP ROUTE FAILED TRY AGAIN' },
      { status: 501 }
    );
  }
}
