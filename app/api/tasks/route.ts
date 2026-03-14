import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){
    const token = req.headers.get("Authorization")?.split("_")[1];
    
    if(!token) return NextResponse.json({user: null}, {status: 401})
    
    console.log("token", token)
        
    const isUser:any = jwt.verify(token, process.env.secretKey || "")

    const tasks = await prisma.task.findMany({where: {userId:isUser.id}})

    return NextResponse.json({tasks}, {status: 200})
}

export async function POST(req: NextRequest){
    const token = req.headers.get("Authorization")?.split("_")[1];
    
    if(!token) return NextResponse.json({user: null}, {status: 401})
    
    console.log("token", token)
        
    const isUser:any = jwt.verify(token, process.env.secretKey || "")

    const body= await req.json();

    const task = await prisma.task.create({
        data:{
            title: body.title,
            description: body.description,
            status: body.status,
            userId: isUser.id
        }
    })

    return NextResponse.json({task}, {status: 200})
}