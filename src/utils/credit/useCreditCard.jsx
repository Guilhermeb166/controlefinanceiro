'use client'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/backend/firebase'

// Hook responsável pelo cartão de crédito
export function useCreditCard(initialCard) {
    const [card, setCard] = useState(initialCard)
    const [isModalOpen, setIsModalOpen] = useState(!initialCard)

    async function saveCard(data, userId) {
        await updateDoc(doc(db, 'users', userId), {
        creditCard: data,
        })

        setCard(data)
        setIsModalOpen(false)
    }

    return {
        card,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        saveCard,
    }
}
