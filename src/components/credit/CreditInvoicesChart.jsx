'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    ReferenceLine
} from 'recharts'
import { formatCurrency } from "@/utils/FormatCurrency"

export default function CreditInvoicesChart({ invoices, creditLimit }) {
    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={invoices}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        tickFormatter={(value) => `R$ ${value}`}
                    />
                    <Tooltip 
                        cursor={{ fill: '#f9fafb' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [formatCurrency(value), '']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    
                    {/* Linha de referência para o limite do cartão */}
                    {creditLimit && (
                        <ReferenceLine 
                            y={creditLimit} 
                            label={{ position: 'top', value: 'Limite', fill: '#ef4444', fontSize: 10 }} 
                            stroke="#ef4444" 
                            strokeDasharray="3 3" 
                        />
                    )}

                    <Bar 
                        dataKey="totalAll" 
                        fill="#3b82f6" 
                        name="Fatura Total (Todos os Cartões)" 
                        radius={[4, 4, 0, 0]} 
                    />

                    {/* Barra Verde: Fatura do Cartão Selecionado */}
                    <Bar 
                        dataKey="selected" 
                        fill="#10b981" 
                        name="Fatura do Cartão Selecionado" 
                        radius={[4, 4, 0, 0]} 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
