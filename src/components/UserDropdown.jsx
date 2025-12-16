"use client"

import { signOut } from "firebase/auth"
import { auth } from "@/backend/firebase"
import { useState, useRef, useEffect } from "react"
import { TbLogout } from "react-icons/tb";
import { useAppRouter } from "@/utils/useAppRouter"

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
                className="cursor-pointer flex items-center gap-2 rounded-md p-2 bg-emerald-500 text-white hover:bg-emerald-700 transition-all"
            >
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                           3.75 3.75 0 0 1 7.5 0ZM4.501
                           20.118a7.5 7.5 0 0 1
                           14.998 0A17.933 17.933
                           0 0 1 12 21.75c-2.676
                           0-5.216-.584-7.499-1.632Z"
                    />
                </svg>

                <span className="font-medium truncate max-w-[140px]">
                    {user.displayName || "Perfil"}
                </span>
            </button>

            
                <div className={`absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                    open 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                    <div className="px-4 py-3 bg-linear-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Logado como</p>
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
