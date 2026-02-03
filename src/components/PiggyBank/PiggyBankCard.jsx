/**
 * Componente de card do Cofrinho para exibir na página inicial.
 * Mostra o saldo atual e oferece acesso rápido à página do cofrinho.
 */
"use client"

import Link from "next/link"
import { useMemo } from "react"
import { formatCurrency } from "@/utils/FormatCurrency"
import { useExpenses } from "@/context/AppContext"

export default function PiggyBankCard() {
    const { piggyBank } = useExpenses()

    const balance = useMemo(() => {
        if (!piggyBank || piggyBank.length === 0) return 0
        
        return piggyBank.reduce((acc, transaction) => {
            if (transaction.tipo === "Depósito") return acc + transaction.valor
            if (transaction.tipo === "Retirada") return acc - transaction.valor
            return acc
        }, 0)
    }, [piggyBank])

    return (
        <Link href="/cofrinho">
            <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                            Meu Cofrinho
                        </p>
                        <h3 className="text-3xl font-bold text-emerald-700 mt-2">
                            {formatCurrency(Math.max(0, balance))}
                        </h3>
                    </div>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-10 text-emerald-600 opacity-30">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                </div>

                <div className="pt-4 border-t border-emerald-200">
                    <p className="text-xs text-emerald-600 font-medium">
                        {piggyBank?.length || 0} transações
                    </p>
                </div>
            </div>
        </Link>
    )
}
