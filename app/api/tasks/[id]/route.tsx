import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, {params}:{params:Promise<{id: string}>}){
    const token = req.headers.get("Authorization")?.split("_")[1];
    
    if(!token) return NextResponse.json({user: null}, {status: 401})
    
    console.log("token", token)
        
    const isUser:any = jwt.verify(token, process.env.secretKey || "")

    const {id} = await params;
    const body = await req.json();
    console.log("body", body)

    const task = await prisma.task.update({
        where:{id},
        data:{
            status: body.status
        }
    })

    return NextResponse.json({task}, {status: 200})
}