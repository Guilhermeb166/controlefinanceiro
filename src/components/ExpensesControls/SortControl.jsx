"use client"
import { FormControl, Select, MenuItem } from "@mui/material"

export default function SortControl({ sortBy, setSortBy }) {
    return (
        <div>
                <FormControl size="small" sx={{
                    minWidth: 200,
                    backgroundColor: "white",
                    borderRadius:2,

                    "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#d1d5dc ", 
                    },
                    "&:hover fieldset": {
                        borderColor: "#d1d5dc ", 
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#B9BABDFF ", 
                    },
                    },
                }}
                >
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
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
