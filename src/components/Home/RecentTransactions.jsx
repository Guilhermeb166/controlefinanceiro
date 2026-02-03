/**
 * Lista das transações mais recentes com link para ver todas
 */
'use client'

import { formatCurrency } from "@/utils/FormatCurrency"
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function RecentTransactions({ expenses }) {
    // Pegar apenas as 5 transações mais recentes
    const recentExpenses = expenses?.slice(0, 5) || []

    function getCategoriaLabel(item) {
        if (item.subcategoria?.nome) {
            return `${item.categoria.nome} / ${item.subcategoria.nome}`
        }
        return item.categoria?.nome || "-"
    }

    function getTransactionIcon(tipo) {
        if (tipo === 'Receita') {
            return (
                <div className="bg-emerald-600/10 p-2 rounded-lg">
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                </div>
            )
        }
        return (
            <div className="bg-red-500/10 p-2 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-red-500" />
            </div>
        )
    }

    if (recentExpenses.length === 0) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white text-xl font-semibold mb-6">Transactions History</h2>
                <p className="text-zinc-500 text-center py-8">Nenhuma transação encontrada</p>
            </div>
        )
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-white text-xl font-semibold mb-1">Transactions History</h2>
                    <p className="text-zinc-500 text-sm">Transaction Number</p>
                </div>
                <Link 
                    href="/transactions"
                    className="text-emerald-600 hover:text-emerald-500 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                    Ver todas
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-4">
                {recentExpenses.map((item) => (
                    <div 
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            {getTransactionIcon(item.tipo)}
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-white font-medium truncate">
                                        {getCategoriaLabel(item)}
                                    </p>
                                    {item.bank && (
                                        <span className="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                                            {item.bank}
                                        </span>
                                    )}
                                </div>
                                <p className="text-zinc-500 text-sm truncate">
                                    {item.observacao || 'Sem observação'}
                                </p>
                            </div>
                        </div>

                        <div className="text-right ml-4">
                            <p className={`font-semibold mb-1 ${
                                item.tipo === 'Receita' ? 'text-emerald-600' : 'text-red-500'
                            }`}>
                                {item.tipo === 'Receita' ? '+' : '-'}{formatCurrency(item.valor)}
                            </p>
                            <p className="text-zinc-500 text-xs whitespace-nowrap">
                                {item.data}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
