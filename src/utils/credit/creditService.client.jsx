'use client'

import { db } from '@/backend/firebase'
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore'

// Busca dados do cartão
export async function getUserCreditCard(userId) {
  if (!userId) return null

  const ref = doc(db, 'users', userId)
  const snap = await getDoc(ref)

  return snap.exists() ? snap.data().creditCard : null
}

// Salva / atualiza cartão
export async function saveUserCreditCard(userId, data) {
  await setDoc(
    doc(db, 'users', userId),
    { creditCard: data },
    { merge: true }
  )
}

// Busca compras de crédito
export async function getCreditPurchases(userId) {
  if (!userId) return []

  const q = query(
    collection(db, 'expenses'),
    where('userId', '==', userId),
    where('type', '==', 'Crédito')
  )

  const snap = await getDocs(q)
  return snap.docs.map(doc => doc.data())
}
