/**
 * Contexto global da aplicação que gerencia o estado de autenticação, despesas e cartões de crédito.
 */
"use client"
import { createContext, useContext, useEffect, useState } from "react"
//import { useRouter } from "next/navigation"
import { auth, db } from "@/backend/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, onSnapshot, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"

const AppContext = createContext()

export function AppProvider({children}) {
    const [user, setUser] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [creditCards, setCreditCards] = useState([])
    //const router = useRouter()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        if (!user?.uid) return

        // Listener para despesas principais
        const qExpenses = collection(db, "users", user.uid, "expenses")
        const unsubExpenses = onSnapshot(qExpenses, (snap) => {
            setExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        // Listener para cartões de crédito e suas subcoleções de parcelas
        const qCards = query(collection(db, "creditCards"), where("userId", "==", user.uid))
        
        // Mapa para guardar os unsubscribes das parcelas de cada cartão
        const installmentUnsubs = {}

        const unsubCards = onSnapshot(qCards, (cardsSnap) => {
            const cardsBaseData = cardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), parcelas: [] }))
            
            // Para cada cartão, vamos ouvir a subcoleção de parcelas em tempo real
            cardsSnap.docs.forEach(cardDoc => {
                const cardId = cardDoc.id
                
                // Se já temos um listener para este cartão, não criamos outro
                if (!installmentUnsubs[cardId]) {
                    const qInstallments = collection(db, "creditCards", cardId, "installments")
                    installmentUnsubs[cardId] = onSnapshot(qInstallments, (instSnap) => {
                        const parcelas = instSnap.docs.map(p => ({ id: p.id, ...p.data() }))
                        
                        setCreditCards(prevCards => 
                            prevCards.map(c => 
                                c.id === cardId ? { ...c, parcelas } : c
                            )
                        )
                    })
                }
            })

            // Limpar listeners de cartões que foram deletados
            Object.keys(installmentUnsubs).forEach(id => {
                if (!cardsSnap.docs.find(d => d.id === id)) {
                    installmentUnsubs[id]()
                    delete installmentUnsubs[id]
                }
            })

            setCreditCards(prev => {
                // Preservar as parcelas que já temos nos novos dados dos cartões
                return cardsBaseData.map(newCard => {
                    const existingCard = prev.find(c => c.id === newCard.id)
                    return {
                        ...newCard,
                        parcelas: existingCard ? existingCard.parcelas : []
                    }
                })
            })
        })

        return () => {
            unsubExpenses()
            unsubCards()
            // biome-ignore lint/suspicious/useIterableCallbackReturn: <>
            Object.values(installmentUnsubs).forEach(unsub => unsub())
        }
    }, [user])

     // Função para forçar atualização da página
   /* const refreshData = () => {
        router.refresh()
        
        setTimeout(() => {
            window.location.reload()
        }, 500)
    }*/

    async function addExpense(data) {
        if (!user?.uid) throw new Error("Usuário não autenticado")

        const docRef = await addDoc(collection(db, "users", user.uid, "expenses"), {
            ...data,
            observacao: data.observacao || "Sem Observação",
            createdAt: new Date(),
        })

        // Se não for crédito, recarrega logo. Se for crédito, o modal de parcelas cuidará disso.
       /* if (data.tipo !== 'Crédito') {
            refreshData()
        }*/
        
        return docRef.id
    }

    async function removeExpense(id) {
        if (!user?.uid) return

        const expenseRef = doc(db, "users", user.uid, "expenses", id)
        const expenseSnap = await getDoc(expenseRef)
        
        if (expenseSnap.exists()) {
            const expenseData = expenseSnap.data()
            
            if (expenseData.tipo === 'Crédito') {
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

        await deleteDoc(expenseRef)
       // refreshData()
    }

    const updateExpense = async (id, updatedData) => {
        if (!id) throw new Error('ID inválido')

        const ref = doc(db, "users", user.uid, 'expenses', id)

        await updateDoc(ref, {
            ...updatedData,
            updatedAt: new Date()
        })

        if (updatedData.tipo === 'Crédito' && updatedData.cardId) {
            const installmentsQ = query(
                collection(db, "creditCards", updatedData.cardId, "installments"),
                where("expenseId", "==", id)
            )
            const installmentsSnap = await getDocs(installmentsQ)
            
            for (const pDoc of installmentsSnap.docs) {
                await deleteDoc(doc(db, "creditCards", updatedData.cardId, "installments", pDoc.id))
            }

            const totalValue = Number(updatedData.valor)
            const installmentsCount = Number(updatedData.installments) || 1
            const installmentValue = totalValue / installmentsCount
            
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
                categoria: updatedData.categoria || { id: "parcelaCredito", nome: "Parcela do Cartão de Crédito" },
                subcategoria: updatedData.subcategoria || null,
                createdAt: new Date()
            })
        }
        
        //refreshData()
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
