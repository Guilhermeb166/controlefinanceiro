"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { MdEmail, MdLock, MdPerson, MdLogout, MdArrowForward } from "react-icons/md"

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
    <form className="space-y-5" onKeyDown={handleKeyDown}>
      <div className="relative group">
        <MdEmail className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="relative group">
        <MdLock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-gray-400"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
          {error}
        </div>
      )}

      <button
      type="button"
        onClick={handleLogin}
        className="cursor-pointer w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 group"
      >
        Entrar
        <MdArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  )
}
