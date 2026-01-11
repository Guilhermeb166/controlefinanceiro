'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/backend/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {
  getUserCreditCard,
  getCreditPurchases,
} from '@/utils/credit/creditService.client'
import CreditPlannerForm from '@/components/credit/CreditPlannerForm'

export default function PlannedCreditClient() {
    const [user, setUser] = useState(null)
    const [creditCard, setCreditCard] = useState(null)
    const [creditPurchases, setCreditPurchases] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async currentUser => {
            if (!currentUser) {
                setLoading(false)
                return
            }

            setUser(currentUser)

            const card = await getUserCreditCard(currentUser.uid)
            const purchases = await getCreditPurchases(currentUser.uid)

            setCreditCard(card)
            setCreditPurchases(purchases)
            setLoading(false)
            })

            return () => unsub()
    }, [])

    if (loading) return <p>Carregando...</p>
    if (!user) return <p>Você precisa estar logado.</p>

    return (
        <CreditPlannerForm
            userId={user.uid}
            creditCard={creditCard}
            creditPurchases={creditPurchases}
        />
    )
}
