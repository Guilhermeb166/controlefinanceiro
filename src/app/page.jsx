'use client'

import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState, useMemo   } from "react";
import { auth } from "@/backend/firebase"
import ImportExtract from "@/components/ImportExtract";
import Model from "@/components/Model";
import Table from "@/components/Table";
import { useExpenses } from "@/context/AppContext"
import { formatCurrency } from "@/utils/FormatCurrency";
import {useAppRouter} from "@/utils/useAppRouter"
import ExpensesControls from "@/components/ExpensesControls/ExpensesControls";

export default function Home() {
    const [user, setUser] = useState(null)
    const { expenses } = useExpenses()
    const router = useAppRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [sortBy, setSortBy] = useState("date-desc")
    const [filters, setFilters] = useState({
        tipo:"all",
        month:"all",
        year:"all"
    })
    const [appliedFilters, setAppliedFilters] = useState(filters)
    

     function applyFilters() {
        setAppliedFilters(filters)
    }

    const summary = useMemo(() => {
        return (expenses ?? []).reduce(
            (acc, item) => {
                if (item.tipo === "Receita") {
                acc.entradas += item.valor
                acc.total += item.valor
                } else {
                acc.saidas += item.valor
                acc.total -= item.valor
                }
                return acc
            },
            { entradas: 0, saidas: 0, total: 0 }
            )
    }, [expenses])


    const filteredExpenses = useMemo(() => {
        let data = [...(expenses ?? [])]

        if (appliedFilters.tipo !== "all") {
            if (appliedFilters.tipo === "Despesa") {
                data = data.filter(e =>
                e.tipo === "Crédito" ||
                e.tipo === "Débito/Pix"
                )
            } else {
                data = data.filter(e => e.tipo === appliedFilters.tipo)
            }
        }

    if (appliedFilters.month !== "all" || appliedFilters.year !== "all") {
      data = data.filter(e => {
        const [_, month, year] = e.data.split("/")

        if (
          appliedFilters.month !== "all" &&
          Number(month) !== Number(appliedFilters.month)
        ) {
          return false
        }

        if (
          appliedFilters.year !== "all" &&
          Number(year) !== Number(appliedFilters.year)
        ) {
          return false
        }

        return true
      })
    }


    switch (sortBy) {
        case "value-desc":
            data.sort((a, b) => b.valor - a.valor)
            break
        case "value-asc":
            data.sort((a, b) => a.valor - b.valor)
            break
        case "date-asc":
            data.sort(
            (a, b) =>
                new Date(a.data.split("/").reverse().join("-")) -
                new Date(b.data.split("/").reverse().join("-"))
            )
            break
        case "date-desc":
        default:
            data.sort(
            (a, b) =>
                new Date(b.data.split("/").reverse().join("-")) -
                new Date(a.data.split("/").reverse().join("-"))
            )
        }

        return data
    }, [expenses, sortBy, appliedFilters])
  
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
        })

        return () => unsub()
    }, [])

    return (
        <main className="min-h-screen bg-neutral-200">
            <Model
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <section className="h-60 bg-emerald-600 pt-8">
                <div className="max-w-5xl mx-auto flex justify-between">
                    <h1 className="text-white text-4xl font-semibold ">Minhas Despesas</h1>
                    <div className="flex items-center gap-3">
                        <ImportExtract />
                        <button
                        type="button"
                        className="flex items-center gap-1 rounded-md p-2 bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 transition-all duration-400 hover:-translate-y-0.5"
                        onClick={() => setIsOpen(true)}
                        >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Nova Transação
                        </button>
                        <button 
                            type="button"
                            className="flex items-center gap-1 rounded-md p-2 bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 transition-all duration-400 hover:-translate-y-0.5"
                            onClick={()=>router.goLogin()}
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            {user && (
                                <span className="text-white font-medium">
                                {user.displayName}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </section>
            <section className="max-w-5xl mx-auto">
                <div className="max-w-5xl mx-auto flex gap-5 h-[120px] -mt-[60px]">
                    <div className="flex flex-col flex-1 bg-gray-100 rounded border-gray-300 shadow-md shadow-gray-300 p-3 justify-between">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl text-emerald-700 font-semibold">Entradas</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-emerald-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold">{formatCurrency(summary.entradas)}</h1>
                    </div>
                    <div className="flex flex-col flex-1 bg-gray-100 rounded border-gray-300 shadow-md shadow-gray-300 p-3 justify-between">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl text-red-700 font-semibold">Saídas</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-red-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold">{formatCurrency(summary.saidas)}</h1>
                    </div>
                    <div className="flex flex-col flex-1 bg-emerald-500 rounded border-gray-300 shadow-md p-3 justify-between">
                        <div className="flex justify-between items-center text-white">
                            <h3 className="text-3xl font-semibold">Total</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-white text-3xl font-semibold">{formatCurrency(summary.total)}</h1>
                    </div>
                </div>
                <ExpensesControls
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filters={filters}
                    setFilters={setFilters}
                    onApplyFilters={applyFilters}
                    expenses={filteredExpenses}
                />
                <Table expenses={filteredExpenses}/>
            </section>
        </main>
    );
}
