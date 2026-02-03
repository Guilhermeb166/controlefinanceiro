/**
 * Componente principal da página do Cofrinho que gerencia depósitos, retiradas e histórico.
 * Gestão exclusiva através desta página com coleção dedicada no Firebase.
 */
"use client"

import { useState, useMemo } from "react"
import { useExpenses } from "@/context/AppContext"
import { formatCurrency } from "@/utils/FormatCurrency"
import PiggyBankHistory from "./PiggyBankHistory"
import WithdrawalModal from "./WithdrawalModal"
import DepositModal from "./DepositModal"
import AppSnackbar from "@/components/AppSnackbar"

export default function PiggyBankMain() {
    const { piggyBank, addPiggyBankTransaction, removePiggyBankTransaction } = useExpenses()

    const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState(null)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    // Calcular saldo a partir das transações do cofrinho
    const piggyBankData = useMemo(() => {
        if (!piggyBank || piggyBank.length === 0) {
            return {
                balance: 0,
                deposits: 0,
                withdrawals: 0,
                transactions: []
            }
        }

        let balance = 0
        let deposits = 0
        let withdrawals = 0

        piggyBank.forEach(transaction => {
            if (transaction.tipo === "Depósito") {
                balance += transaction.valor
                deposits += transaction.valor
            } else if (transaction.tipo === "Retirada") {
                balance -= transaction.valor
                withdrawals += transaction.valor
            }
        })

        return {
            balance: Math.max(0, balance),
            deposits,
            withdrawals,
            transactions: [...piggyBank].sort((a, b) => {
                const dateA = new Date(a.data.split("/").reverse().join("-"))
                const dateB = new Date(b.data.split("/").reverse().join("-"))
                return dateB - dateA
            })
        }
    }, [piggyBank])

    const handleDeposit = async (data) => {
        try {
            await addPiggyBankTransaction({
                observacao: data.descricao || "Depósito no Cofrinho",
                valor: data.valor,
                tipo: "Depósito",
                data: data.data,
            })

            setSnackbar({
                open: true,
                message: `Depósito de ${formatCurrency(data.valor)} realizado com sucesso!`,
                severity: "success",
            })

            setIsDepositOpen(false)
        } catch (error) {
            console.error("Erro ao depositar no cofrinho:", error)
            setSnackbar({
                open: true,
                message: "Erro ao depositar no cofrinho. Tente novamente.",
                severity: "error",
            })
        }
    }

    const handleWithdrawal = async (data) => {
        try {
            await addPiggyBankTransaction({
                observacao: data.descricao || "Retirada do Cofrinho",
                valor: data.valor,
                tipo: "Retirada",
                data: data.data,
            })

            setSnackbar({
                open: true,
                message: `Retirada de ${formatCurrency(data.valor)} realizada com sucesso!`,
                severity: "success",
            })

            setIsWithdrawalOpen(false)
        } catch (error) {
            console.error("Erro ao retirar do cofrinho:", error)
            setSnackbar({
                open: true,
                message: "Erro ao retirar do cofrinho. Tente novamente.",
                severity: "error",
            })
        }
    }

    const handleDeleteTransaction = async (transactionId) => {
        if (window.confirm("Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.")) {
            try {
                await removePiggyBankTransaction(transactionId)
                setSnackbar({
                    open: true,
                    message: "Transação deletada com sucesso!",
                    severity: "success",
                })
            } catch (error) {
                console.error("Erro ao deletar transação:", error)
                setSnackbar({
                    open: true,
                    message: "Erro ao deletar transação. Tente novamente.",
                    severity: "error",
                })
            }
        }
    }

    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction)
        // Lógica de edição pode ser implementada aqui
    }

    return (
        <>
            <section className="min-h-30 lg:h-40 bg-emerald-600 py-8 px-4">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:flex-wrap items-center gap-8 md:justify-between relative px-5">
                    <h1 className="text-white text-3xl lg:text-4xl font-semibold">
                        Meu Cofrinho
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap sm:flex-row justify-center">
                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-md p-2 bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 transition-all duration-400 hover:-translate-y-0.5"
                            onClick={() => setIsDepositOpen(true)}
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Depositar
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-md p-2 bg-red-500 text-white cursor-pointer hover:bg-red-700 transition-all duration-400 hover:-translate-y-0.5"
                            onClick={() => setIsWithdrawalOpen(true)}
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Retirar
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-[1150px] mx-auto mt-4 lg:mt-0 px-4 lg:px-1">
                <div className="w-full mx-auto gap-4 lg:-mt-[60px] flex flex-col lg:flex-row">
                    <div className="flex flex-col flex-1 bg-emerald-50 rounded border-2 border-emerald-200 shadow-md shadow-emerald-300 p-6 justify-between w-full">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                                    Saldo do Cofrinho
                                </p>
                                <h1 className="text-4xl sm:text-5xl font-bold text-emerald-700 mt-2">
                                    {formatCurrency(piggyBankData.balance)}
                                </h1>
                            </div>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-12 sm:size-14 text-emerald-600 opacity-20">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-200">
                            <div>
                                <p className="text-xs font-semibold text-emerald-600 uppercase">
                                    Total Depositado
                                </p>
                                <p className="text-2xl font-bold text-emerald-700 mt-1">
                                    {formatCurrency(piggyBankData.deposits)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-red-600 uppercase">
                                    Total Retirado
                                </p>
                                <p className="text-2xl font-bold text-red-700 mt-1">
                                    {formatCurrency(piggyBankData.withdrawals)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 mb-16">
                    <PiggyBankHistory
                        transactions={piggyBankData.transactions}
                        onEdit={handleEditTransaction}
                        onDelete={handleDeleteTransaction}
                    />
                </div>
            </section>

            <DepositModal
                isOpen={isDepositOpen}
                onClose={() => setIsDepositOpen(false)}
                onSubmit={handleDeposit}
            />

            <WithdrawalModal
                isOpen={isWithdrawalOpen}
                onClose={() => setIsWithdrawalOpen(false)}
                onSubmit={handleWithdrawal}
                availableBalance={piggyBankData.balance}
            />

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            />
        </>
    )
}
