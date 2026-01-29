/**
 * Cartão visual que exibe informações resumidas de um cartão de crédito, como banco, limite e datas.
 */
'use client'

import { FaTrash } from "react-icons/fa"
import { formatCurrency } from "@/utils/FormatCurrency"
export default function CreditCardInfoCard({ card, onEdit, onSelect, onDelete }) {
    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: <>
        // biome-ignore lint/a11y/useKeyWithClickEvents: <>
        <div
            
            onClick={onSelect}
            className="
                cursor-pointer
                w-full
                m-auto
                md:m-0
                max-w-[300px]
                bg-linear-to-br from-slate-800 to-slate-900
                rounded-2xl p-6 shadow-xl
                border border-slate-700
                space-y-4
                transition-all
                hover:ring-2 hover:ring-emerald-600/40
            "
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-xl text-white mb-1">
                        {card.bank}
                    </h3>
                    <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}
                        className="
                            cursor-pointer
                            text-sm text-emerald-400
                            hover:text-emerald-300
                            transition-colors
                            h-8
                            font-medium
                            px-3 py-1.5
                            rounded-lg
                            bg-slate-700/50
                            hover:bg-slate-700
                        "
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="
                            cursor-pointer
                            text-md font-medium
                            h-8
                            px-3 py-1.5
                            rounded-lg
                            bg-red-500/10
                            text-red-400
                            hover:bg-red-500/20
                            hover:text-red-300
                            transition-colors
                        "
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">
                        Limite Total
                    </span>
                    <span className="text-white font-semibold text-lg">
                        {formatCurrency(card.creditLimit)}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/40 rounded-lg p-3">
                        <p className="text-slate-400 text-xs mb-1">
                            Fechamento
                        </p>
                        <p className="text-emerald-400 font-semibold">
                            Dia {card.closingDay}
                        </p>
                    </div>

                    <div className="bg-slate-700/40 rounded-lg p-3">
                        <p className="text-slate-400 text-xs mb-1">
                            Vencimento
                        </p>
                        <p className="text-emerald-400 font-semibold">
                            Dia {card.dueDay}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}