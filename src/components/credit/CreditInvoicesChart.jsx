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

export default function CreditInvoicesChart({ invoices, creditLimit }) {
    const data = invoices.map(inv => ({
        mes: inv.month,
        'Valor da fatura': inv.value,
        'Limite restante': creditLimit - inv.value,
    }))

    return (
        <div className="h-72 mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={v => `R$ ${Number(v).toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="Valor da fatura" />
                    <Bar dataKey="Limite restante" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
