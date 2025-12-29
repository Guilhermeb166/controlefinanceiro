'use client'

import { useState, useMemo } from "react"
import { useExpenses } from "@/context/AppContext"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { formatCurrency } from "@/utils/FormatCurrency"

export default function GeneralAnalysis() {
    const { expenses } = useExpenses()
    const [period, setPeriod] = useState("monthly")

    const filteredExpenses = useMemo(() => {
        const now = new Date()

        return expenses.filter(e => {
        if (!e.data) return false

        const [d, m, y] = e.data.split("/")
        const date = new Date(y, m - 1, d)

        if (period === "monthly") {
            return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
            )
        }

        if (period === "yearly") {
            return date.getFullYear() === now.getFullYear()
        }

        return true
        })
    }, [expenses, period])

    /* =========================
     KPIs
    ========================= */
    const summary = useMemo(() => {
        let income = 0
        let expense = 0

        filteredExpenses.forEach(e => {
            if (e.tipo === "Receita") {
                income += e.valor
            } else {
                expense += e.valor
            }
        })

        return {
            income,
            expense,
            balance: income - expense
        }
    }, [filteredExpenses])

    /* =========================
        DADOS GRÁFICO LINHA
    ========================= */
    const lineData = useMemo(() => {
        const map = {}

        filteredExpenses.forEach(e => {
        const key = e.data

        if (!map[key]) {
            map[key] = {
            date: key,
            income: 0,
            expense: 0
            }
        }

        if (e.tipo === "Receita") {
            map[key].income += e.valor
        } else {
            map[key].expense += e.valor
        }
        })

        return Object.values(map)
    }, [filteredExpenses])

    /* =========================
        DADOS GRÁFICO BARRAS
    ========================= */
    const barData = [
        {
            name: "Entradas",
            value: summary.income
        },
        {
            name: "Saídas",
            value: summary.expense
        }
    ]

    return (
        <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Análise Geral</h1>

                <div className="flex gap-2">
                    {["monthly", "yearly"].map(p => (
                        <button
                        type="button"
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1 rounded
                            ${period === p
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-200"}
                        `}
                        >
                        {p === "monthly" ? "Mensal" : "Anual"}
                        </button>
                    ))}
                </div>
            </div>

           {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Kpi title="Receitas" value={summary.income} color="text-emerald-600" />
                <Kpi title="Despesas" value={summary.expense} color="text-red-500" />
                <Kpi title="Saldo" value={summary.balance} color="text-blue-600" />
            </div>

            {/* GRÁFICOS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LINHA */}
                <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={v => formatCurrency(v)} />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Receitas"
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Despesas"
                    />
                    </LineChart>
                </ResponsiveContainer>
                </div>

                {/* BARRAS */}
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={v => formatCurrency(v)} />
                            <Bar dataKey="value" fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

        /* =========================
        KPI
        ========================= */
function Kpi({ title, value, color }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-xl font-semibold ${color}`}>
            {formatCurrency(value)}
        </p>
        </div>
    )
}