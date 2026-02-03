/**
 * Modal para adicionar depósitos ao cofrinho.
 */
"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import dayjs from "dayjs"
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"

dayjs.locale("pt-br")

export default function DepositModal({
    isOpen,
    onClose,
    onSubmit,
}) {
    const [valor, setValor] = useState("")
    const [descricao, setDescricao] = useState("")
    const [data, setData] = useState(dayjs())
    const [error, setError] = useState("")

    useEffect(() => {
        if (isOpen) {
            setValor("")
            setDescricao("")
            setData(dayjs())
            setError("")
        }
    }, [isOpen])

    const handleSubmit = () => {
        if (!valor) {
            setError("Digite um valor para depositar")
            return
        }

        const numValue = Number(valor)
        if (numValue <= 0) {
            setError("O valor deve ser maior que zero")
            return
        }

        onSubmit({
            valor: numValue,
            descricao,
            data: data.format("DD/MM/YYYY"),
        })

        setValor("")
        setDescricao("")
        setData(dayjs())
        setError("")
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-500/40 bg-opacity-80 backdrop-blur-sm"
            className="w-[90%] sm:w-full max-w-[400px] sm:max-w-lg bg-white p-4 sm:p-6 relative outline-none rounded-xl"
        >
            <button
                type="button"
                className="absolute right-2 top-1 sm:right-4 sm:top-4"
                onClick={onClose}
            >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Depositar no Cofrinho
            </Typography>

            <Box sx={{ mb: 3, p: 2, backgroundColor: "#f0fdf4", borderRadius: 1, border: "1px solid #dcfce7" }}>
                <Typography variant="caption" sx={{ color: "#15803d", display: "block", mb: 0.5 }}>
                    Valor a depositar
                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    value={valor}
                    onChange={(e) => {
                        let raw = e.target.value
                        raw = raw.replace(/[^\d.,]/g, "")
                        raw = raw.replace(",", ".")
                        raw = raw.replace(/(\..*)\./g, "$1")
                        if (raw.includes('.')) {
                            const parts = raw.split('.')
                            if (parts[1].length > 2) {
                                parts[1] = parts[1].substring(0, 2)
                                raw = parts.join('.')
                            }
                        }
                        setValor(raw)
                        setError("")
                    }}
                    placeholder="0,00"
                    InputProps={{
                        startAdornment: "R$ ",
                    }}
                    size="small"
                />
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <Box sx={{ mb: 3 }}>
                    <DatePicker
                        label="Data"
                        value={data}
                        onChange={(newValue) => setData(newValue)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: "small",
                            },
                        }}
                    />
                </Box>
            </LocalizationProvider>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="Motivo do depósito (opcional)"
                    multiline
                    rows={3}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Economia mensal, bônus, presente..."
                    size="small"
                />
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#059669", "&:hover": { backgroundColor: "#047857" } }}
                    onClick={handleSubmit}
                >
                    Confirmar Depósito
                </Button>
            </Box>
        </Modal>
    )
}
