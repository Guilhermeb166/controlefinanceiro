'use client'
import { useState } from 'react';
import Modal from 'react-modal'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useExpenses } from '@/context/AppContext'
import { CATEGORIES } from '@/utils/categories';



export default function Model({ isOpen,setIsOpen, setSnackbar  }) {

    const { addExpense } = useExpenses();

    const [categoria, setCategoria] = useState(null)
    const [subcategoria, setSubcategoria] = useState(null)
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");


    const submitForm = (()=>{
        if(!valor || !tipo){
            alert("Os campos 'valor' e 'tipo' são obrigatórios, preencha todos por favor.")
            return;
        }

        if(!categoria){
            alert("Escolha uma categoria para a sua transação.")
            return
        }

        if (categoria.subcategorias.length > 0 && !subcategoria) {
            alert("Selecione uma subcategoria.")
            return
        }

        const data = new Date().toLocaleDateString()
        
        addExpense({
            observacao: descricao || "",
            valor: Number(valor),
            tipo,
            data,
            categoria: {
            id: categoria.id,
            nome: categoria.nome
            },
            subcategoria: subcategoria
            ? { id: subcategoria.id, nome: subcategoria.nome }
            : null
        })
        setSnackbar({
            open: true,
            message: "Transação criada com sucesso!",
            severity: "success",
        })
        setDescricao('')
        setValor('')
        setTipo('')
        setIsOpen(false)
    })
    return (
        <Modal
            isOpen={isOpen}
            overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center
            bg-gray-500/40 bg-opacity-80 backdrop-blur-sm"
            className="w-[90%] sm:w-full max-w-[400px] sm:max-w-lg bg-white p-4 sm:p-6 relative outline-none rounded-xl"
        >
            <button type="button"
                className="absolute right-2 top-1 sm:right-4 sm:top-4"
                onClick={()=>setIsOpen(!isOpen)}
            >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-2xl sm:text-3xl mb-4">Criar nova transação</h2>
            <div className='flex flex-col gap-5 mb-3'>
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
            <p>Tipo</p>
            <div className="flex gap-2 sm:gap-4 mt-1 justify-between">
                <button
                type="button"
                className={`flex-1 p-3 rounded bg-emerald-600 text-white cursor-pointer max-w-[50%] w-full hover:bg-emerald-800 transition-all duration-300
                    ${tipo ==='Receita' ? "bg-emerald-800   shadow-emerald-800 shadow-sm" 
                    : "bg-emerald-600" }`}
                onClick={()=> setTipo("Receita")}
                >Receita</button>
                <button
                type="button"
                className={`flex-1 p-3 rounded bg-red-600 text-white cursor-pointer max-w-[50%] w-full hover:bg-red-800 transition-all duration-300
                    ${tipo ==='Despesa' || tipo === 'Crédito' || tipo ==='Débito/Pix' ? "bg-red-800 shadow-red-800 shadow-sm " : "bg-red-600"}`}
                onClick={()=> setTipo("Despesa")}
                >Despesa</button>
                
            </div>
            {(tipo === 'Despesa' || tipo === 'Crédito' || tipo === 'Débito/Pix') && (
                <div className='flex justify-between gap-4'>
                    <button type="button"
                        className={`flex-1 p-3 rounded bg-sky-700 text-white text-md mt-4 max-w-[50%] cursor-pointer
                            ${tipo === 'Crédito' ? "bg-sky-900":"bg-sky-700"}`}
                        onClick={()=> setTipo("Crédito")}
                    >Crédito</button>
                    <button type="button"
                        className={`flex-1 p-3 rounded bg-sky-700 text-white text-md mt-4 max-w-[50%] cursor-pointer
                            ${tipo === 'Débito/Pix' ? "bg-sky-900":"bg-sky-700"}`}
                        onClick={()=> setTipo("Débito/Pix")}
                    >Débito/Pix</button>
                </div>
            )}
            <label className="flex flex-col my-2">
                Observação
                <input
                    type="text"
                    className="py-2 px-3 outline-none border border-gray-300 mt-1 rounded"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Conta de luz, mercado, aluguel..."
                />
            </label>
            <label className="flex flex-col my-2">
                Valor
                <p className="flex py-2 px-3 outline-none border border-gray-300 mt-1 rounded">
                    <input
                        className="outline-none pl-2 w-full"
                        type="text"
                        value={valor}
                        onChange={(e) => {
                            let raw = e.target.value;


                            raw = raw.replace(/[^\d.,]/g, "");


                            raw = raw.replace(",", ".");

                    
                            raw = raw.replace(/(\..*)\./g, "$1");

                            setValor(raw)
                        }}
                        placeholder="0,00"
                    />
                    
                </p>
            </label>
            <button
                type="button"
                className="p-2 bg-green-500 rounded text-white mt-4 cursor-pointer hover:bg-green-700 transition-all duration-300"
                onClick={()=> submitForm()}
            >
                Nova Transação
            </button>
        </Modal>
    )
}
