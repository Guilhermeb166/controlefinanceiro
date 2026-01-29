/**
 * Componente de análise de gastos por categoria e subcategoria, utilizando gráficos de pizza.
 */
'use client'

import { useState, useMemo } from "react"
import { useExpenses } from "@/context/AppContext"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TextField, MenuItem } from "@mui/material"
import { formatCurrency } from "@/utils/FormatCurrency"
import { MobileLegend } from "@/utils/dashboard/MobileLegend"
import { useTheme, useMediaQuery } from "@mui/material"

function renderPercentageLabel({ name, percent }) {
    if (!percent || percent === 0) return null
    return `${name} ${(percent * 100).toFixed(1)}%`
}

function generateColorMap(items) {
    const COLOR_PALETTE = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F97316", // orange
  "#EF4444", // red
  "#06B6D4", // cyan
  "#A855F7", // purple
  "#FACC15", // yellow
  "#14B8A6", // teal
  "#EC4899", // pink
  "#64748B"  // slate
]
     const map = {}

  items.forEach((item, index) => {
    const baseColor = COLOR_PALETTE[index % COLOR_PALETTE.length]

    // Se ultrapassar a paleta, ajusta luminosidade
    const variation = Math.floor(index / COLOR_PALETTE.length) * 8

    map[item.name] = adjustLightness(baseColor, variation)
  })

  return map
}

function adjustLightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16)
  let r = (num >> 16) + percent
  let g = ((num >> 8) & 0x00ff) + percent
  let b = (num & 0x0000ff) + percent

  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  return `rgb(${r}, ${g}, ${b})`
}

export default function CategoryAnalysis() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

    const { expenses, creditCards } = useExpenses()
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    const months = [
        { value: 1, label: "Janeiro" },
        { value: 2, label: "Fevereiro" },
        { value: 3, label: "Março" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Maio" },
        { value: 6, label: "Junho" },
        { value: 7, label: "Julho" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Setembro" },
        { value: 10, label: "Outubro" },
        { value: 11, label: "Novembro" },
        { value: 12, label: "Dezembro" },
    ]

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear()
        return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
    }, [])

    const projectedExpenses = useMemo(() => {
        const data = [...(expenses ?? [])].filter(e => e.tipo !== 'Crédito')

        creditCards.forEach(card => {
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

                        data.push({
                            id: `${parcela.id}-inst-${i}`,
                            data: `${String(invoiceDate.getDate()).padStart(2, '0')}/${String(invMonth).padStart(2, '0')}/${invYear}`,
                            valor: parcela.installmentValue,
                            tipo: "Crédito",
                            categoria: parcela.categoria || { id: "parcelaCredito", nome: "Parcela do Cartão de Crédito" },
                            subcategoria: parcela.subcategoria || null
                        })
                    }
                })
            }
        })
        return data
    }, [expenses, creditCards])

    const filteredByDate = useMemo(() => {
        return projectedExpenses.filter(e => {
            if (!e.data) return false
            const [_, month, year] = e.data.split("/").map(Number)
            return month === selectedMonth && year === selectedYear && e.tipo !== "Receita"
        })
    }, [projectedExpenses, selectedMonth, selectedYear])

    /* =======================
       CATEGORIAS
    ======================= */
    const categoriesData = useMemo(() => {
        const map = {}

        filteredByDate?.forEach(e => {
            const categoryName = e.categoria?.nome
            if (!categoryName) return

            map[categoryName] = (map[categoryName] || 0) + Math.abs(e.valor)
        })

        const data = Object.entries(map).map(([name, value]) => ({ name, value }))
        const total = data.reduce((sum, item) => sum + item.value, 0)

        return data.map(item => ({ ...item, total }))
    }, [filteredByDate])

    const categoryColors = useMemo(
        () => generateColorMap(categoriesData),
        [categoriesData]
    )

    /* =======================
       SUBCATEGORIAS
    ======================= */
    const subcategoriesData = useMemo(() => {
        if (!selectedCategory) return []

        const map = {}

        filteredByDate
            ?.filter(e => e.categoria?.nome === selectedCategory)
            .forEach(e => {
                const subName = e.subcategoria?.nome
                if (!subName) return

                map[subName] = (map[subName] || 0) + Math.abs(e.valor)
            })

        const data = Object.entries(map).map(([name, value]) => ({ name, value }))
        const total = data.reduce((sum, item) => sum + item.value, 0)

        return data.map(item => ({ ...item, total }))
    }, [filteredByDate, selectedCategory])

    const subcategoryColors = useMemo(
        () => generateColorMap(subcategoriesData),
        [subcategoriesData]
    )

    return (
        <div className="bg-white rounded-lg p-6 shadow space-y-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Categorias e Gastos</h2>

            <div className="flex flex-wrap gap-4">
                <TextField
                    select
                    label="Mês"
                    size="small"
                    className="w-40"
                    value={selectedMonth}
                    onChange={(e) => {
                        setSelectedMonth(e.target.value)
                        setSelectedCategory("")
                    }}
                >
                    {months.map(m => (
                        <MenuItem key={m.value} value={m.value}>
                            {m.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Ano"
                    size="small"
                    className="w-32"
                    value={selectedYear}
                    onChange={(e) => {
                        setSelectedYear(e.target.value)
                        setSelectedCategory("")
                    }}
                >
                    {years.map(y => (
                        <MenuItem key={y} value={y}>
                            {y}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Categoria"
                    size="small"
                    className="w-60"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <MenuItem value="">Todas as Categorias</MenuItem>
                    {categoriesData.map(cat => (
                        <MenuItem key={cat.name} value={cat.name}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="flex flex-col lg:flex-row h-[1200px] sm:h-[700px] lg:h-[350px] gap-30 sm:gap-0">
                
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart tabIndex={-1}>
                            <Pie
                                data={categoriesData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={isDesktop ? renderPercentageLabel : false}
                                labelLine={false}
                            >
                                {categoriesData.map(item => (
                                    <Cell
                                        key={item.name}
                                        fill={categoryColors[item.name]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value, name, props) => {
                                    const percent = ((value / props.payload.total) * 100).toFixed(1)
                                    return [`${percent}% • ${formatCurrency(value)}`, name]
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <MobileLegend
                        data={categoriesData}
                        colors={categoryColors}
                    />
                </div>

                {/* ===== GRÁFICO SUBCATEGORIAS ===== */}
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart tabIndex={-1}>
                            <Pie
                                data={subcategoriesData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={isDesktop ? renderPercentageLabel : false}
                                labelLine={false}
                            >
                                {subcategoriesData.map(item => (
                                    <Cell
                                        key={item.name}
                                        fill={subcategoryColors[item.name]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value, name, props) => {
                                    const percent = ((value / props.payload.total) * 100).toFixed(1)
                                    return [`${percent}% • ${formatCurrency(value)}`, name]
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <MobileLegend
    data={subcategoriesData}
    colors={subcategoryColors}
/>
                </div>
            </div>
        </div>
    )
}
