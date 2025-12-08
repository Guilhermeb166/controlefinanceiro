"use client"
import { useRouter } from "next/navigation"

export function useAppRouter() {
    
    const router = useRouter()

    return {
        goHome: () => router.push("/"),
        goLogin: () => router.push("/login"),
        goRegister: () => router.push("/register"),
        go: (path) => router.push(path),
        back: () => router.back(),
        replace: (path) => router.replace(path),
    }
}
