/**
 * Gráfico de fluxo de caixa mostrando receitas e despesas
 */
'use client'

import { useMemo, useState } from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CashflowChart({ expenses }) {
    const [period, setPeriod] = useState('month')

    const chartData = useMemo(() => {
        if (!expenses || expenses.length === 0) return []

        const now = new Date()
        let data = []

        if (period === 'week') {
            // Últimos 7 dias
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now)
                date.setDate(date.getDate() - i)
                const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
                const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

                const dayExpenses = expenses.filter(e => {
                    if (!e?.data) return false
                    const [day, month, year] = e.data.split('/')
                    const expDate = new Date(Number(year), Number(month) - 1, Number(day))
                    return expDate.toDateString() === date.toDateString()
                })

                const income = dayExpenses
                    .filter(e => e.tipo === 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                const expense = dayExpenses
                    .filter(e => e.tipo !== 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                data.push({
                    name: dayName,
                    date: dateStr,
                    Receita: income,
                    Despesa: expense
                })
            }
        } else if (period === 'month') {
            // Últimas 4 semanas
            for (let i = 3; i >= 0; i--) {
                const startDate = new Date(now)
                startDate.setDate(startDate.getDate() - (i * 7 + 6))
                const endDate = new Date(now)
                endDate.setDate(endDate.getDate() - (i * 7))

                const weekExpenses = expenses.filter(e => {
                    if (!e?.data) return false
                    const [day, month, year] = e.data.split('/')
                    const expDate = new Date(Number(year), Number(month) - 1, Number(day))
                    return expDate >= startDate && expDate <= endDate
                })

                const income = weekExpenses
                    .filter(e => e.tipo === 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                const expense = weekExpenses
                    .filter(e => e.tipo !== 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                data.push({
                    name: `Sem ${4 - i}`,
                    Receita: income,
                    Despesa: expense
                })
            }
        } else if (period === 'year') {
            // Últimos 12 meses
            for (let i = 11; i >= 0; i--) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
                const monthName = date.toLocaleDateString('pt-BR', { month: 'short' })
                const month = date.getMonth() + 1
                const year = date.getFullYear()

                const monthExpenses = expenses.filter(e => {
                    if (!e?.data) return false
                    const [_, expMonth, expYear] = e.data.split('/')
                    return Number(expMonth) === month && Number(expYear) === year
                })

                const income = monthExpenses
                    .filter(e => e.tipo === 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                const expense = monthExpenses
                    .filter(e => e.tipo !== 'Receita')
                    .reduce((sum, e) => sum + e.valor, 0)

                data.push({
                    name: monthName,
                    Receita: income,
                    Despesa: expense
                })
            }
        }

        return data
    }, [expenses, period])

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-lg">
                    {payload[0]?.payload?.date && (
                        <p className="text-zinc-400 text-xs mb-2">{payload[0].payload.date}</p>
                    )}
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6 ">
                <div>
                    <h2 className="text-white text-xl font-semibold mb-1">Fluxo de Caixa</h2>
                </div>
                <FormControl size="small" sx={{
                    minWidth: 120,
                    '& .MuiOutlinedInput-root': {
                        color: 'white',
                        backgroundColor: 'rgb(39 39 42)',
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: 'rgb(63 63 70)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgb(82 82 91)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(5 150 105)',
                        },
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgb(161 161 170)',
                    },
                }}>
                    <Select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: 'rgb(39 39 42)',
                                    '& .MuiMenuItem-root': {
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgb(63 63 70)',
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgb(5 150 105)',
                                            '&:hover': {
                                                backgroundColor: 'rgb(4 120 87)',
                                            },
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="week">Semana</MenuItem>
                        <MenuItem value="month">Mês</MenuItem>
                        <MenuItem value="year">Ano</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <ResponsiveContainer width="100%" height={300} >
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(63 63 70)" />
                    <XAxis 
                        dataKey="name" 
                        stroke="rgb(161 161 170)"
                        tick={{ fill: 'rgb(161 161 170)' }}
                        
                    />
                    <YAxis 
                        stroke="rgb(161 161 170)"
                        tick={{ fill: 'rgb(161 161 170)' }}
                        tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false}/>
                    <Legend 
                        wrapperStyle={{ color: 'white' }}
                        iconType="circle"
                    />
                    <Bar 
                        dataKey="Receita" 
                        fill="rgb(5 150 105)" 
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                        dataKey="Despesa" 
                        fill="rgb(239 68 68)" 
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
