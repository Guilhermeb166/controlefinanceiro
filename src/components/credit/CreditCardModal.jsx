/**
 * Modal para cadastrar ou editar as informações de um cartão de crédito.
 */
'use client'

import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

export default function CreditCardModal({ isOpen, onSave, onClose, card }) {
    const [bank, setBank] = useState('')
    const [creditLimit, setCreditLimit] = useState('')
    const [closingDay, setClosingDay] = useState('')
    const [dueDay, setDueDay] = useState('')

    useEffect(() => {
        if (card) {
            setBank(card.bank)
            setCreditLimit(card.creditLimit)
            setClosingDay(card.closingDay)
            setDueDay(card.dueDay)
        }
    }, [card])

    function handleSave() {
        if (!bank || !creditLimit || !closingDay || !dueDay) {
            alert('Preencha todos os campos.')
            return
        }

        if (closingDay > dueDay) {
            alert('O dia do fechamento do cartão não pode ser depois do dia do vencimento !')
            return
        }

        if(closingDay > 30 || dueDay > 30){
            alert('Os dias de fechamento e vencimento não podem ser depois do dia 30!')
            return
        }

        onSave({
            bank,
            creditLimit: Number(creditLimit),
            closingDay: Number(closingDay),
            dueDay: Number(dueDay),
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="bg-white rounded-xl p-6 w-full ml max-w-lg outline-none"
            overlayClassName="fixed inset-0 bg-black/60 flex items-center px-3 justify-center z-50"
        >
            <div className='flex justify-between items-start relative'>
                <h2 className="text-xl font-semibold mb-4 ">
                    Dados do Cartão
                </h2>
                <span className='flex items-center justify-center'><IoClose className='text-3xl text-red-700 cursor-pointer' onClick={onClose}/></span>
            </div>

            <div className="space-y-3 flex flex-wrap gap-4 justify-center">
                <input
                    className="outline-none w-full input border border-gray-400 rounded-md px-3 py-2 focus:shadow-xl"
                    placeholder="Banco"
                    value={bank}
                    onChange={e => setBank(e.target.value)}
                />

                <input
                    className="outline-none input w-full appearance-none border border-gray-400 rounded-md px-3 py-2 focus:shadow-xl"
                    type="number"
                    placeholder="Limite total"
                    value={creditLimit}
                    onChange={e => setCreditLimit(e.target.value)}
                />

                <div className="flex gap-3 w-full justify-around">
                <input
                    className="outline-none input w-full appearance-none border border-gray-400 rounded-md px-3 py-2 focus:shadow-xl"
                    type="number"
                    placeholder="Fechamento"
                    value={closingDay}
                    onChange={e => setClosingDay(e.target.value)}
                />

                <input
                    className="outline-none input w-full appearance-none border border-gray-400 rounded-md px-3 py-2 focus:shadow-xl"
                    type="number"
                    placeholder="Vencimento"
                    value={dueDay}
                    onChange={e => setDueDay(e.target.value)}
                />
                </div>
            </div>

            <button
                type='button'
                onClick={handleSave}
                className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition cursor-pointer"
            >
                Salvar
            </button>
        </Modal>
    )
}
