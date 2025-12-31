'use client'

import { useState, useMemo, useCallback, useRef } from "react"
import { useExpenses } from "@/context/AppContext"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
    LabelList
} from "recharts"
import { formatCurrency } from "@/utils/FormatCurrency"
import { isSameMonth, isSameWeek, isSameYear, parseBRDate } from "@/utils/dashboard/dateHelpers"
import { WEEK_DAYS } from "@/utils/dashboard/constants"
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material"

function useHorizontalDrag() {
    const ref = useRef(null)
    const pos = useRef({ left: 0, x: 0 })

    const onMouseDown = (e) => {
        const el = ref.current
        if (!el) return

        el.classList.add("dragging")
        pos.current = {
            left: el.scrollLeft,
            x: e.clientX
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e) => {
        const el = ref.current
        if (!el) return

        const dx = e.clientX - pos.current.x
        el.scrollLeft = pos.current.left - dx
    }

    const onMouseUp = () => {
        const el = ref.current
        if (!el) return

        el.classList.remove("dragging")
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    }

    return { ref, onMouseDown }
}

export default function GeneralAnalysis() {

    const drag = useHorizontalDrag()
    const { expenses } = useExpenses()

    const [period, setPeriod] = useState("monthly")
    const [view, setView] = useState("main")

    const [leftMonth, setLeftMonth] = useState(new Date().getMonth())
    const [rightMonth, setRightMonth] = useState(new Date().getMonth() - 1)

    const [leftYear, setLeftYear] = useState(new Date().getFullYear())
    const [rightYear, setRightYear] = useState(new Date().getFullYear())

    const now = new Date()

    const filteredExpenses = useMemo(() => {
        return expenses.filter(e => {
            if (!e.data) return false
            const date = parseBRDate(e.data)

            if (period === "weekly") return isSameWeek(date, now)
            if (period === "monthly") return isSameMonth(date, now)
            if (period === "yearly") return isSameYear(date, now)

            return true
        })
    }, [expenses, period, now])

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
    GRÁFICO PRINCIPAL (BARRAS)
   ========================= */
    const mainBarData = useMemo(() => {
        if (period === "weekly") {
            const map = Object.fromEntries(WEEK_DAYS.map(d => [d, { income: 0, expense: 0 }]))

            expenses.forEach(e => {
                const date = parseBRDate(e.data)
                if (isSameWeek(date, now)) {
                    const index = (date.getDay() + 6) % 7
                    const key = WEEK_DAYS[index]

                    if (e.tipo === "Receita") {
                        map[key].income += e.valor
                    } else {
                        map[key].expense += e.valor
                    }
                }
            })

            return WEEK_DAYS.map(d => ({ name: d, ...map[d] }))
        }

        if (period === "monthly") {
            const months = Array.from({ length: 12 }, (_, i) => i)
            const map = {}

            months.forEach(m => {
                map[m] = { income: 0, expense: 0 }
            })

            expenses.forEach(e => {
                const date = parseBRDate(e.data)
                if (date.getFullYear() === now.getFullYear()) {
                    const m = date.getMonth()
                    if (e.tipo === "Receita") {
                        map[m].income += e.valor
                    } else {
                        map[m].expense += e.valor
                    }
                }
            })

            return months.map(m => ({
                name: new Date(2024, m).toLocaleString("pt-BR", { month: "short" }),
                ...map[m]
            }))
        }

        // yearly
        const years = Array.from({ length: 6 }, (_, i) => now.getFullYear() - i)
        const map = {}

        years.forEach(y => {
            map[y] = { income: 0, expense: 0 }
        })

        expenses.forEach(e => {
            const date = parseBRDate(e.data)
            if (map[date.getFullYear()]) {
                if (e.tipo === "Receita") {
                    map[date.getFullYear()].income += e.valor
                } else {
                    map[date.getFullYear()].expense += e.valor
                }

            }
        })

        return years.reverse().map(y => ({ name: y, ...map[y] }))
    }, [expenses, period, now])

    /* =========================
        DADOS GRÁFICOS BARRAS
    ========================= */
    const buildBarData = useCallback((month, year) => {
        let income = 0
        let expense = 0

        expenses.forEach(e => {
            const date = parseBRDate(e.data)
            if (date.getMonth() === month && date.getFullYear() === year) {
                if (e.tipo === "Receita") {
                    income += e.valor
                } else {
                    expense += e.valor
                }
            }
        })

        return [
            { name: "Receitas", value: income },
            { name: "Despesas", value: expense }
        ]
    }, [expenses])

    const leftBarData = useMemo(() => buildBarData(leftMonth, leftYear),
        [buildBarData, leftMonth, leftYear]
    )

    const rightBarData = useMemo(() => buildBarData(rightMonth, rightYear),
        [buildBarData, rightMonth, rightYear]
    )

    return (
        <div className="bg-white rounded-lg py-6 px-2 shadow space-y-8">
            {/* HEADER */}
            <div className="flex justify-between items-center flex-col sm:flex-row gap-5 sm:gap-0">
                <h1 className="text-xl font-semibold">Análise Geral</h1>

                <div className="flex gap-2">
                    {["weekly", "monthly", "yearly"].map(p => (
                        <button
                            type="button"
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1 rounded cursor-pointer ${period === p ? "bg-emerald-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {p === "weekly" ? "Semanal" : p === "monthly" ? "Mensal" : "Anual"}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Kpi title="Receitas" value={summary.income} color="text-emerald-600" />
                <Kpi title="Despesas" value={summary.expense} color="text-red-600" />
                <Kpi title="Saldo" value={summary.balance} color="text-blue-600" />
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    type="button"
                    onClick={() => setView("main")}
                    className={`px-3 py-1 rounded sm:cursor-pointer ${view === "main"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-200"
                        }`}
                >
                    Visão Geral
                </button>

                <button
                    type="button"
                    onClick={() => setView("compare")}
                    className={`px-3 py-1 rounded cursor-pointer ${view === "compare"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-200"
                        }`}
                >
                    Comparativo
                </button>
            </div>
            {/* GRÁFICO PRINCIPAL */}
            {view === "main" && (
            <div
                ref={drag.ref}
                onMouseDown={drag.onMouseDown}
                className="h-80 overflow-x-auto horizontal-scroll cursor-grab active:cursor-grabbing"
            >
                <div
                    className="h-full select-none"
                    style={{ minWidth: `${mainBarData.length * 90}px` }}
                >
                    {/* Wrapper que permite scroll */}
                    <div className="w-full h-full pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={mainBarData}
                                barCategoryGap={10}
                                barGap={20}
                                margin={{
                                    top: 40,
                                    right: 32,
                                    left: 0,
                                    bottom: 16,
                                }}
                            >
                                <CartesianGrid strokeDasharray="4 4" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(v) => formatCurrency(v)} />

                                <Bar dataKey="income" fill="#059669" name="Receita" barSize={28}>
                                    <LabelList
                                        dataKey="income"
                                        position="top"
                                        formatter={(v) => (v > 0 ? formatCurrency(v) : "")}
                                        style={{ fontSize: 15 }}
                                    />
                                </Bar>

                                <Bar dataKey="expense" fill="#dc2626" name="Despesa" barSize={28}>
                                    <LabelList
                                        dataKey="expense"
                                        position="top"
                                        formatter={(v) => (v > 0 ? formatCurrency(v) : "")}
                                        style={{ fontSize: 15 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )}
            {/* COMPARATIVO */}
            {view === "compare" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <CompareBar
                        title="Período A"
                        data={leftBarData}
                        month={leftMonth}
                        setMonth={setLeftMonth}
                        year={leftYear}
                        setYear={setLeftYear}
                    />

                    <CompareBar
                        title="Período B"
                        data={rightBarData}
                        month={rightMonth}
                        setMonth={setRightMonth}
                        year={rightYear}
                        setYear={setRightYear}
                    />
                </div>
            )}
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

function CompareBar({ title, data, month, setMonth, year, setYear, barLabel = "Valor" }) {
    const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i)

    return (
        <div className="space-y-3">
            <h3 className="font-medium">{title}</h3>

            <div className="flex gap-2">
                <FormControl fullWidth size="small">
                    <InputLabel>Mês</InputLabel>
                    <Select value={month} label="Mês" onChange={e => setMonth(e.target.value)}>
                        {Array.from({ length: 12 }).map((_, month) => {
                            const label = new Date(2024, month).toLocaleString("pt-BR", { month: "long" })

                            return (
                                <MenuItem key={label} value={month}>
                                    {label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel>Ano</InputLabel>
                    <Select value={year} label="Ano" onChange={e => setYear(e.target.value)}>
                        {years.map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="h-[260px] pointer-events-none select-none">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={v => formatCurrency(v)} />
                        <Bar dataKey="value" name={barLabel}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.name === "Despesas" ? "#dc2626" : "#059669"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}