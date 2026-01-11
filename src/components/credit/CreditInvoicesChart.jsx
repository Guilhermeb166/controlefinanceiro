'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function CreditInvoicesChart({ invoices, creditLimit }) {
    const data = invoices.map(inv => ({
        month: inv.month,
        invoice: inv.value,
        remaining: creditLimit - inv.value,
    }))

    return (
        <div className="h-72 mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="invoice" />
                <Bar dataKey="remaining" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
