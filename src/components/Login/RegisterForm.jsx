"use client"

// biome-ignore assist/source/organizeImports: <>
import { auth, db } from "@/backend/firebase"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"
import { useState } from "react"
import {useAppRouter} from "@/utils/useAppRouter"
import { MdArrowForward, MdEmail, MdLock, MdPerson } from "react-icons/md"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePasswordToggle } from "@/utils/usePasswordToggle";


export default function RegisterForm() {
    const { showPassword, togglePassword, inputType } = usePasswordToggle()
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

            setSuccess("Conta criada!")
             onAuthStateChanged(auth, (user) => {
                if (user) {
                    router.goHome()
                }
            })

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
        <form onSubmit={handleRegister} onKeyDown={handleKeyDown} className="flex flex-col items-center gap-5 w-[90%] max-w-lg">
            <h1 className="text-emerald-600 font-bold text-4xl mb-6 tracking-wide">Crie sua Conta</h1>
            <div className="relative group w-full">
                <MdPerson className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="relative group w-full">
                <MdEmail className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="relative group w-full flex items-center">
                <MdLock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    type={inputType }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Senha"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                {showPassword ? <FaEye onClick={togglePassword} className="absolute right-4 text-gray-400 cursor-pointer text-xl"/> : <FaEyeSlash onClick={togglePassword} className="absolute right-4 text-gray-400 cursor-pointer text-xl"/> }
            </div>
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-green-600">{success}</span>}

            <button type="submit" className="mt-5 cursor-pointer w-[60%] max-w-sm bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-2.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 group">
                Criar
                <MdArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}
