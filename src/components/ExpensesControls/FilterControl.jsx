"use client"
import {FormControl, Select, MenuItem} from '@mui/material'

export default function FilterControl({ filters, setFilters, onApplyFilters, creditCards  }) {

    const years = Array.from({ length: 6}, (_, i) =>
        new Date().getFullYear() - i
    )

    return (
        
            <div className='flex flex-col gap-4'>
                <p className="text-xl text-start tracking-[0.5px]">Filtros</p>
                <div className='flex flex-wrap gap-3'>
                    <FormControl size="small" fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#d1d5dc ", 
                                },
                                "&:hover fieldset": {
                                    borderColor: "#d1d5dc ", 
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#009966 ", 
                                },
                            },
                        }}
                    >
                        <Select
                            value={filters.tipo}
                            onChange={(e) =>
                                setFilters({ ...filters, tipo: e.target.value })
                            }
                            displayEmpty
                        >
                            <MenuItem value="all">Todos os tipos</MenuItem>
                            <MenuItem value="Receita">Receita</MenuItem>
                            <MenuItem value="Despesa">Despesa</MenuItem>
                            
                        </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#d1d5dc ", 
                                },
                                "&:hover fieldset": {
                                    borderColor: "#d1d5dc ", 
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#009966 ", 
                                },
                            },
                        }}
                    >
                        <Select
                            value={filters.cardId || "all"}
                            onChange={(e) =>
                                setFilters({ ...filters, cardId: e.target.value })
                            }
                            displayEmpty
                        >
                            <MenuItem value="all">Todos os cartões</MenuItem>
                            {creditCards?.map(card => (
                                <MenuItem key={card.id} value={card.id}>
                                    {card.bank} {card.cardNumber?.slice(-4)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Mês */}
                    <div className='flex justify-between w-full gap-3'>
                        <FormControl size="small" fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#d1d5dc ", 
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#d1d5dc ", 
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#009966 ", 
                                    },
                                },
                            }}
                        >
                            <Select
                                value={filters.month}
                                onChange={(e) =>
                                    setFilters({ ...filters, month: e.target.value })
                                }
                                displayEmpty
                            >
                                <MenuItem value="all">Todos os Meses</MenuItem>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <MenuItem key={i++} value={i + 1}>
                                    {String(i + 1).padStart(2, "0")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Ano */}
                        <FormControl size="small" fullWidth 
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#d1d5dc ", 
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#d1d5dc ", 
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#009966 ", 
                                    },
                                },
                            }}
                        >
                            <Select
                                value={filters.year}
                                onChange={(e) =>
                                    setFilters({ ...filters, year: e.target.value })
                                }
                                displayEmpty
                            >
                                <MenuItem value="all">Todos os Anos</MenuItem>
                                {years.map(year => (
                                    <MenuItem key={year} value={year}>
                                    {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <button
                        type="button"
                        onClick={onApplyFilters}
                        className="cursor-pointer mt-2 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 w-full"
                    >
                        Aplicar filtros
                    </button>
                </div>
         
        </div>
    )
}
