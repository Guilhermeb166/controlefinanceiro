import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore"
import { db } from "@/backend/firebase"

/**
 * Criar cartão
 */
export async function createCreditCard(userId, data) {
  await addDoc(collection(db, "creditCards"), {
    ...data,
    userId,
    createdAt: new Date()
  })
}

/**
 * Atualizar cartão
 */
export async function updateCreditCard(cardId, data) {
  await updateDoc(doc(db, "creditCards", cardId), data)
}

/**
 * Excluir cartão
 */
export async function deleteCreditCard(cardId) {
  await deleteDoc(doc(db, "creditCards", cardId))
}

/**
 * Buscar cartões do usuário
 */
export async function getUserCreditCards(userId) {
  const q = query(
    collection(db, "creditCards"),
    where("userId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
