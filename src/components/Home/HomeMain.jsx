/**
 * Componente principal da página inicial com design dark moderno
 */
'use client'

import UserAuthButton from "@/components/UserAuthButton/UserAuthButton"
import { useState, useMemo } from "react"
import ImportExtract from "@/components/Home/ImportExtract"
import Model from "@/components/Home/Model"
import { useExpenses } from "@/context/AppContext"
import { calculateUsedLimit } from "@/utils/credit/calculateUsedLimit"
import AppSnackbar from "@/components/AppSnackbar"
import DashboardCards from "./DashboardCards"
import CashflowChart from "./CashflowChart"
import RecentTransactions from "./RecentTransactions"
import { Plus } from 'lucide-react'

export default function HomeMain() {
    const { expenses, creditCards } = useExpenses()

    const [isOpen, setIsOpen] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    // Usar mês e ano atuais por padrão
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Processar despesas para incluir parcelas de crédito
    const processedExpenses = useMemo(() => {
        let data = [...(expenses ?? [])]

        // Remover transações de crédito da lista principal
        data = data.filter(e => e.tipo !== 'Crédito')

        // Projetar parcelas de crédito
        const projectedInstallments = []

        creditCards.forEach(card => {
            if (card.parcelas) {
                card.parcelas.forEach(parcela => {
                    const [pYear, pMonth, pDay] = parcela.purchaseDate.split("-").map(Number)
                    const purchaseDate = new Date(pYear, pMonth - 1, pDay)
                    const closingDay = Number(card.closingDay) || 1

                    for (let i = 0; i < parcela.installments; i++) {
                        const invoiceDate = new Date(purchaseDate)
                        invoiceDate.setMonth(invoiceDate.getMonth() + i)

                        if (purchaseDate.getDate() > closingDay) {
                            invoiceDate.setMonth(invoiceDate.getMonth() + 1)
                        }

                        const invMonth = invoiceDate.getMonth() + 1
                        const invYear = invoiceDate.getFullYear()

                        let cleanDescription = parcela.description || 'Sem Observação'
                        cleanDescription = cleanDescription.replace(/\s*\(\d+\/\d+\)\s*$/, '')

                        projectedInstallments.push({
                            id: `${parcela.id}-inst-${i}`,
                            expenseId: parcela.expenseId,
                            data: `${String(invoiceDate.getDate()).padStart(2, '0')}/${String(invMonth).padStart(2, '0')}/${invYear}`,
                            valor: parcela.installmentValue,
                            tipo: "Crédito",
                            categoria: parcela.categoria || { id: "parcelaCredito", nome: "Parcela do Cartão de Crédito" },
                            subcategoria: parcela.subcategoria || null,
                            observacao: `${cleanDescription} (${i + 1}/${parcela.installments})`,
                            cardId: card.id,
                            bank: card.bank,
                            installments: parcela.installments,
                            totalValue: parcela.totalValue,
                            purchaseDate: parcela.purchaseDate
                        })
                    }
                })
            }
        })

        // Unificar despesas
        data = [...data, ...projectedInstallments]

        // Ordenar por data (mais recentes primeiro)
        data.sort((a, b) => {
            const dateA = new Date((a.data || "").split("/").reverse().join("-"))
            const dateB = new Date((b.data || "").split("/").reverse().join("-"))
            return dateB - dateA
        })

        return data
    }, [expenses, creditCards])

    // Calcular resumo financeiro
    const summary = useMemo(() => {
        const baseSummary = (processedExpenses ?? []).reduce(
            (acc, item) => {
                if (item.tipo === "Receita") {
                    acc.entradas += item.valor
                    acc.total += item.valor
                } else if (item.tipo !== "Crédito") {
                    acc.saidas += item.valor
                    acc.total -= item.valor
                }
                return acc
            },
            { entradas: 0, saidas: 0, total: 0 }
        )

        // Adicionar gastos com cartão de crédito
        let creditCardOutflow = 0
        if (creditCards && creditCards.length > 0) {
            creditCards.forEach(card => {
                creditCardOutflow += calculateUsedLimit({
                    expenses,
                    creditCard: card,
                    month: currentMonth,
                    year: currentYear
                })
            })
        }

        baseSummary.saidas += creditCardOutflow
        baseSummary.total -= creditCardOutflow

        return baseSummary
    }, [processedExpenses, creditCards, expenses, currentMonth, currentYear])

    return (
        <>
            <Model
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setSnackbar={setSnackbar}
            />

            {/* Header com fundo dark */}
            <section className="bg-zinc-950 border-b border-zinc-800 py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-white text-3xl lg:text-4xl font-bold mb-1">
                            Dashboard Financeiro
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Acompanhe suas receitas e despesas
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                        <ImportExtract />
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-linear-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 backdrop-blur-sm border border-emerald-500/20 cursor-pointer hover:shadow-emerald-700  hover:shadow-sm hover:-translate-y-0.5 transition-transform duration-300 font-medium"
                            onClick={() => setIsOpen(true)}
                        >
                            <Plus className="w-5 h-5" />
                            Nova Transação
                        </button>
                        <UserAuthButton />
                    </div>
                </div>
            </section>

            {/* Conteúdo principal */}
            <section className="min-h-screen bg-zinc-950 px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Cards de resumo */}
                    <DashboardCards summary={summary} />

                    {/* Gráfico de cashflow */}
                    <CashflowChart expenses={processedExpenses} />

                    {/* Transações recentes */}
                    <RecentTransactions expenses={processedExpenses} />
                </div>
            </section>

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            />
        </>
    )
}
