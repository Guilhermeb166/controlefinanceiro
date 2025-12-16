"use client"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/backend/firebase"
import { useExpenses } from "@/context/AppContext"
import { MdAutorenew } from "react-icons/md"

export default function AuthLoader({ children }) {
    const [authLoading, setAuthLoading] = useState(true)
    const { expenses } = useExpenses()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, () => {
            setAuthLoading(false)
        })

        return () => unsub()
    }, [])

    const isLoading =
        authLoading ||
        (auth.currentUser && expenses === null)

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white">
                <MdAutorenew
                    size={55}
                    className="animate-spin text-emerald-600"
                />
            </div>
        )
    }

    return children
}
