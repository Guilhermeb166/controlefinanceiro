'use client'

import { useState, useMemo } from "react"
import { useExpenses } from "@/context/AppContext"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TextField, MenuItem } from "@mui/material"
import { formatCurrency } from "@/utils/FormatCurrency"

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
  let num = parseInt(hex.replace("#", ""), 16)
  let r = (num >> 16) + percent
  let g = ((num >> 8) & 0x00ff) + percent
  let b = (num & 0x0000ff) + percent

  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  return `rgb(${r}, ${g}, ${b})`
}

export default function CategoryAnalysis() {
    const { expenses } = useExpenses()
    const [selectedCategory, setSelectedCategory] = useState("")

    /* =======================
       CATEGORIAS
    ======================= */
    const categoriesData = useMemo(() => {
        const map = {}

        expenses?.forEach(e => {
            const categoryName = e.categoria?.nome
            if (!categoryName) return

            map[categoryName] = (map[categoryName] || 0) + Math.abs(e.valor)
        })

        const data = Object.entries(map).map(([name, value]) => ({ name, value }))
        const total = data.reduce((sum, item) => sum + item.value, 0)

        return data.map(item => ({ ...item, total }))
    }, [expenses])

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

        expenses
            ?.filter(e => e.categoria?.nome === selectedCategory)
            .forEach(e => {
                const subName = e.subcategoria?.nome
                if (!subName) return

                map[subName] = (map[subName] || 0) + Math.abs(e.valor)
            })

        const data = Object.entries(map).map(([name, value]) => ({ name, value }))
        const total = data.reduce((sum, item) => sum + item.value, 0)

        return data.map(item => ({ ...item, total }))
    }, [expenses, selectedCategory])

    const subcategoryColors = useMemo(
        () => generateColorMap(subcategoriesData),
        [subcategoriesData]
    )

    return (
        <div className="bg-white rounded-lg p-6 shadow space-y-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Categorias e Gastos</h2>

            <TextField
                select
                label="Categoria"
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categoriesData.map(cat => (
                    <MenuItem key={cat.name} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>

            <div className="flex flex-col lg:flex-row h-[700px] lg:h-[350px]">
                
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart tabIndex={-1}>
                            <Pie
                                data={categoriesData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={renderPercentageLabel}
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
                                label={renderPercentageLabel}
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
                </div>
            </div>
        </div>
    )
}
