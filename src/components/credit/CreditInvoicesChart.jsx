'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
import { formatCurrency } from "@/utils/FormatCurrency"

export default function CreditInvoicesChart({ invoices }) {


    return (
        <div className="h-72 mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoices}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={v => formatCurrency(v)} />
                    <Legend />
                    <Bar dataKey="value" name="Fatura do mês" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
