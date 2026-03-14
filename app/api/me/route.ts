import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){
    try {
        const token = req.headers.get("Authorization")?.split("_")[1];
        if(!token) return NextResponse.json({user: null}, {status: 401})
        
        console.log("token", token)
            
        const isUser:any = jwt.verify(token, process.env.secretKey || "")
        
        const user = await prisma.user.findUnique({where:{id: isUser.id}})
        console.log(user)
        
        return NextResponse.json({user}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("There is some from from our end ", {status: 500})
    }

    
}