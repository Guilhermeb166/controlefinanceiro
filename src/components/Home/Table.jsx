import { FaEdit, FaTrash } from "react-icons/fa"
import { formatCurrency } from "@/utils/FormatCurrency"
import { useState, useEffect } from "react"
import EditModal from './EditModal';
import { useExpenses } from "@/context/AppContext"
import AppSnackbar from "../AppSnackbar";
export default function Table({ expenses }) {
    const { removeExpense } = useExpenses()

    const [openPopup, setOpenPopup] = useState(false)
    const [selected, setSelected] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [editing, setEditing] = useState(null)

    function askDelete(item) {
        setSelected(item)
        setOpenPopup(true)
    }
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    async function confirmDelete() {
        if (!selected) return
        
        // Se for uma parcela projetada, o ID real da despesa está em expenseId
        const idToDelete = selected.tipo === "Crédito" ? selected.expenseId : selected.id
        
        if (!idToDelete) {
            alert("Não foi possível encontrar o ID da transação original para exclusão.")
            setOpenPopup(false)
            return
        }

        setOpenPopup(false)
        setSelected(null)
        await removeExpense(idToDelete)
    }

    useEffect(() => {
        if (openPopup) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [openPopup])

    function getCategoriaLabel(item) {
        if (item.subcategoria?.nome) {
            return `${item.categoria.nome} / ${item.subcategoria.nome}`
        }
        return item.categoria?.nome || "-"
    }

    function askEdit(item) {
        setEditing(item)
        setOpenEdit(true)
    }


    return (
        <>
            <div className="flex flex-col gap-3 mt-6 lg:hidden select-none">
                {(expenses ?? []).map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{item.data}</span>
                            <div className="flex items-center gap-6 text-2xl lg:text-lg">
                                <FaEdit
                                    className=" text-blue-600 hover:text-blue-800 cursor-pointer"
                                    onClick={() => askEdit(item)}
                                />
                                <FaTrash
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                    onClick={() => askDelete(item)}
                                />
                                
                            </div>
                        </div>

                        <h3 className="font-medium">{getCategoriaLabel(item)}</h3>

                        <span className="text-sm text-gray-500 tracking-wide">{item.observacao || 'Sem Observação' }</span>

                        <div className="flex justify-between items-center">
                            <span className="font-semibold">
                                {formatCurrency(item.valor)}
                            </span>
                            <span
                                className={`lg:text-sm text-md font-medium ${item.tipo === "Receita"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {item.tipo}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <table className="hidden lg:table max-w-[1150px] w-full mt-10 mx-auto border-separate border-spacing-y-2 select-none ">
                <thead>
                    <tr>
                        <th className="px-3 py-4 text-left tracking-[1px]">Data</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Categoria</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Observação</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Preço</th>
                        <th className="px-3 py-4 text-left tracking-[1px]">Tipo</th>
                        <th className="px-3 py-4 text-left tracking-[1px]"></th>
                        <th className="px-3 py-4 text-left tracking-[1px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {(expenses ?? []).map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className="text-gray-400 pl-3 py-4 bg-white rounded-l-lg">{item.data}</td>
                                <td className="text-gray-400 pl-3 py-4 bg-white">{getCategoriaLabel(item)}</td>
                                <td className="text-gray-400 pl-3 py-4 bg-white">
                                    {item.observacao ? (
                                        <p className="text-sm text-gray-500">
                                            {item.observacao}
                                        </p>
                                    ):  <p className="text-sm text-gray-500">
                                            Sem Observação
                                        </p>}
                                </td>
                                <td className="text-gray-400 pl-3 py-4 bg-white">{formatCurrency(item.valor)}</td>
                                <td className={`text-gray-400 pl-3 py-4 bg-white ${item.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>{item.tipo}</td>
                                <td className="text-blue-600 lg:px-3 py-4 bg-white ">
                                    <FaEdit className="  hover:text-blue-800 cursor-pointer text-xl" onClick={() => askEdit(item)}/>
                                </td>
                                <td className="text-red-600 lg:px-3 py-4 bg-white rounded-r-lg">
                                    <FaTrash className=" cursor-pointer text-xl hover:text-red-700" onClick={() => askDelete(item)} />
                                </td>
                                
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
                                onClick={() => setOpenPopup(false)}
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
            )}
            <EditModal
                isOpen={openEdit}
                setIsOpen={setOpenEdit}
                expense={editing}
                setSnackbar={setSnackbar}
            />
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            />
        </>
    )
}
