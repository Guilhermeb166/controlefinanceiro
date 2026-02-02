/**
 * Componente principal de login que gerencia a alternância entre login e registro,
 * além de verificar o estado de autenticação do usuário.
 */
'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/backend/firebase"
import { useAppRouter } from "@/utils/useAppRouter"
import GoogleLoginBtn from "./GoogleLoginBtn"
import Image from "next/image"

export default function LoginMain() {
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-500 font-medium">Carregando...</span>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen flex items-center flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/2 min-h-screen hidden sm:block">
                <Image src={'/img/bglog.png'} alt="background" fill priority className=" object-cover bg-cover bg-center hidden sm:block"/>
            </div>
            <div className="w-full sm:w-1/2  flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
                <div className="w-full max-w-md flex flex-col items-center gap-8">
                    <div className="text-center">
                        <h1 className="text-emerald-600 font-bold text-4xl mb-3 tracking-tight">Bem-vindo</h1>
                        <p className="text-gray-500">Acesse sua conta de forma rápida e segura</p>
                    </div>

                    <div className="w-full bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col items-center gap-6">
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Acesso exclusivo</p>
                        
                        <GoogleLoginBtn />

                        <p className="text-xs text-gray-400 text-center mt-4">
                            Ao entrar, você concorda com nossos <br/> 
                            <a href="/privacyPolicy" className="text-emerald-600 hover:underline">Termos de Uso e Privacidade</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}