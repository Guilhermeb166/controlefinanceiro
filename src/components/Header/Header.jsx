/**
 * Componente de cabeçalho que gerencia a exibição do menu lateral e o botão de autenticação do usuário.
 */
"use client"

import SideMenu from "@/components/SideMenu/SideMenu";
import { IoMenu } from "react-icons/io5";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/backend/firebase"
import UserAuthButton from "@/components/UserAuthButton/UserAuthButton"

export default function Header() {
    const pathname = usePathname()
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

     useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        return () => unsub()
    }, [])


    if (loading) return null


    if (!user) return null


    if (pathname === "/login") return null

    return (
        <header   className={`bg-emerald-600 w-full
        ${(pathname !== "/" && pathname !== "/login") ? "h-10 relative flex items-center justify-between py-8 px-5" : 'h-0'}`}>
            <button
                type="button"
                onClick={() => setIsSideMenuOpen(true)}
                className={`${pathname !== "/" ? " left-4" : "fixed top-5 left-4"}  z-50 text-white text-4xl cursor-pointer`}
            >
                <IoMenu className={`${isSideMenuOpen? "opacity-0" : "opacity-100"}`}/>
                
            </button>

            <SideMenu
                isOpen={isSideMenuOpen}
                onClose={() => setIsSideMenuOpen(false)}
            />
            {pathname !== "/"  && (
                <UserAuthButton/>
            )
            }
        </header>
        
    )
}
