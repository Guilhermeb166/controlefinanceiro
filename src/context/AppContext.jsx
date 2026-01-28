"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@/backend/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, onSnapshot, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"

const AppContext = createContext()

export function AppProvider({children}) {
    const [user, setUser] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [creditCards, setCreditCards] = useState([])

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        if (!user?.uid) return

        const q = collection(db, "users", user.uid, "expenses")

        const unsubExpenses = onSnapshot(q, (snap) => {
            setExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        // Buscar cartões e suas parcelas
        const qCards = query(collection(db, "creditCards"), where("userId", "==", user.uid))
        const unsubCards = onSnapshot(qCards, async (snap) => {
            const cardsData = await Promise.all(snap.docs.map(async (cardDoc) => {
                const cardData = cardDoc.data()
                
                const instSnap = await getDocs(collection(db, "creditCards", cardDoc.id, "installments"))
                const parcelas = instSnap.docs.map(p => ({ id: p.id, ...p.data() }))
                return { id: cardDoc.id, ...cardData, parcelas }
            }))
            setCreditCards(cardsData)
        })

        return () => {
            unsubExpenses()
            unsubCards()
        }
    }, [user])

    async function addExpense(data) {
        if (!user?.uid) throw new Error("Usuário não autenticado")

        const docRef = await addDoc(collection(db, "users", user.uid, "expenses"), {
            ...data,
            observacao: data.observacao || "Sem Observação",
            createdAt: new Date(),
        })
        
       
        return docRef.id
    }

    async function removeExpense(id) {
        if (!user?.uid) return

        //  Buscar a despesa para ver se ela tem vínculo com cartão de crédito
        const expenseRef = doc(db, "users", user.uid, "expenses", id)
        const expenseSnap = await getDoc(expenseRef)
        
        if (expenseSnap.exists()) {
            const expenseData = expenseSnap.data()
            
            //  Se for do tipo Crédito, procurar em TODOS os cartões pela parcela vinculada a este expenseId
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

        // 1. Atualizar a despesa principal
        await updateDoc(ref, {
            ...updatedData,
            updatedAt: new Date()
        })

        // 2. Se for crédito, atualizar as parcelas no cartão
        if (updatedData.tipo === 'Crédito' && updatedData.cardId) {
            // Buscar parcelas existentes vinculadas a este expenseId
            const installmentsQ = query(
                collection(db, "creditCards", updatedData.cardId, "installments"),
                where("expenseId", "==", id)
            )
            const installmentsSnap = await getDocs(installmentsQ)
            
            // Remover parcelas antigas para reinserir as novas (mais simples para lidar com mudança no número de parcelas)
            for (const pDoc of installmentsSnap.docs) {
                await deleteDoc(doc(db, "creditCards", updatedData.cardId, "installments", pDoc.id))
            }

            // Inserir novas parcelas baseadas nos dados atualizados
            const totalValue = Number(updatedData.valor)
            const installmentsCount = Number(updatedData.installments) || 1
            const installmentValue = totalValue / installmentsCount
            
            // Converter data DD/MM/YYYY para YYYY-MM-DD para o Firebase
            const [day, month, year] = updatedData.data.split('/')
            const purchaseDate = `${year}-${month}-${day}`

            await addDoc(collection(db, "creditCards", updatedData.cardId, "installments"), {
                expenseId: id,
                description: updatedData.observacao || "Compra no Crédito",
                totalValue: totalValue,
                installments: installmentsCount,
                installmentValue: installmentValue,
                purchaseDate: purchaseDate,
                cardId: updatedData.cardId,
                createdAt: new Date()
            })
        }

        setExpenses(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, ...updatedData }
                    : item
            )
        )
    }

    return (
        <AppContext.Provider value ={{ expenses, creditCards, addExpense, removeExpense, updateExpense }}>
            {children}
        </AppContext.Provider>
    )
}

export function useExpenses() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error("useExpenses deve estar dentro do AppProvider")
    return ctx
}