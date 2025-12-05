"use client"
import { useState } from "react"
import { useExpenses } from "@/context/AppContext"
import { extractFromImage } from "@/utils/extractFromImage"

export default function ImportExtract() {

    const {addExpense} = useExpenses()
    const [loading, setLoading] = useState(false)

    async function handleImageUpload(e) {
        const file = e.target.files[0]
        if (!file) return

        setLoading(true)
        await extractFromImage(file, (transacao)=> addExpense(transacao))

        setLoading(false)
        alert("Transações importadas com sucesso!")
    }

    return (
        <div>
            <label className="flex items-center gap-1 rounded-md p-2 bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 transition-all duration-400 hover:-translate-y-0.5">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden cursor-pointer"
                />
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
                        d="M12 16.5v-9m0 0-3 3m3-3 3 3M4.5 12a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0Z"
                    />
                </svg>
                Importar Extrato
            </label>
            {loading && (
                <p className="text-sm text-gray-600 mt-2">Lendo imagem...</p>
            )}
        </div>
    )
}
