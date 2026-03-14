'use client'

import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const onSubmit=async(e:any) =>{
        setIsLoading(true)
        e.preventDefault()
        if(form.email==="" || form.password===""){
            return alert("Please enter the details before proceeding")
        }
        try{

            const token = (await axios.post("/api/register", {...form})).data.token
            if(!token){
                setIsLoading(false)
                return alert("Your username or password is incorrect");
            }
            
            localStorage.setItem("token", token)
            router.push("/dashboard")
        }catch(error){
            console.log(error);
            alert(error)
        }
        setIsLoading(false)
    }

    return (
        <form className="w-[40rem] bg-white shadow-2xl rounded-xl p-6 space-y-6" onSubmit={onSubmit}>
            <h1 className="text-3xl font-bold text-center">Registeration Form</h1>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Name</p>
                <input type="text" name="name" value={form.name} placeholder="Enter your name" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} required/>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Email</p>
                <input type="email" name="email" value={form.email} placeholder="Enter your email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} required/>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Password</p>
                <input type="password" name="password" value={form.password} placeholder="Enter your Password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} required minLength={8}/>
            </div>

            <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 cursor-pointer disabled:bg-black/20" disabled={isLoading} type="submit">Register</button>

            <p className="text-center">Already have an account? <span className="text-purple-500"><Link href={"/auth/login"}>Login now</Link></span></p>

        </form>
    )
}