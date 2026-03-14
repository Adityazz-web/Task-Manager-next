'use client'

import { LogoutButton } from "@/components/logoutButton"
import { checkAuthClient } from "@/lib/checkAuth"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"

export default function DashboardLayout({children}:Readonly<{children: React.ReactNode}>){

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const check = async()=>{

            const token = localStorage.getItem("token")
            if(!token){
                setIsAuth(false);
                setIsLoading(false)
                return;
            }

            const res = await checkAuthClient(token)
            console.log(res)
            
            if(!res) {

                setIsAuth(false)
                setIsLoading(false)
                return;
            }
            setIsAuth(true)
            setIsLoading(false)
            return;
        }

        check()
        
    }, [])

    if(isLoading){
        return(
            <div className="w-screen h-screen bg-blue-50 flex justify-center items-center">
                <BiLoaderCircle className="animate-spin"/>
            </div>
        )
    }

    if(!isAuth){
        return redirect("/auth/login")
    }

    return(
        <div className="w-screen h-screen bg-blue-50 flex justify-center items-center">
            {children}
        </div>
    )
}