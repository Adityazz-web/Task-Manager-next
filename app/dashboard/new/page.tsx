'use client'

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function New(){
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "new"
    })
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState("")
    const router = useRouter()

    const onSubmit=async(e:any) =>{
        setIsLoading(true)
        e.preventDefault()
        if(form.title==="" || form.description===""){
            return alert("Please enter the details before proceeding")
        }
        try{
            if(token==="") return
            const task = (await axios.post("/api/tasks", {...form}, {headers:{"Authorization":`Bearer_${token}`}})).data.task
            if(!task){
                setIsLoading(false)
                return alert("The task is not created");
            }
            
            router.push("/dashboard")
        }catch(error){
            console.log(error);
            alert(error)
        }
        setIsLoading(false)
    }

    useEffect(()=> {
        const t = localStorage.getItem("token")
        if(!t)return
        setToken(t)
    }, [])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
        <form className="w-[40rem] bg-white shadow-2xl rounded-xl p-6 space-y-6" onSubmit={onSubmit}>
            <h1 className="text-3xl font-bold text-center">Add new task</h1>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Title</p>
                <input type="text" name="title" value={form.title} placeholder="Enter task title" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} required/>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Description</p>
                <textarea name="description" value={form.description} placeholder="Enter task description" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} required></textarea>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Status</p>
                <select name="status" id="status" value={form.status} onChange={(e)=>setForm({...form, "status": e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="new">New</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 cursor-pointer disabled:bg-black/20" disabled={isLoading} type="submit">Add Task</button>

        </form>
        </div>
    )
}
