/**
 * Página completa de transações com tabela e controles de filtro
 */
'use client'

import { useState, useMemo } from "react"
import { useExpenses } from "@/context/AppContext"
import { formatCurrency } from "@/utils/FormatCurrency"
import { calculateUsedLimit } from "@/utils/credit/calculateUsedLimit"
import Table from "@/components/Home/Table"
import ExpensesControls from "@/components/ExpensesControls/ExpensesControls"
import AppSnackbar from "@/components/AppSnackbar"

export default function TransactionsPage() {
    const { expenses, creditCards } = useExpenses()

    const [sortBy, setSortBy] = useState("date-desc")
    const [filters, setFilters] = useState({
        tipo: "all",
        month: String(new Date().getMonth() + 1),
        year: String(new Date().getFullYear()),
        cardId: "all"
    })
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })
    const [appliedFilters, setAppliedFilters] = useState(filters)

    function applyFilters() {
        setAppliedFilters(filters)
    }

    const filteredExpenses = useMemo(() => {
        let data = [...(expenses ?? [])]

        // Remover as transações de crédito da lista principal
        data = data.filter(e => e.tipo !== 'Crédito')

        // Projetar parcelas de crédito
        const projectedInstallments = []
        const selectedMonth = appliedFilters.month === "all" ? null : Number(appliedFilters.month)
        const selectedYear = appliedFilters.year === "all" ? null : Number(appliedFilters.year)

        creditCards.forEach(card => {
            if (appliedFilters.cardId !== "all" && card.id !== appliedFilters.cardId) return

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

                        if (selectedMonth && invMonth !== selectedMonth) continue
                        if (selectedYear && invYear !== selectedYear) continue

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

        data = [...data, ...projectedInstallments]

        if (appliedFilters.tipo !== "all") {
            if (appliedFilters.tipo === "Despesa") {
                data = data.filter(e =>
                    e.tipo === "Crédito" ||
                    e.tipo === "Débito/Pix"
                )
            } else {
                data = data.filter(e => e.tipo === appliedFilters.tipo)
            }
        }

        if (appliedFilters.month !== "all" || appliedFilters.year !== "all") {
            data = data.filter(e => {
                if (!e?.data) return false
                const [_, month, year] = e.data.split("/")
                if (appliedFilters.month !== "all" && Number(month) !== Number(appliedFilters.month)) return false
                if (appliedFilters.year !== "all" && Number(year) !== Number(appliedFilters.year)) return false
                return true
            })
        }

        switch (sortBy) {
            case "value-desc":
                data.sort((a, b) => b.valor - a.valor)
                break
            case "value-asc":
                data.sort((a, b) => a.valor - b.valor)
                break
            case "date-asc":
                data.sort((a, b) => {
                    const dateA = new Date((a.data || "").split("/").reverse().join("-"))
                    const dateB = new Date((b.data || "").split("/").reverse().join("-"))
                    return dateA - dateB
                })
                break
            case "date-desc":
            default:
                data.sort((a, b) => {
                    const dateA = new Date((a.data || "").split("/").reverse().join("-"))
                    const dateB = new Date((b.data || "").split("/").reverse().join("-"))
                    return dateB - dateA
                })
        }

        return data
    }, [expenses, creditCards, sortBy, appliedFilters])

    const summary = useMemo(() => {
        const baseSummary = (filteredExpenses ?? []).reduce(
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

        let creditCardOutflow = 0
        const selectedMonth = appliedFilters.month === "all" ? new Date().getMonth() : Number(appliedFilters.month) - 1
        const selectedYear = appliedFilters.year === "all" ? new Date().getFullYear() : Number(appliedFilters.year)

        if (creditCards && creditCards.length > 0) {
            creditCards.forEach(card => {
                creditCardOutflow += calculateUsedLimit({
                    expenses,
                    creditCard: card,
                    month: selectedMonth,
                    year: selectedYear
                })
            })
        }

        baseSummary.saidas += creditCardOutflow
        baseSummary.total -= creditCardOutflow

        return baseSummary
    }, [filteredExpenses, creditCards, expenses, appliedFilters])

    return (
        <div className="min-h-screen bg-[#09090B]">
            {/* Header */}
            <div className=" border-b border-gray-800">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a href="/" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">Voltar</span>
                                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </a>
                            <h1 className="text-white text-2xl font-semibold">Todas as Transações</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="max-w-[1600px] mx-auto px-6 py-6">
                {/* Cards de Resumo */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#151719] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Saldo Total</span>
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-white text-3xl font-bold">{formatCurrency(summary.total)}</h2>
                    </div>

                    <div className="bg-[#151719] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Receitas</span>
                            <svg aria-hidden="true" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                        </div>
                        <h2 className="text-white text-3xl font-bold">{formatCurrency(summary.entradas)}</h2>
                    </div>

                    <div className="bg-[#151719] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Despesas</span>
                            <svg aria-hidden="true" className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                        <h2 className="text-white text-3xl font-bold">{formatCurrency(summary.saidas)}</h2>
                    </div>
                </div>

                {/* Controles e Tabela */}
                <div className="bg-[#151719] rounded-xl border border-gray-800">
                    <ExpensesControls
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={applyFilters}
                        expenses={filteredExpenses}
                        creditCards={creditCards}
                    />
                    <Table expenses={filteredExpenses} />
                </div>
            </div>

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            />
        </div>
    )
}
