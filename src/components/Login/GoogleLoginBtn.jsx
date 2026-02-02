/**
 * Componente de botão para login exclusivo com Google.
 */
"use client"

import { auth, db, googleProvider } from "@/backend/firebase"
import { signInWithPopup } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useState } from "react"
import { useAppRouter } from "@/utils/useAppRouter"
import { FcGoogle } from "react-icons/fc"

export default function GoogleLoginBtn() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useAppRouter()

    async function handleGoogleLogin(){
        setLoading(true)
        setError("")

        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user

            //verificar se o usuário já existe no banco
            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)

            if(!userSnap.exists()) {
                //se for um user novo, cria o doc no banco
                await setDoc(userRef, {
                    nname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                    authMethod: "google"
                })
            }

            router.goHome()
        } catch (err) {
            console.error(err)
            if (err.code === 'auth/popup-closed-by-user') {
                setError("O login foi cancelado.")
            } else {
                setError("Erro ao entrar com Google. Tente novamente.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50"
            >
                <FcGoogle className="text-2xl " />
                {loading ? "Conectando..." : "Entrar com Google"}
            </button>
            
            {error && (
                <span className="text-red-500 text-sm text-center">{error}</span>
            )}
        </div>
    )
}
