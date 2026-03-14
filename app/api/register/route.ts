import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    try {
        
        const {name, email, password} = await req.json()
        console.log(name, email, password)

        const newPassword = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: newPassword
            }
        })

        const token = jwt.sign({id: user.id}, process.env.secretKey || "", { expiresIn: "7d" });

        return NextResponse.json({token}, {status: 201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}