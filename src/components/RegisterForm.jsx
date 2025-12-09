"use client"

// biome-ignore assist/source/organizeImports: <>
import { auth, db } from "@/backend/firebase"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import {useAppRouter} from "@/utils/useAppRouter"

export default function RegisterForm() {
    const router = useAppRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    

    async function handleRegister(e) {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!name || !email || password.length < 6) {
            setError("Preencha todos os campos (senha ≥ 6).")
            return
        }

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(cred.user, {
                displayName: name.trim(),
            })

            await setDoc(doc(db, "users", cred.user.uid), {
                name: name.trim(),
                email,
                createdAt: new Date(),
            })

            setSuccess("Conta criada! Agora faça login.")
            router.goHome()
        } catch (err) {
            console.error(err)
            setError("Erro ao criar conta: ")
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleRegister(e)
        }
    }
 
    return (
        <form onSubmit={handleRegister} onKeyDown={handleKeyDown} className="bg-white p-6 rounded-lg shadow-md w-80 flex-col">
            <h1 className="text-2xl mb-4 font-semibold">Crie sua Conta</h1>
            <input
                className="border p-2 w-full mb-3"
                placeholder="Seu nome"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input
                type="password"
                className="border p-2 w-full mb-3"
                placeholder="Senha"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-green-600">{success}</span>}

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded">
                Criar
            </button>
        </form>
    )
}
