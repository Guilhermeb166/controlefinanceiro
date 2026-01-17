'use client'
import { useState } from 'react'
import Modal from 'react-modal'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { addInstallment } from '@/utils/credit/creditService.client'

export default function CreditInstallmentModal({
    isOpen,
    onClose,
    cards,
    selectedCard,
    onSelectCard,
    totalValue,
    setTotalValue,
    installments,
    setInstallments,
    purchaseDate,
    setPurchaseDate,
    onSuccess,
    expenseId
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const handleConfirm = async () => {
        if (!selectedCard) {
            alert('Selecione um cartão')
            return
        }

        if (!expenseId) {
            alert('Nenhuma transação vinculada!')
            return
        }

        setLoading(true)
        try {
            const installmentData = {
                totalValue: Number(totalValue),
                installments: Number(installments),
                installmentValue: Number(totalValue) / Number(installments),
                purchaseDate: purchaseDate || new Date().toISOString().slice(0, 10),
                cardId: selectedCard.id,
                bank: selectedCard.bank,
                expenseId: expenseId || null
            }

            await addInstallment(selectedCard.id, installmentData)

            if (onSuccess) {
                await onSuccess()
            }
            router.replace('/plannedCredit')
            onClose()
        } catch (error) {
            console.error("Erro ao salvar parcelas:", error)
            alert("Erro ao salvar parcelas. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="w-[90%] sm:w-full max-w-[400px] sm:max-w-lg bg-white p-4 sm:p-6 relative outline-none rounded-xl shadow-2xl"
            overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-500/40 bg-opacity-80 backdrop-blur-sm z-50"
        >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Parcelamento da compra
            </h2>

            <div className="space-y-4 flex flex-col gap-8">


                <TextField
                    fullWidth
                    label="Valor Total"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Data da Compra"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                />

                <FormControl fullWidth size="small">
                    <InputLabel>Cartão</InputLabel>
                    <Select
                        value={selectedCard?.id || ''}
                        label="Cartão"
                        onChange={(e) =>
                            onSelectCard(cards.find(c => c.id === e.target.value))
                        }
                    >
                        {cards.map(card => (
                            <MenuItem key={card.id} value={card.id}>
                                {card.bank} {card.cardNumber?.slice(-4)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel>Parcelas</InputLabel>
                    <Select
                        value={installments}
                        label="Parcelas"
                        onChange={(e) => setInstallments(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24].map(n => (
                            <MenuItem key={n} value={n}>
                                {n}x de {((totalValue || 0) / n).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="pt-1 flex gap-3 justify-center">
                    <button
                        type='button'
                        variant="outlined"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full max-w-60 border-gray-300 border shadow-2xl hover:border-gray-500 transition-all duration-300  text-gray-600 cursor-pointer rounded py-1.5"
                    >
                        Cancelar
                    </button>
                    <button
                        type='button'
                        variant="contained"
                        onClick={handleConfirm}
                        disabled={loading || !selectedCard || !totalValue}
                        className="w-full max-w-60 bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white cursor-pointer rounded py-1.5"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
