'use client'

import { redirect } from "next/navigation"
import { LuLogOut } from "react-icons/lu"

export const LogoutButton=()=>{

    const logout = ()=>{
        localStorage.removeItem("token");
        return redirect("/auth/login")
    }

    return(
        <div className="px-6 py-2.5 w-26 rounded-xl bg-black hover:bg-gray-800 cursor-pointer flex items-center gap-2 text-white" onClick={logout}>
            Logout <LuLogOut />
        </div>
    )
}