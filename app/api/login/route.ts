import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    try {
        
        const {email, password} = await req.json()
        
        const user = await prisma.user.findUnique({where:{email}})

        if(!user){
            return NextResponse.json({message: "Incorrect email"})
        }

        const pwdCorrect  = bcrypt.compare(password, user.password);

        if(!pwdCorrect){
            return NextResponse.json({message: "Incorrect password"})
        }

        const token = jwt.sign({id: user.id}, process.env.secretKey || "", { expiresIn: "7d" });

        return NextResponse.json({token}, {status: 201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}