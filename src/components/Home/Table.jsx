/**
 * Tabela de exibição das transações filtradas com tema escuro
 */

import { FaEdit, FaTrash } from "react-icons/fa"
import { formatCurrency } from "@/utils/FormatCurrency"
import { useState, useEffect } from "react"
import EditModal from './EditModal'
import { useExpenses } from "@/context/AppContext"
import AppSnackbar from "../AppSnackbar"

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
        
        const idToDelete = selected.tipo === "Crédito" ? selected.expenseId : selected.id
        
        if (!idToDelete) {
            setSnackbar({
                open: true,
                message: "Não foi possível encontrar o ID da transação original para exclusão.",
                severity: "error"
            })
            setOpenPopup(false)
            return
        }

        try {
            setOpenPopup(false)
            setSelected(null)
            await removeExpense(idToDelete)
            setSnackbar({
                open: true,
                message: "Transação excluída com sucesso!",
                severity: "success"
            })
        } catch (error) {
            console.error("Erro ao excluir:", error)
            setSnackbar({
                open: true,
                message: "Erro ao excluir transação.",
                severity: "error"
            })
        }
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
            {/* Mobile View */}
            <div className="flex flex-col gap-3 mt-6 lg:hidden select-none px-4">
                {(expenses ?? []).map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{item.data}</span>
                            <div className="flex items-center gap-6 text-2xl">
                                <FaEdit
                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    onClick={() => askEdit(item)}
                                />
                                <FaTrash
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                    onClick={() => askDelete(item)}
                                />
                            </div>
                        </div>

                        <h3 className="font-medium">{getCategoriaLabel(item)}</h3>

                        <span className="text-sm text-gray-500 tracking-wide">{item.observacao || 'Sem Observação'}</span>

                        <div className="flex justify-between items-center">
                            <span className="font-semibold">
                                {formatCurrency(item.valor)}
                            </span>
                            <span
                                className={`text-md font-medium ${item.tipo === "Receita"
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

            {/* Desktop View - Tema Escuro */}
            <div className="hidden lg:block px-6 pb-6">
                <table className="w-full border-separate border-spacing-y-2 select-none">
                    <thead>
                        <tr>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium">Data</th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium">Categoria</th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium">Observação</th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium">Preço</th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium">Tipo</th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium"></th>
                            <th className="px-4 py-4 text-left tracking-[1px] text-gray-400 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(expenses ?? []).map((item) => {
                            return (
                                <tr key={item.id} className="group">
                                    <td className="text-gray-300 px-4 py-4 bg-[#0F1419] rounded-l-lg group-hover:bg-[#0c1014] transition-colors">
                                        {item.data}
                                    </td>
                                    <td className="text-gray-300 px-4 py-4 bg-[#0F1419] group-hover:bg-[#0c1014] transition-colors">
                                        {getCategoriaLabel(item)}
                                    </td>
                                    <td className="text-gray-300 px-4 py-4 bg-[#0F1419] group-hover:bg-[#0c1014] transition-colors">
                                        {item.observacao ? (
                                            <p className="text-sm text-gray-400">
                                                {item.observacao}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Sem Observação
                                            </p>
                                        )}
                                    </td>
                                    <td className="text-white font-semibold px-4 py-4 bg-[#0F1419] group-hover:bg-[#0c1014] transition-colors">
                                        {formatCurrency(item.valor)}
                                    </td>
                                    <td className={`px-4 py-4 bg-[#0F1419] group-hover:bg-[#0c1014] transition-colors font-medium ${item.tipo === 'Receita' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {item.tipo}
                                    </td>
                                    <td className="text-blue-500 px-4 py-4 bg-[#0F1419] group-hover:bg-[#0c1014] transition-colors">
                                        <FaEdit className="hover:text-blue-400 cursor-pointer text-xl transition-colors" onClick={() => askEdit(item)}/>
                                    </td>
                                    <td className="text-red-500 px-4 py-4 bg-[#0F1419] rounded-r-lg group-hover:bg-[#0c1014] transition-colors">
                                        <FaTrash className="cursor-pointer text-xl hover:text-red-400 transition-colors" onClick={() => askDelete(item)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {openPopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-[#1a1f2e] p-6 rounded-lg shadow-lg w-80 border border-gray-800">
                        <h2 className="text-lg font-semibold mb-3 text-white">Confirmar Exclusão</h2>
                        <p className="text-gray-300 mb-4">
                            Tem certeza que deseja excluir esse registro?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                                onClick={() => setOpenPopup(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
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
