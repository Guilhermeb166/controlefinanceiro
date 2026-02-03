/**
 * Menu suspenso do usuário que exibe o email logado e fornece a opção de logout.
 */
"use client"

import { signOut } from "firebase/auth"
import { auth } from "@/backend/firebase"
import { useState, useRef, useEffect } from "react"
import { TbLogout } from "react-icons/tb";
import { useAppRouter } from "@/utils/useAppRouter"
import Image from "next/image";

export default function UserDropdown({ user }) {
    const [open, setOpen] =  useState(false)
    const ref = useRef(null)
    const router = useAppRouter()

    useEffect(()=>{
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target))  {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
    }, [])

    async function handleLogout(){
        await signOut(auth)
        router.goLogin()
    }

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-linear-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 backdrop-blur-sm border border-emerald-500/20 cursor-pointer hover:shadow-emerald-700  hover:shadow-sm hover:-translate-y-0.5 transition-transform duration-300 font-medium"
            >
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                        src={user.photoURL}
                        alt={user.displayName || "Foto do usuário"}
                        fill
                        className="object-cover"
                        sizes="32px"
                    />
                </div>
              
                <span className="font-medium truncate max-w-[140px]">
                    {user.displayName || "Perfil"}
                </span>
            </button>

            
                <div className={`absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-40 sm:w-64 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                    open 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                    <div className="px-4 py-3 bg-linear-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Conta Logada</p>
                        {/*<p className="text-sm font-medium text-gray-800 truncate select-none">
                            {user.displayName}
                        </p>*/}
                        <p className="text-sm font-semibold text-gray-800 truncate select-none">
                            {user.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                         className="cursor-pointer w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
                    >
                        <TbLogout />
                        Sair
                    </button>
                </div>
            
        </div>
    )
}
