/**
 * Gráfico de barras que compara as faturas mensais do cartão selecionado com o total de todos os cartões.
 */
'use client'

import { useEffect, useState  } from 'react'
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

// Mock da função formatCurrency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export default function CreditInvoicesChart({ invoices, creditLimit }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Custom label component para mostrar valores nas barras
    const CustomLabel = ({ x, y, width, value }) => {
        return (
            <text 
                x={x + width + 5} 
                y={y + 10} 
                fill="#374151" 
                fontSize="10" 
                fontWeight="500"
            >
                {formatCurrency(value)}
            </text>
        )
    }

    // Layout Horizontal para Mobile
    if (isMobile) {
        return (
            <div className="w-full">
                <div style={{ height: `${Math.max(invoices.length * 80, 320)}px` }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={invoices}
                            layout="vertical"
                            margin={{ top: 5, right: 80, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                horizontal={false}
                                stroke="#e5e7eb" 
                            />
                            <XAxis 
                                type="number"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                tickFormatter={(value) => {
                                    if (value === 0) return '0'
                                    if (value >= 1000) return `${(value/1000).toFixed(1)}k`
                                    return value.toString()
                                }}
                            />
                            <YAxis 
                                type="category"
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
                                width={45}
                            />
                            
                            {creditLimit && (
                                <ReferenceLine 
                                    x={creditLimit} 
                                    stroke="#ef4444" 
                                    strokeDasharray="5 5"
                                    strokeWidth={2}
                                />
                            )}

                            <Bar 
                                dataKey="totalAll" 
                                fill="#3b82f6" 
                                name="totalAll" 
                                radius={[0, 6, 6, 0]}
                                barSize={18}
                                label={<CustomLabel />}
                            />

                            <Bar 
                                dataKey="selected" 
                                fill="#10b981" 
                                name="selected" 
                                radius={[0, 6, 6, 0]}
                                barSize={18}
                                label={<CustomLabel />}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Legenda customizada para mobile */}
                <div className="flex flex-col gap-2 mt-4 px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500"></div>
                        <span className="text-xs text-gray-700 font-medium">Fatura Total (Todos os Cartões)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500"></div>
                        <span className="text-xs text-gray-700 font-medium">Fatura do Cartão Selecionado</span>
                    </div>
                    {creditLimit && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-1 bg-red-500 rounded"></div>
                            <span className="text-xs text-gray-700 font-medium">
                                Limite: {formatCurrency(creditLimit)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Layout Vertical para Desktop (original sem alterações)
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
