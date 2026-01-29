/**
 * Botão de autenticação que alterna entre o botão de login e o dropdown do usuário logado.
 */
'use client'
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/backend/firebase"
import UserDropdown from "@/components/Home/UserDropdown"
import { useAppRouter } from "@/utils/useAppRouter"

export default function UserAuthButton() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useAppRouter()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        return () => unsub()
    }, [])

    if (loading) return null

    // 🔴 NÃO LOGADO
    if (!user) {
        return (
            <button
                type="button"
                className="cursor-pointer flex items-center gap-2 rounded-md p-2 bg-emerald-500 text-white hover:bg-emerald-700 transition-all"
                onClick={() => router.goLogin()}
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
                Entrar
            </button>
        )
    }

    // 🟢 LOGADO
    return <UserDropdown user={user} />
}
