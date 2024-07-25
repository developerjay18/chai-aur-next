import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    // lets create backend logic here...
    // take data
    // check username if available
    // check email if available
    // hash password
    // generate verify code
    // save user with hashed password, verify code, verify code expiry and isVerified = false
    // send verification email
    // return success response

    await dbConnect()
}
