import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { db } from '@/backend/firebase'

export async function getUserCreditCards(userId) {
  const snap = await getDocs(collection(db, 'users', userId, 'creditCards'))

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function saveUserCreditCard(userId, data, cardId = null) {
  if (cardId) {
    await updateDoc(
      doc(db, 'users', userId, 'creditCards', cardId),
      data
    )
    return
  }

  await addDoc(collection(db, 'users', userId, 'creditCards'), {
    ...data,
    createdAt: new Date(),
  })
}
