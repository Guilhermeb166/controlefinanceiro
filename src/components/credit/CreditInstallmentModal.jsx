'use client'
import Modal from 'react-modal'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'

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
  setPurchaseDate
}) {
    return (
        <Modal
            isOpen={isOpen}
            className="w-[90%] sm:w-full max-w-[400px] sm:max-w-lg bg-white p-4 sm:p-6 relative outline-none rounded-xl"
            overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center
            bg-gray-500/40 bg-opacity-80 backdrop-blur-sm"
        >
        <h2 className="text-xl font-semibold mb-4">
            Parcelamento da compra
        </h2>

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
                        {card.bank}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl fullWidth size="small" className="mt-3">
            <InputLabel>Parcelas</InputLabel>
            <Select
                value={installments}
                label="Parcelas"
                onChange={(e) => setInstallments(Number(e.target.value))}
            >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                <MenuItem key={n} value={n}>
                    {n}x de {(totalValue / n).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    })}
                </MenuItem>
                ))}
            </Select>
        </FormControl>

        <button
            type='button'
            onClick={onClose}
            className="mt-4 w-full bg-emerald-600 text-white py-3 rounded-lg"
        >
            Confirmar
        </button>
        </Modal>
    )
}
