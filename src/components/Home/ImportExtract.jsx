/**
 * Componente para importação de extratos bancários via arquivo (PDF ou Imagem), com processamento automático de transações.
 */
"use client"

import { useRef, useState } from "react"

import { useExpenses } from "@/context/AppContext"
import { processExtract } from "@/utils/scanner/processExtract"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import AppSnackbar from "../AppSnackbar"
import { CATEGORIES } from '@/utils/categories';
import { useRouter } from 'next/navigation'


export default function ImportExtract() {
    const router = useRouter()
    const {addExpense} = useExpenses()

    const [categoria, setCategoria] = useState(null)
    const [subcategoria, setSubcategoria] = useState(null)
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })
    const [step, setStep] = useState("idle")
    const [file, setFile] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [observacao, setObservacao] = useState("")
    const fileInputRef = useRef(null)

    async function handleImageUpload(e) {
        const f = e.target.files[0]
        if (!f) return

        setFile(f)
        setStep("chooseType")

    }

    async function process(){
        if (!file || !selectedType) return

        setLoading(true)
        setStep("processing")

        try {
             if(!categoria){
                alert("Escolha uma categoria para a sua transação.")
                return
            }

            if (categoria.subcategorias.length > 0 && !subcategoria) {
                alert("Selecione uma subcategoria.")
                return
            }

            const transacoes = []
            let valorTotal = 0

            await processExtract(file, async (transacao) => {
                console.log("TRANSAÇÃO DETECTADA:", transacao)

                // Armazenar transação para possível uso posterior
                transacoes.push(transacao)
                
                // Acumular valor total
                valorTotal += Number(transacao.valor)

                const id = await addExpense({
                    ...transacao,
                    tipo: selectedType,
                    categoria: {
                        id: categoria.id,
                        nome: categoria.nome,
                    },
                    subcategoria: subcategoria
                    ? {
                        id: subcategoria.id,
                        nome: subcategoria.nome,
                        }
                    : null,
                    observacao: observacao || "",
                })

                if (selectedType === 'Despesa Crédito') {
                    router.push(`/plannedCredit?from=expense&value=${valorTotal}&expenseId=${id}`)
                    return
                }
            })

            setSnackbar({
                open: true,
                message: "Transações importadas com sucesso!",
                severity: "success",
            })

            
            
            
        } catch (err) {
            console.error(err)
            setSnackbar({
                open: true,
                message: "Erro ao processar o arquivo",
                severity: "error",
            })
        } finally {
            reset()
        }
    }

    function reset(){
        setLoading(false)
        setStep("idle")
        setFile(null)
        setSelectedType(null)
        setCategoria(null)
        setSubcategoria(null)
        setObservacao("")

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
                    accept="image/*,application/pdf"
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
                        <div className='flex flex-col gap-5 mb-6'>
                            <FormControl fullWidth size="small" className="my-2"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#d1d5dc",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#d1d5dc",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#009966",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        "&.Mui-focused": {
                                            color: "#009966",
                                        },
                                    },
                                }}
                            >
                                <InputLabel>Categoria</InputLabel>
                                <Select
                                    value={categoria?.id || ""}
                                    label="Categoria"
                                    onChange={(e) => {
                                    const cat = CATEGORIES.find(c => c.id === e.target.value)
                                    setCategoria(cat)
                                    setSubcategoria(null)
                                    }}
                                >
                                    {CATEGORIES.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {categoria?.subcategorias?.length > 0 && (
                                <FormControl fullWidth size="small" className="my-2"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "#d1d5dc",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#d1d5dc",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#009966",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "#009966",
                                            },
                                        },
                                    }}
                                >
                                    <InputLabel>Subcategoria</InputLabel>
                                    <Select
                                    value={subcategoria?.id || ""}
                                    label="Subcategoria"
                                    onChange={(e) => {
                                        const sub = categoria.subcategorias.find(
                                        s => s.id === e.target.value
                                        )
                                        setSubcategoria(sub)
                                    }}
                                    >
                                    {categoria.subcategorias.map(sub => (
                                        <MenuItem key={sub.id} value={sub.id}>
                                        {sub.nome}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            )}
                        </div>
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
                            <input
                                type="text"
                                className="py-2 px-3 outline-none border border-gray-300 mt-1 rounded"
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                placeholder="Observação"
                            />
                            <div className="flex items-center justify-between w-full gap-3 mt-5">
                                <button
                                    type="button"
                                    disabled={!selectedType}
                                    onClick={process}
                                    className={`
                                         px-4 py-2 rounded text-white w-full
                                        ${selectedType
                                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                        : "bg-gray-300 cursor-not-allowed"}
                                    `}
                                    >
                                     {loading ? "Processando..." : "Pronto"}
                                </button>
                                <button
                                    type="button"
                                    className="w-full cursor-pointer px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    onClick={reset}
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
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            />
        </div>
    )
}
