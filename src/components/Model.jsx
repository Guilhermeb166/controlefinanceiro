'use client'
import { useState } from 'react';
import Modal from 'react-modal'
import { useExpenses } from '@/context/AppContext'


export default function Model({ isOpen,setIsOpen }) {

    const { addExpense } = useExpenses();
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");

    const submitForm = (()=>{
        if(!descricao || !valor || !tipo){
            alert("Todos os campos são obrigatórios, preencha todos por favor.")
            return;
        }

        const data = new Date().toLocaleDateString()
        
        addExpense({
            id: crypto.randomUUID(),
            descricao,
            valor: Number(valor),
            tipo,
            data
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
            className="w-full max-w-lg bg-white p-6 relative outline-none rounded-xl"
        >
            <button type="button"
                className="absolute right-4 top-4"
                onClick={()=>setIsOpen(!isOpen)}
            >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-3xl mb-4">Criar nova transação</h2>
            <label className="flex flex-col mb-2">
                Descrição
                <input
                    type="text"
                    className="py-2 px-3 outline-none border border-gray-300 mt-1 rounded"
                    value={descricao}
                    onChange={(e)=> setDescricao(e.target.value)}
                    required
                />
            </label>
            <p>Tipo</p>
            <div className="flex gap-4 mt-1 justify-between">
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
                    ${tipo === 'Despesa' ? "bg-red-800 shadow-red-800 shadow-sm" : "bg-red-600"}`}
                onClick={()=> setTipo("Despesa")}
                >Despesa</button>
                
            </div>
            {tipo ==='Despesa' || tipo === 'Crédito' || tipo ==='Débito/Pix' ?(
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
                ) : ''}
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
