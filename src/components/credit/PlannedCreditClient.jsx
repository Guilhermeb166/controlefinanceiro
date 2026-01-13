'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/backend/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserCreditCards } from '@/utils/credit/creditService.client'
import CreditPlannerForm from '@/components/credit/CreditPlannerForm'

export default function PlannedCreditClient() {
    const [user, setUser] = useState(null)
    const [creditCards, setCreditCards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async currentUser => {
            if (!currentUser) {
                setLoading(false)
                return
            }

            setUser(currentUser)
            const cards = await getUserCreditCards(currentUser.uid)
            setCreditCards(cards)
            setLoading(false)
            })

            return () => unsub()
    }, [])

    if (loading) return <p>Carregando...</p>
    if (!user) return <p>Você precisa estar logado.</p>

    return (
        <CreditPlannerForm
            userId={user.uid}
            creditCards={creditCards}
        />
    )
}
