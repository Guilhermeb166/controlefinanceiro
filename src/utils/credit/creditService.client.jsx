/**
 * Serviços de CRUD para cartões de crédito e parcelamentos no Firestore.
 */
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

  const cards = await Promise.all(snapshot.docs.map(async (cardDoc) => {
    const cardData = cardDoc.data();
    const installmentsQ = collection(db, "creditCards", cardDoc.id, "installments");
    const installmentsSnap = await getDocs(installmentsQ);
    const parcelas = installmentsSnap.docs.map(pDoc => ({
      id: pDoc.id,
      ...pDoc.data()
    }));

    return {
      id: cardDoc.id,
      ...cardData,
      parcelas
    };
  }));

  return cards;
}

/**
 * Adicionar parcelas a um cartão
 */
export async function addInstallment(cardId, installmentData) {
  await addDoc(collection(db, "creditCards", cardId, "installments"), {
    ...installmentData,
    createdAt: new Date()
  });
}
