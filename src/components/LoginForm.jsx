"use client"
import { useState } from "react"
import { signIn } from "@/lib/auth"


export default function LoginForm() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(e) {
        e.preventDefault()
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
        })
        
        if (res?.error) setError(" Login inválido")

    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleLogin(e)
        }
    }

    return (
        <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="bg-white p-6 rounded-lg shadow-md w-80 flex-col">
            <h1 className="text-2xl mb-4 font-semibold">Login</h1>

            <input
                placeholder="Email"
                className="border p-2 w-full mb-3"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder="Senha"
                type="password"
                className="border p-2 w-full mb-3"
                onChange={e => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button type="submit" className="bg-emerald-600 text-white w-full p-2 rounded">
                Entrar
            </button>
        </form>
    )
}
