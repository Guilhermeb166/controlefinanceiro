'use client'

import UserAuthButton from "@/components/UserAuthButton/UserAuthButton"
import { useState, useMemo } from "react";

import ImportExtract from "@/components/ImportExtract";
import Model from "@/components/Model";
import Table from "@/components/Table";
import { useExpenses } from "@/context/AppContext"
import { formatCurrency } from "@/utils/FormatCurrency";

import ExpensesControls from "@/components/ExpensesControls/ExpensesControls";
import AppSnackbar from "@/components/AppSnackbar";



export default function Home() {

    const { expenses } = useExpenses()

    const [isOpen, setIsOpen] = useState(false)
    
    
    const [sortBy, setSortBy] = useState("date-desc")
    const [filters, setFilters] = useState({
        tipo: "all",
        month: "all",
        year: "all"
    })
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })
    const [appliedFilters, setAppliedFilters] = useState(filters)


    function applyFilters() {
        setAppliedFilters(filters)
    }



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
                if (!e?.data) return false
                
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
                        new Date((a.data || "").split("/").reverse().join("-")) -
                        new Date((b.data || "").split("/").reverse().join("-"))
                )
                break
            case "date-desc":
            default:
                data.sort(
                    (a, b) =>
                        new Date((b.data || "").split("/").reverse().join("-")) -
                        new Date((a.data || "").split("/").reverse().join("-"))
                )
        }

        return data
    }, [expenses, sortBy, appliedFilters])

    const summary = useMemo(() => {
        return (filteredExpenses ?? []).reduce(
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
    }, [filteredExpenses])

    

    return (
        <main className="min-h-screen bg-neutral-200 pb-30">
            
            <Model
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setSnackbar={setSnackbar}
            />
            <section className="min-h-40 lg:h-55 bg-emerald-600 py-8 px-4">

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:flex-wrap items-center gap-8 md:justify-between relative px-5">
                    
                    <h1 className="text-white text-3xl lg:text-4xl font-semibold">Minhas Despesas</h1>
                    <div className="flex items-center gap-3 flex-wrap sm:flex-row justify-center">
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
                        <UserAuthButton />
                    </div>
                    
                </div>
            </section>
            <section className="max-w-[1000px] mx-auto mt-4 lg:mt-0 px-4 lg:px-1">
                <div className="max-w-5xl mx-auto gap-4 lg:-mt-[60px] flex flex-col lg:flex-row ">
                    <div className="flex flex-col flex-1 bg-gray-100 rounded border-gray-300 shadow-md shadow-gray-300 p-3 justify-between w-full">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl sm:text-3xl text-emerald-700 font-semibold">Entradas</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 sm:size-9 text-emerald-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold">{formatCurrency(summary.entradas)}</h1>
                    </div>
                    <div className="flex flex-col flex-1 bg-gray-100 rounded border-gray-300 shadow-md shadow-gray-300 p-3 justify-between w-full">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl sm:text-3xl text-red-700 font-semibold">Saídas</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 sm:size-9 text-red-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold">{formatCurrency(summary.saidas)}</h1>
                    </div>
                    <div className="flex flex-col flex-1 bg-emerald-500 rounded border-gray-300 shadow-md p-3 justify-between w-full">
                        <div className="flex justify-between items-center text-white">
                            <h3 className="text-2xl sm:text-3xl font-semibold">Total</h3>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 sm:size-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-white text-2xl sm:text-3xl font-semibold">{formatCurrency(summary.total)}</h1>
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
                <Table expenses={filteredExpenses} />
            </section>
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            />
        </main>
    );
}
