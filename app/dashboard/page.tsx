'use client'

import { LogoutButton } from "@/components/logoutButton";
import { Task } from "../generated/prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

const TaskCard = ({t, updateStatus}: {t: Task, updateStatus: (id: string, status: string)=>void})=>{
    return(
        <div className="w-80 p-6 bg-white flex flex-col justify-center items-start rounded-xl gap-5">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-lg">{t.description}</p>
            <p>{new Date(t.created_at).toLocaleString()}</p>

            <select name="status" id="status" value={t.status} onChange={(e)=>updateStatus(t.id, e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                <option value="new">New</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>
        </div>
    )
}

export default function Dashboard(){

    const [tasks, setTasks] = useState<Task[]>([])
    const [token, setToken] = useState("")

    const updateStatus = async (id:string, status: string)=>{
        const data = (await axios.patch(`/api/tasks/${id}`, {status}, {headers:{"Authorization":`Bearer_${token}`}})).data

        const newTasks = tasks.map(t=>{
            if(t.id===id){
                return {...t, status}
            }
            return t
        })

        setTasks(newTasks)
    }

    const getTasks=async()=>{
        const tasks = (await axios.get("/api/tasks", {headers:{"Authorization":`Bearer_${token}`}})).data
        setTasks(tasks.tasks)
    }

    useEffect(()=>{
        const t = localStorage.getItem("token")
        if(!t)return
        setToken(t)
        if(token==="")return
        getTasks()
    }, [token])



    return(
        <div className="w-screen h-screen  bg-blue-50 p-10">

            <div className="max-w-7xl mx-auto h-full flex flex-col items-center shadow-3xl rounded-xl">
                <div className="flex items-center gap-6 mb-10">

                    <button className="w-36 bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 cursor-pointer disabled:bg-black/20" onClick={()=>redirect("/dashboard/new")}>New</button>
                    <LogoutButton />
                </div>
                <div className="bg-white grid grid-cols-3 w-full rounded-t-xl">
                    <p className="text-center text-xl font-bold border p- rounded-tl-xl">New</p>
                    <p className="text-center flex-1 text-xl font-bold border p-">Active</p>
                    <p className="text-center flex-1 text-xl font-bold border p- rounded-tr-xl">Done</p>
                </div>

                <div className="grid grid-cols-3 w-full h-full rounded-b-xl overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="w-full h-full bg-red-400 flex flex-col items-center gap-10 p-10">
                        {tasks.map((t, i)=>t.status==="new"?(
                            <TaskCard key={i} t={t} updateStatus={updateStatus}/>
                        ):"")}
                    </div>
                    <div className="w-full h-full bg-yellow-400 flex flex-col items-center gap-10 p-10">
                        {tasks.map((t, i)=>t.status==="active"?(
                            <TaskCard key={i} t={t} updateStatus={updateStatus}/>
                        ):"")}
                    </div>
                    <div className="w-full h-full bg-green-400 flex flex-col items-center gap-10 p-10">
                        {tasks.map((t, i)=>t.status==="done"?(
                            <TaskCard key={i} t={t} updateStatus={updateStatus}/>
                        ):"")}
                    </div>
                </div>

            </div>
        </div>  
    )
}