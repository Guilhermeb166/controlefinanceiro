/**
 * Componente principal de login que gerencia a alternância entre login e registro,
 * além de verificar o estado de autenticação do usuário.
 */
'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/backend/firebase"
import { useAppRouter } from "@/utils/useAppRouter"

import LoginForm from "@/components/Login/LoginForm"
import RegisterForm from "@/components/Login/RegisterForm"
import Image from "next/image"

export default function LoginMain() {
    const [mode, setMode] = useState("login")
    const [loading, setLoading] = useState(true)
    const router = useAppRouter()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.goHome()
            } else {
                setLoading(false)
            }
        })

        return () => unsub()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Carregando...
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/2 min-h-screen hidden sm:block">
                <Image src={'/img/bglog.png'} alt="background" fill priority className=" object-cover bg-cover bg-center hidden sm:block"/>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col rounded-l-2xl items-center justify-center border min-h-screen border-transparent bg-gray-100 overflow-hidden ">
                {mode === "login" ? <LoginForm/> : <RegisterForm/>}
                <button
                    type="button"
                    className="mt-4 text-gray-400 text-sm cursor-pointer  hover:scale-[1.02] transition-all" 
                    onClick={()=>setMode(mode==="login" ? "register" : "login")}
                >
                    {mode === "login"
                        ? "Não tem conta? Criar conta"
                        : "Já tem conta? Entrar"
                    }
                </button>
            </div>
        </div>
    )
}
