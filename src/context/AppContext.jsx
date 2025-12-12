/** biome-ignore-all assist/source/organizeImports: <> */
"use client"
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/backend/firebase";
import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext()

export function AppProvider({children}) {
    const { data: session } = useSession();
    const [expenses, setExpenses] = useState(null)

    useEffect (()=>{
        if (!session?.user?.id) return

        const q = collection (db, "users", session.user.id, "expenses")

        const unsub = onSnapshot(q, snap => {
            setExpenses(
                snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
        })
        return ()=> unsub()
    }, [session])

    async function addExpense(data) {
        if  (!session?.user?.id){
            alert("Usuário não autenticado")
            throw new Error("Usuário não autenticado")
            
        }
        await addDoc(collection(db, "users", session.user.id, "expenses"),
        {
            ...data,
            createdAt: new Date(),
        })
    }

    async function removeExpense(id){
        try {
            if (!session?.user?.id) {
                console.error("ID do usuário ausente:", session?.user)
                return
            }
            await deleteDoc(doc(db, "users", session.user.id, "expenses", id))
            console.log("Deletado:", id)
        } catch (err) {
            console.error("Erro ao deletar:", err)
        }
    }

    return (
        <AppContext.Provider value ={{ expenses, addExpense, removeExpense }}>
            {children}
        </AppContext.Provider>
    )
}

export function useExpenses() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useExpenses deve ser usado dentro de AppProvider");
  }
  return context;
}