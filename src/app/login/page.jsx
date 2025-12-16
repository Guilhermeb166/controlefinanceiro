"use client"

import { useEffect, useState } from "react"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/backend/firebase"

import LoginForm from "@/components/Login/LoginForm"
import RegisterForm from "@/components/Login/RegisterForm"
import Image from "next/image"


export default function LoginPage() {

    const [mode, setMode] = useState("login")
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Carregando...
            </div>
        )
    }

    if (user) {
        return (
        <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">

            <h1 className="text-2xl font-semibold mb-3">Você já está logado</h1>

            <p className="text-gray-700 font-medium">
                {user.displayName || "Sem nome"}
            </p>
            <p className="text-gray-500 mb-4">
                {user.email}
            </p>

            <button
                type="button"
                className="cursor-pointer bg-red-600 text-white w-full p-2 rounded hover:bg-red-700"
                 onClick={async () => {
                    await signOut(auth)
                    window.location.href = "/"
                }}
            >
                Sair
            </button>
            </div>
        </div>
        )
    } else {
        return (
            <div className="min-h-screen flex items-center ">

          
                    <div className="relative w-1/2 min-h-screen">
                        <Image src={'/img/bglog.png'} alt="background" fill priority className=" object-cover bg-cover bg-center"/>
                    </div>
                    <div className="w-1/2 flex flex-col rounded-l-2xl items-center justify-center border min-h-screen border-transparent bg-gray-100 overflow-hidden ">
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
    
}
