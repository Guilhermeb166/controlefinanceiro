/** biome-ignore-all assist/source/organizeImports: <> */
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@/backend/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"

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

        await addDoc(collection(db, "users", user.uid, "expenses"), {
        ...data,
        createdAt: new Date(),
        })
    }

    async function removeExpense(id) {
        if (!user?.uid) return

        await deleteDoc(doc(db, "users", user.uid, "expenses", id))
    }

    return (
        <AppContext.Provider value ={{ expenses, addExpense, removeExpense }}>
            {children}
        </AppContext.Provider>
    )
}

export function useExpenses() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error("useExpenses deve estar dentro do AppProvider")
    return ctx
}