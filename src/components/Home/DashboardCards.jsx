/**
 * Cards de resumo do dashboard com design glassmorphism moderno
 */
'use client'

import { formatCurrency } from "@/utils/FormatCurrency"
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function DashboardCards({ summary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance */}
            <div className="group relative overflow-hidden rounded-3xl p-[1px] bg-linear-to-br from-emerald-500/20 via-transparent to-transparent hover:from-emerald-500/30 transition-all duration-500">
                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-500">
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-zinc-400 text-sm font-medium tracking-wide">Total Balance</span>
                            <div className="bg-linear-to-br from-emerald-500/20 to-emerald-600/10 p-3 rounded-2xl backdrop-blur-sm border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Wallet className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>
                        <p className="text-white text-4xl font-bold mb-2 tracking-tight">
                            {formatCurrency(summary.total)}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                            <p className="text-zinc-500 text-xs font-medium">Últimos 12 meses</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deposits */}
            <div className="group relative overflow-hidden rounded-3xl p-[1px] bg-linear-to-br from-emerald-500/20 via-transparent to-transparent hover:from-emerald-500/30 transition-all duration-500">
                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-500">
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-zinc-400 text-sm font-medium tracking-wide">Deposits</span>
                            <div className="bg-linear-to-br from-emerald-500/20 to-emerald-600/10 p-3 rounded-2xl backdrop-blur-sm border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>
                        <p className="text-white text-4xl font-bold mb-2 tracking-tight">
                            {formatCurrency(summary.entradas)}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                            <p className="text-zinc-500 text-xs font-medium">Últimos 12 meses</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdrawals */}
            <div className="group relative overflow-hidden rounded-3xl p-px bg-linear-to-br from-red-500/20 via-transparent to-transparent hover:from-red-500/30 transition-all duration-500">
                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 hover:border-red-500/30 transition-all duration-500">
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-zinc-400 text-sm font-medium tracking-wide">Withdrawals</span>
                            <div className="bg-linear-to-br from-red-500/20 to-red-600/10 p-3 rounded-2xl backdrop-blur-sm border border-red-500/20 group-hover:scale-110 transition-transform duration-300">
                                <TrendingDown className="w-5 h-5 text-red-400" />
                            </div>
                        </div>
                        <p className="text-white text-4xl font-bold mb-2 tracking-tight">
                            {formatCurrency(summary.saidas)}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
                            <p className="text-zinc-500 text-xs font-medium">Últimos 12 meses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}