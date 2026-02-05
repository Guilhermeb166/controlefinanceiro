/**
 * Componente de seleção para ordenação das transações com tema escuro
 */
"use client"

import { FormControl, Select, MenuItem } from "@mui/material"

export default function SortControl({ sortBy, setSortBy }) {
    return (
        <div>
            <FormControl size="small" sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-root": {
                    color: 'white',
                    backgroundColor: '#0F1419',
                    "& fieldset": {
                        borderColor: "#2d3748",
                    },
                    "&:hover fieldset": {
                        borderColor: "#059669",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#059669",
                    },
                },
                "& .MuiSvgIcon-root": {
                    color: 'white',
                },
            }}>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: '#1a1f2e',
                                color: 'white',
                                border: '1px solid #2d3748',
                                '& .MuiMenuItem-root': {
                                    '&:hover': {
                                        backgroundColor: '#2d3748',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#059669',
                                        '&:hover': {
                                            backgroundColor: '#047857',
                                        },
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="date-desc">Data (mais recente)</MenuItem>
                    <MenuItem value="date-asc">Data (mais antiga)</MenuItem>
                    <MenuItem value="value-desc">Valor (maior)</MenuItem>
                    <MenuItem value="value-asc">Valor (menor)</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
