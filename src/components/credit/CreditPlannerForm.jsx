'use client'

import { useMemo, useState, useEffect } from 'react'
import { generateInvoices } from '@/utils/credit/creditCalc'
import CreditCardModal from './CreditCardModal'
import CreditInvoicesChart from './CreditInvoicesChart'
import { saveUserCreditCard } from '@/utils/credit/creditService.client'

export default function CreditPlannerForm({
  userId,
  creditCard,
  creditPurchases,
}) {
    const [card, setCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [totalValue, setTotalValue] = useState('')
    const [installments, setInstallments] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState('')

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

    useEffect(() => {
        if (!creditCard) {
        setShowModal(true)
        } else {
        setCard(creditCard)
        }
    }, [creditCard])

    return (
        <>
            <button
                className="text-sm underline mb-4"
                onClick={() => setShowModal(true)}
            >
                Editar dados do cartão
            </button>

            <CreditCardModal
                isOpen={showModal}
                onSave={handleSaveCard}
                card={card}
            />

            <div className="space-y-4">
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
        </>
    )
}
