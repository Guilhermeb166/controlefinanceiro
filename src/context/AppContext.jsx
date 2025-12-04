"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

const AppContext = createContext()

export function AppProvider({children}) {
    const [expenses, setExpenses] = useState([])

    //Carregar items do localStorage
    useEffect(() => {
        const saved =  localStorage.getItem("expenses")
        if (saved) setExpenses(JSON.parse(saved))
    }, [])

    //Salvar no localStorage
    useEffect(() =>{
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])

    const addExpense = useCallback((nova) => {
        setExpenses((prev) => [...prev, nova])
    }, [])

    const removeExpense = useCallback((id) =>{
        setExpenses((prev) => prev.filter((d)=> d.id !== id))
    },[])
    //useCallback nas funções, Agora elas não são recriadas a cada render.

    const value = useMemo(
        ()=> ({
            expenses,
            addExpense,
            removeExpense,
        }),
        [expenses, addExpense, removeExpense]
    )

    return (
        <AppContext.Provider value ={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useExpenses() {
    return useContext(AppContext);
}
