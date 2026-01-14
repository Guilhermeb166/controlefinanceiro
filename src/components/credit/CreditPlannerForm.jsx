'use client'

import { useMemo, useState, useEffect } from 'react'
import { generateInvoices } from '@/utils/credit/creditCalc'
import CreditCardModal from './CreditCardModal'
import CreditInvoicesChart from './CreditInvoicesChart'
import {
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  getUserCreditCards
} from "@/utils/credit/creditService.client"
import CreditCardInfoCard from './CreditCardInfoCard'

export default function CreditPlannerForm({
    userId, creditCards
}) {
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState(null)
    const [editingCard, setEditingCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [totalValue, setTotalValue] = useState('')
    const [installments, setInstallments] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState('')

    useEffect(() => {
        if (!creditCards || creditCards.length === 0) {
            setCards([])
            setSelectedCard(null)
            setShowModal(true)
            return
        }

        setCards(creditCards)
        setSelectedCard(creditCards[0])
    }, [creditCards])


    const installmentValue = useMemo(() => {
        if (!totalValue || !installments) return 0
        return Number(totalValue) / Number(installments)
    }, [totalValue, installments])

    const invoices = useMemo(() => {
        if (!selectedCard || !purchaseDate) return []

        return generateInvoices({
            purchaseDate,
            closingDay: selectedCard.closingDay,
            installments,
            installmentValue,
        })
    }, [selectedCard, purchaseDate, installments, installmentValue])

        async function handleSaveCard(data) {
            if (editingCard) {
                await updateCreditCard(editingCard.id, data)
            } else {
                await createCreditCard(userId, data)
            }

            const refreshed = await getUserCreditCards(userId)
            setCards(refreshed)
            setSelectedCard(refreshed[0] || null)

            setEditingCard(null)
            setShowModal(false)
        }

      

    async function handleDeleteCard(cardId) {
        await deleteCreditCard(cardId)

        const refreshed = await getUserCreditCards(userId)
        setCards(refreshed)
        setSelectedCard(refreshed[0] || null)
    }

    return (
        <div className="space-y-6">
            {cards.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map(card => (
                        <CreditCardInfoCard
                            key={card.id}
                            card={card}
                            onEdit={() => {
                                setEditingCard(card)
                                setShowModal(true)
                            }}
                            onDelete={() => handleDeleteCard(card.id)}
                            onSelect={() => setSelectedCard(card)}

                        />
                    ))}
                </div>
            )}

            <button
                onClick={() => {
                    setEditingCard(null)
                    setShowModal(true)
                }}
                className="cursor-pointer w-full border-2 border-dashed border-emerald-500/40 text-emerald-400 py-4 rounded-xl hover:bg-emerald-500/10 transition"
            >
                + Adicionar novo cartão
            </button>

            <CreditCardModal
                isOpen={showModal}
                onSave={handleSaveCard}
                onClose={() => setShowModal(false)}
                card={editingCard}
            />

            {selectedCard && (
                <>
                    <div className="bg-white p-4 border rounded-xl space-y-4">
                        <h3 className="font-medium">
                            Compra no crédito ({selectedCard.bank})
                        </h3>

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
                        creditLimit={selectedCard.creditLimit}
                    />
                </>
            )}
        </div>
    )
}
