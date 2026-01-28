"use client"

import { useState } from "react"
import { CiFilter } from "react-icons/ci"
import FilterControl from "./FilterControl"
import SortControl from "./SortControl"
import { LuFileSpreadsheet } from "react-icons/lu";
import { exportExpensesToExcel } from "@/utils/exportExpensesToExcel"

export default function ExpensesControls({
    sortBy,
    setSortBy,
    filters,
    setFilters,
    onApplyFilters,
    expenses,
    creditCards
}) {

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    function handleApply() {
        onApplyFilters()
        setIsFilterOpen(false)
    }

    function countActiveFilters(filters) {
        return Object.values(filters).filter(value => value !== "all").length
    }

    const activeFiltersCount = countActiveFilters(filters)

    return (
        <>
            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start mt-6">
                <SortControl sortBy={sortBy} setSortBy={setSortBy}/>
                <div className="flex items-center gap-4 sm:gap-2">
                    <button
                        type="button"
                        onClick={()=>setIsFilterOpen(true)}
                        className="relative bg-white cursor-pointer flex items-center gap-2 px-4 sm:px-3 py-[9px] rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                        <CiFilter size={20}/>
                        {activeFiltersCount > 0 && (
                            <span
                                className="
                                    absolute -top-1 -right-1
                                    flex items-center justify-center
                                    h-5 min-w-5 px-1
                                    rounded-full
                                    bg-red-600
                                    text-white
                                    text-xs
                                    font-semibold
                                "
                            >
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={()=> exportExpensesToExcel(expenses)}
                        className="relative bg-white cursor-pointer flex items-center gap-2 px-4 sm:px-3 py-[9px] rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                        <LuFileSpreadsheet size={20}/>
                    </button>
                </div>
            </div>
            { isFilterOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsFilterOpen(false)
                        }
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="filter-dialog-title"
                >
                <div
                    className="bg-white py-4 px-6 rounded-lg shadow-lg w-[90%] sm:w-full max-w-md border-none"
                    role="dialog"
                    aria-modal="true"
                >
                    <FilterControl
                        filters={filters}
                        setFilters={setFilters}
                        onApplyFilters={handleApply}
                        creditCards={creditCards}
                    />

                    <button
                        type="button"
                        onClick={() => setIsFilterOpen(false)}
                        className="cursor-pointer  mt-3 w-full text-sm text-gray-500 hover:underline"
                    >
                        Cancelar
                    </button>
                </div>
        </div>
      )}
    </>
  )
}