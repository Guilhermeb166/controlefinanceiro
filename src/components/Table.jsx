import { FaTrash } from "react-icons/fa"
import { useExpenses } from '@/context/AppContext'
import { formatCurrency } from "@/utils/FormatCurrency"

export default function Table() {

    const { expenses, removeExpense } = useExpenses()


    return (
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
                {expenses.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td className="text-gray-400 pl-3 py-4 bg-white rounded-l-lg">{item.data}</td>
                            <td className="text-gray-400 pl-3 py-4 bg-white">{item.descricao}</td>
                            <td className="text-gray-400 pl-3 py-4 bg-white">{formatCurrency(item.valor)}</td>
                            <td className={`text-gray-400 pl-3 py-4 bg-white ${item.tipo==='Receita' ? 'text-green-600' : 'text-red-600'}`}>{item.tipo}</td>
                            <td className="text-red-600 px-1 py-4 bg-white rounded-r-lg"><FaTrash className=" cursor-pointer text-xl" onClick={()=>removeExpense(item.id)}/></td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    )
}
