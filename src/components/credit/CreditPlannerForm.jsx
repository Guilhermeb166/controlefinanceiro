'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'


import CreditInstallmentModal from './CreditInstallmentModal'
import CreditCardModal from './CreditCardModal'
import CreditInvoicesChart from './CreditInvoicesChart'
import CreditCardInfoCard from './CreditCardInfoCard'
import {
    createCreditCard,
    updateCreditCard,
    deleteCreditCard,
    getUserCreditCards
} from "@/utils/credit/creditService.client"
import { calculateUsedLimit, calculateTotalCommittedLimit } from '@/utils/credit/calculateUsedLimit'
import { formatCurrency } from '@/utils/FormatCurrency'
import { useExpenses } from '@/context/AppContext'

export default function CreditPlannerForm({
    userId, creditCards: initialCreditCards, fromExpense, initialValue, expenseId
}) {
    const { expenses } = useExpenses()
    const [showInstallmentModal, setShowInstallmentModal] = useState(false)
    const [cards, setCards] = useState(initialCreditCards || [])
    const [selectedCard, setSelectedCard] = useState(null)
    const [editingCard, setEditingCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [totalValue, setTotalValue] = useState(initialValue || '')
    const [installments, setInstallments] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10))

    const refreshCards = useCallback(async () => {
        const refreshed = await getUserCreditCards(userId)
        setCards(refreshed)
        if (selectedCard) {
            const updatedSelected = refreshed.find(c => c.id === selectedCard.id)
            setSelectedCard(updatedSelected || refreshed[0] || null)
        } else {
            setSelectedCard(refreshed[0] || null)
        }
    }, [userId, selectedCard])

    useEffect(() => {
        if (initialCreditCards && initialCreditCards.length > 0) {
            setCards(initialCreditCards)
            setSelectedCard(initialCreditCards[0])
        } else if (!initialCreditCards || initialCreditCards.length === 0) {
            setShowModal(true)
        }
    }, [initialCreditCards])

    useEffect(() => {
        if (fromExpense && cards.length > 0) {
            setTotalValue(Number(initialValue))
            setShowInstallmentModal(true)
        }
    }, [fromExpense, cards.length, initialValue])

    const chartData = useMemo(() => {
        const monthsToShow = 12
        const data = []
        const now = new Date()
        
        for (let i = 0; i < monthsToShow; i++) {
            const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1)
            const m = targetDate.getMonth()
            const y = targetDate.getFullYear()

            // 1. Fatura do Cartão Selecionado (Verde)
            let selectedValue = 0
            if (selectedCard) {
                selectedValue = calculateUsedLimit({
                    expenses,
                    creditCard: selectedCard,
                    month: m,
                    year: y
                })
            }

            // 2. Fatura Total de TODOS os cartões (Azul)
            let totalValueAllCards = 0
            cards.forEach(card => {
                totalValueAllCards += calculateUsedLimit({
                    expenses,
                    creditCard: card,
                    month: m,
                    year: y
                })
            })

            data.push({
                month: targetDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase(),
                selected: selectedValue,
                totalAll: totalValueAllCards
            })
        }
        return data
    }, [selectedCard, cards, expenses])

    async function handleSaveCard(data) {
        if (editingCard) {
            await updateCreditCard(editingCard.id, data)
        } else {
            await createCreditCard(userId, data)
        }
        await refreshCards()
        setEditingCard(null)
        setShowModal(false)
    }

    async function handleDeleteCard(cardId) {
        if (confirm("Tem certeza que deseja excluir este cartão?")) {
            await deleteCreditCard(cardId)
            await refreshCards()
        }
    }

    // Limite usado na fatura do mês atual
    const currentMonthInvoice = useMemo(() => {
        if (!selectedCard) return 0
        const now = new Date()
        return calculateUsedLimit({
            expenses,
            creditCard: selectedCard,
            month: now.getMonth(),
            year: now.getFullYear()
        })
    }, [expenses, selectedCard])

    // Limite total comprometido (todas as parcelas futuras)
    const totalCommitted = useMemo(() => {
        if (!selectedCard) return 0
        return calculateTotalCommittedLimit(selectedCard)
    }, [selectedCard])

    const availableLimit = useMemo(() => {
        if (!selectedCard) return 0
        return selectedCard.creditLimit - totalCommitted
    }, [selectedCard, totalCommitted])

    return (
        <div className="space-y-6 pb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Meus Cartões</h2>
                <button
                    type='button'
                    onClick={() => {
                        setEditingCard(null)
                        setShowModal(true)
                    }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium"
                >
                    + Novo Cartão
                </button>
            </div>

            {cards.length > 0 ? (
                <div className="flex flex-wrap items-center gap-3 md:gap-6">
                    {cards.map(card => (
                        <CreditCardInfoCard
                            key={card.id}
                            card={card}
                            isSelected={selectedCard?.id === card.id}
                            onEdit={() => {
                                setEditingCard(card)
                                setShowModal(true)
                            }}
                            onDelete={() => handleDeleteCard(card.id)}
                            onSelect={() => setSelectedCard(card)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">Nenhum cartão cadastrado.</p>
                </div>
            )}

            <CreditCardModal
                isOpen={showModal}
                onSave={handleSaveCard}
                onClose={() => setShowModal(false)}
                card={editingCard}
            />

            {selectedCard && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Análise: {selectedCard.bank}
                            </h3>
                            <p className="text-sm text-gray-500">Resumo de faturas e limites</p>
                        </div>
                        
                        <div className="flex gap-4 flex-col items-center sm:flex-row">
                            <Info label="Limite Total" value={selectedCard.creditLimit} color="text-blue-600 flex flex-col items-center" />
                            <Info label="Fatura Atual" value={currentMonthInvoice} color="text-red-500 flex flex-col items-center" />
                            <Info label="Limite Disponível" value={availableLimit} color="text-emerald-600 flex flex-col items-center" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
                            Comparativo de Faturas (Próximos 12 meses)
                        </h4>
                        <CreditInvoicesChart
                            invoices={chartData}
                            creditLimit={selectedCard.creditLimit}
                        />
                    </div>
                    
                   
                </div>
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
                onSuccess={refreshCards}
                expenseId={expenseId}
            />
        </div>
    )
}

function Info({ label, value, color = "text-gray-900" }) {
    return (
        <div className="text-right md:text-left">
            <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
            <p className={`text-lg font-bold ${color}`}>
                {formatCurrency(value ?? 0)}
            </p>
        </div>
    )
}
