'use client'

import { useMemo, useState, useEffect } from 'react'
import { generateInvoices } from '@/utils/credit/creditCalc'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import CreditInstallmentModal from './CreditInstallmentModal'
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
    userId, creditCards, fromExpense, initialValue
}) {
    const [showInstallmentModal, setShowInstallmentModal] = useState(false)
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState(null)
    const [editingCard, setEditingCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [totalValue, setTotalValue] = useState('')
    const [installments, setInstallments] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState('')

    

    

    useEffect(() => {
        if (fromExpense && cards.length > 0) {
            setSelectedCard(cards[0])
            setTotalValue(Number(initialValue))
            setInstallments(1)
            setPurchaseDate(new Date().toISOString().slice(0, 10))
            setShowInstallmentModal(true)
        }
    }, [fromExpense, cards, initialValue])

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

    const usedLimit = useMemo(() => {
        if (!invoices.length) return 0

        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()

        return invoices
            .filter(inv => {
            const [month, year] = inv.month.split('/')
            return Number(month) - 1 === currentMonth && Number(year) === currentYear
            })
            .reduce((sum, inv) => sum + inv.value, 0)
    }, [invoices])

    const availableLimit = useMemo(() => {
            if (!selectedCard) return 0
            return selectedCard.creditLimit - usedLimit
        }, [selectedCard, usedLimit])
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
                type='button'
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
                    <div className="bg-white p-4 border rounded-xl space-y-3">
                    <h3 className="font-medium">
                        Cartão selecionado: {selectedCard.bank}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <Info label="Limite total" value={selectedCard.creditLimit} />
                        <Info label="Limite usado" value={usedLimit} />
                        <Info label="Limite disponível" value={availableLimit} />
                    </div>
                    </div>

                    <CreditInvoicesChart
                        invoices={invoices}
                        creditLimit={selectedCard.creditLimit}
                    />
                </>
            )}
            <CreditInstallmentModal
                isOpen={showInstallmentModal}
                onClose={() => setShowInstallmentModal(false)}
                cards={cards}
                selectedCard={selectedCard}
                onSelectCard={setSelectedCard}
                totalValue={totalValue}
                setTotalValue={setTotalValue}
                installments={installments}
                setInstallments={setInstallments}
                purchaseDate={purchaseDate}
                setPurchaseDate={setPurchaseDate}
            />
        </div>
    )
}
