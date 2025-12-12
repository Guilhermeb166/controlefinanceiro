import { FaTrash } from "react-icons/fa"
import { useExpenses } from '@/context/AppContext'
import { formatCurrency } from "@/utils/FormatCurrency"
import { useState, useEffect } from "react"

export default function Table() {

    const { expenses, removeExpense } = useExpenses()
    const [ openPopup, setOpenPopup] = useState(false)
    const [ selected, setSelected ] = useState(null)

    function askDelete (item) {
        setSelected(item)
        setOpenPopup(true)
    }

    async function confirmDelete() {
        if (!selected?.id) return
        const id = selected.id
        
        setOpenPopup(false)
        setSelected(null)
        await removeExpense(id)
    }

    useEffect(()=>{
        if (openPopup) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [openPopup])


    return (
        <>
            <table className="max-w-5xl w-full mt-10 border-separate border-spacing-1 border-spacing-x-0">
                <thead>
                    <tr>
                        <th className="px-3 py-4 text-left tracking-[1px]">Data</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Descrição</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Preço</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {(expenses ?? []).map((item)=> {
                        return(
                            <tr key={item.id}>
                                <td className="text-gray-400 pl-3 py-4 bg-white rounded-l-lg">{item.data}</td>
                                <td className="text-gray-400 pl-3 py-4 bg-white">{item.descricao}</td>
                                <td className="text-gray-400 pl-3 py-4 bg-white">{formatCurrency(item.valor)}</td>
                                <td className={`text-gray-400 pl-3 py-4 bg-white ${item.tipo==='Receita' ? 'text-green-600' : 'text-red-600'}`}>{item.tipo}</td>
                                <td className="text-red-600 px-1 py-4 bg-white rounded-r-lg"><FaTrash className=" cursor-pointer text-xl hover:text-red-700" onClick={()=>askDelete(item)}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {openPopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-3">Confirmar Exclusão</h2>
                        <p className="text-gray-700 mb-4">
                            Tem certeza que deseja excluir esse registro?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={()=> setOpenPopup(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                onClick={confirmDelete}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            ) }
        </>
    )
}
