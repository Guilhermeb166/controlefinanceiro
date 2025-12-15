"use client"
import { useState, useRef } from "react"
import { useExpenses } from "@/context/AppContext"
import { extractFromImage } from "@/utils/extractFromImage"

export default function ImportExtract() {

    const {addExpense} = useExpenses()
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState("inactive")
    const [file, setFile] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const fileInputRef = useRef(null)

    async function handleImageUpload(e) {
        const f = e.target.files[0]
        if (!f) return

        setFile(f)
        setStep("chooseType")

    }

    async function processExtract(){
        if (!file || !selectedType) return

        setLoading(true)
        setStep("processing")

        await extractFromImage(file, (transacao)=>
            addExpense({
                ...transacao,
                tipo: selectedType
            })
        )

        setLoading(false)
        setStep("idle")
        setFile(null)
        setSelectedType(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        alert("Transações importadas com sucesso!")
    }

    function cancel(){
        setStep("idle")
        setFile(null)
        setSelectedType(null)

        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    function isSelected(type) {
        return selectedType === type
    }

    return (
        <div>
            <label className="flex items-center gap-1 rounded-md p-2 bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 transition-all duration-400 hover:-translate-y-0.5">
                <input
                    ref={fileInputRef}
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
            {step === "chooseType" && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-100">
                        <h2 className="text-lg font-semibold mb-4">Selecione o tipo de transação</h2>

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                className={`cursor-pointer px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700
                                    ${isSelected("Receita")
                                    ? "border-emerald-900 ring-2 ring-emerald-800 "
                                    : "border-gray-300 "}`}
                                onClick={() => setSelectedType("Receita")}
                            >
                                Receita
                            </button>

                            <div className="flex items-center justify-between w-full gap-3">
                                <button
                                    type="button"
                                    className= {`w-full cursor-pointer px-2 py-2 rounded bg-red-600 text-white hover:bg-red-700
                                     ${isSelected("Despesa Crédito")
                                        ? "border-red-800 ring-2 ring-red-800 "
                                        : "border-gray-300 "}
                                    `}
                                    onClick={() => setSelectedType("Despesa Crédito")}
                                >
                                    Despesa no Crédito
                                </button>
                                <button
                                    type="button"
                                    className={`w-full cursor-pointer px-2 py-2 rounded bg-red-600 text-white hover:bg-red-700
                                        ${isSelected("Despesa Débito/Pix")
                                            ? "border-red-800 ring-2 ring-red-800 "
                                            : "border-gray-300 "}
                                        `}
                                    onClick={() => setSelectedType("Despesa Débito/Pix")}
                                >
                                    Despesa Débito / Pix
                                </button>
                            </div>
                            <div className="flex items-center justify-between w-full gap-3 mt-5">
                                <button
                                    type="button"
                                    disabled={!selectedType}
                                    onClick={processExtract}
                                    className={`
                                         px-4 py-2 rounded text-white w-full
                                        ${selectedType
                                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                        : "bg-gray-300 cursor-not-allowed"}
                                    `}
                                    >
                                    Pronto
                                </button>
                                <button
                                    type="button"
                                    className="w-full cursor-pointer px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    onClick={cancel}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === "processing" && (
                <p className="text-sm text-gray-600 mt-2">Lendo imagem...</p>
            )}
        </div>
    )
}
