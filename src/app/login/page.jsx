"use client"

import {signOut, useSession} from "next-auth/react"
import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import Image from "next/image"


export default function LoginPage() {

    const [mode, setMode] = useState("login")
    const { data: session } = useSession()

    if (session?.user) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80 text-center">

            <h1 className="text-2xl font-semibold mb-3">Você já está logado</h1>

            <p className="text-gray-700 font-medium">
                {session.user.name || "Sem nome"}
            </p>
            <p className="text-gray-500 mb-4">
                {session.user.email}
            </p>

            <button
                type="button"
                className="bg-red-600 text-white w-full p-2 rounded hover:bg-red-700"
                onClick={() => signOut({ callbackUrl: "/" })}
            >
                Sair
            </button>
            </div>
        </div>
        )
    } else {
        return (
            <div className="min-h-screen flex items-center bg-gray-100">

          
                    <div className="relative w-full min-h-screen">
                        <Image src={'/img/bglogin2.png'} alt="background" fill priority className=" object-cover bg-cover bg-center"/>
                    </div>
                    <div className="w-1/2 flex flex-col rounded-l-2xl items-center justify-center border min-h-screen
                    border-transparent bg-white overflow-hidden ">
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
