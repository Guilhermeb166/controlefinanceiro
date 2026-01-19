/** biome-ignore-all assist/source/organizeImports: <> */
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@/backend/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, onSnapshot, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"

const AppContext = createContext()

export function AppProvider({children}) {
    const [user, setUser] = useState(null)
    const [expenses, setExpenses] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        if (!user?.uid) return

        const q = collection(db, "users", user.uid, "expenses")

        const unsub = onSnapshot(q, (snap) => {
        setExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        return () => unsub()
    }, [user])

    async function addExpense(data) {
        if (!user?.uid) throw new Error("Usuário não autenticado")

        const docRef = await addDoc(collection(db, "users", user.uid, "expenses"), {
            ...data,
            createdAt: new Date(),
        })
        
        // Retornamos o ID do documento recém-criado no Firestore
        return docRef.id
    }

    async function removeExpense(id) {
        if (!user?.uid) return

        // 1. Buscar a despesa para ver se ela tem vínculo com cartão de crédito
        const expenseRef = doc(db, "users", user.uid, "expenses", id)
        const expenseSnap = await getDoc(expenseRef)
        
        if (expenseSnap.exists()) {
            const expenseData = expenseSnap.data()
            
            // 2. Se for do tipo Crédito, procurar em TODOS os cartões pela parcela vinculada a este expenseId
            if (expenseData.tipo === 'Crédito') {
                // Como não sabemos em qual cartão está, buscamos em todos os cartões do usuário
                const cardsQ = query(collection(db, "creditCards"), where("userId", "==", user.uid))
                const cardsSnap = await getDocs(cardsQ)
                
                for (const cardDoc of cardsSnap.docs) {
                    const installmentsQ = query(
                        collection(db, "creditCards", cardDoc.id, "installments"),
                        where("expenseId", "==", id)
                    )
                    const installmentsSnap = await getDocs(installmentsQ)
                    for (const pDoc of installmentsSnap.docs) {
                        await deleteDoc(doc(db, "creditCards", cardDoc.id, "installments", pDoc.id))
                    }
                }
            }
        }

        // 3. Excluir a despesa principal
        await deleteDoc(expenseRef)
    }

    const updateExpense = async (id, updatedData) => {
        if (!id) throw new Error('ID inválido')

        const ref = doc(db, "users", user.uid, 'expenses', id)

        await updateDoc(ref, {
            ...updatedData,
            updatedAt: new Date()
        })

       
        setExpenses(prev =>
            prev.map(item =>
            item.id === id
                ? { ...item, ...updatedData }
                : item
            )
        )
    }

    return (
        <AppContext.Provider value ={{ expenses, addExpense, removeExpense, updateExpense }}>
            {children}
        </AppContext.Provider>
    )
}

export function useExpenses() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error("useExpenses deve estar dentro do AppProvider")
    return ctx
}