/**
 * Componente que exibe o histórico de transações do cofrinho com filtros e ordenação.
 */
"use client"

import { useState, useMemo } from "react"
import { formatCurrency } from "@/utils/FormatCurrency"
import { MdEdit, MdDelete } from "react-icons/md"
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
} from "@mui/material"

export default function PiggyBankHistory({ transactions, onEdit, onDelete }) {
    const [sortBy, setSortBy] = useState("date-desc")
    const [filterType, setFilterType] = useState("all")

    const filteredAndSorted = useMemo(() => {
        let data = [...transactions]

        if (filterType === "deposits") {
            data = data.filter(t => t.tipo === "Depósito")
        } else if (filterType === "withdrawals") {
            data = data.filter(t => t.tipo === "Retirada")
        }

        switch (sortBy) {
            case "value-desc":
                data.sort((a, b) => b.valor - a.valor)
                break
            case "value-asc":
                data.sort((a, b) => a.valor - b.valor)
                break
            case "date-asc":
                data.sort((a, b) => {
                    const dateA = new Date(a.data.split("/").reverse().join("-"))
                    const dateB = new Date(b.data.split("/").reverse().join("-"))
                    return dateA - dateB
                })
                break
            case "date-desc":
            default:
                data.sort((a, b) => {
                    const dateA = new Date(a.data.split("/").reverse().join("-"))
                    const dateB = new Date(b.data.split("/").reverse().join("-"))
                    return dateB - dateA
                })
        }

        return data
    }, [transactions, sortBy, filterType])

    if (transactions.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: "center" }}>
                <svg aria-hidden="true" className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>Nenhuma transação no cofrinho ainda</p>
                <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.5rem" }}>Comece a guardar dinheiro fazendo um depósito!</p>
            </Paper>
        )
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1f2937", margin: 0 }}>Histórico de Transações</h2>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, width: { xs: "100%", sm: "auto" } }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel sx={{ zIndex: 0 }}>Filtrar por tipo</InputLabel>
                        <Select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            label="Filtrar por tipo"
                        >
                            <MenuItem value="all">Todas as transações</MenuItem>
                            <MenuItem value="deposits">Apenas depósitos</MenuItem>
                            <MenuItem value="withdrawals">Apenas retiradas</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel sx={{ zIndex: 0 }}>Ordenar por</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            label="Ordenar por"
                        >
                            <MenuItem value="date-desc">Data (mais recente)</MenuItem>
                            <MenuItem value="date-asc">Data (mais antiga)</MenuItem>
                            <MenuItem value="value-desc">Valor (maior)</MenuItem>
                            <MenuItem value="value-asc">Valor (menor)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Data</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Tipo</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>Descrição</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, color: "#374151" }}>Valor</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, color: "#374151" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAndSorted.map((transaction) => (
                            <TableRow key={transaction.id} sx={{ "&:hover": { backgroundColor: "#f9fafb" }, borderBottom: "1px solid #f3f4f6" }}>
                                <TableCell sx={{ color: "#374151" }}>{transaction.data}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "inline-block",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: "9999px",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            backgroundColor: transaction.tipo === "Depósito" ? "#d1fae5" : "#fee2e2",
                                            color: transaction.tipo === "Depósito" ? "#047857" : "#991b1b",
                                        }}
                                    >
                                        {transaction.tipo}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ color: "#374151" }}>
                                    {transaction.observacao || "Sem descrição"}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 600,
                                        color: transaction.tipo === "Depósito" ? "#059669" : "#dc2626",
                                    }}
                                >
                                    {transaction.tipo === "Depósito" ? "+" : "-"}
                                    {formatCurrency(transaction.valor)}
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                        {/*<Tooltip title="Editar">
                                            <IconButton
                                                size="small"
                                                onClick={() => onEdit(transaction)}
                                                sx={{ color: "#2563eb", "&:hover": { backgroundColor: "#eff6ff" } }}
                                            >
                                                <MdEdit size={18} />
                                            </IconButton>
                                        </Tooltip>*/}
                                        <Tooltip title="Deletar">
                                            <IconButton
                                                size="small"
                                                onClick={() => onDelete(transaction.id)}
                                                sx={{ color: "#dc2626", "&:hover": { backgroundColor: "#fef2f2" } }}
                                            >
                                                <MdDelete size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
