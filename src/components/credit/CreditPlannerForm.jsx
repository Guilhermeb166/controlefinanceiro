'use client'

import { useMemo, useState, useEffect } from 'react'
import { generateInvoices } from '@/utils/credit/creditCalc'
import CreditCardModal from './CreditCardModal'
import CreditInvoicesChart from './CreditInvoicesChart'
import { saveUserCreditCard } from '@/utils/credit/creditService.client'
import CreditCardInfoCard from './CreditCardInfoCard'

export default function CreditPlannerForm({
  userId,
  creditCard
}) {
    const [card, setCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [totalValue, setTotalValue] = useState('')
    const [installments, setInstallments] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState('')

    useEffect(() => {
        if (!creditCard) {
            setShowModal(true)
        } else {
            setCard(creditCard)
        }
    }, [creditCard])

    const installmentValue = useMemo(() => {
        return totalValue && installments
        ? Number(totalValue) / Number(installments)
        : 0
    }, [totalValue, installments])

    const invoices = useMemo(() => {
        if (!card || !purchaseDate) return []
        return generateInvoices({
            purchaseDate,
            closingDay: card.closingDay,
            installments,
            installmentValue,
        })
    }, [card, purchaseDate, installments, installmentValue])

    async function handleSaveCard(data) {
        await saveUserCreditCard(userId, data)
        setCard(data)
        setShowModal(false)
    }

    return (
    <div className="space-y-6">
        {card && (
            <CreditCardInfoCard
                card={card}
                onEdit={() => setShowModal(true)}
                onAdd={() => {
                    setCard(null)
                    setShowModal(true)
                }}
            />
        )}

        <CreditCardModal
            isOpen={showModal}
            onSave={handleSaveCard}
            onClose={() => setShowModal(false)}
            card={card}
        />

        <div className="bg-white p-4 border rounded-xl space-y-4">
            <h3 className="font-medium">Compra no crédito</h3>

            <input
                className="input"
                type="number"
                placeholder="Valor total da compra"
                value={totalValue}
                onChange={e => setTotalValue(e.target.value)}
            />

            <input
                className="input"
                type="number"
                placeholder="Parcelas"
                value={installments}
                onChange={e => setInstallments(e.target.value)}
            />

            <input
                className="input"
                type="date"
                value={purchaseDate}
                onChange={e => setPurchaseDate(e.target.value)}
            />
        </div>

        <CreditInvoicesChart
            invoices={invoices}
            creditLimit={card?.creditLimit || 0}
        />
    </div>
  )
}
