'use client'
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import dayjs from 'dayjs'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { useExpenses } from '@/context/AppContext'
import { CATEGORIES } from '@/utils/categories'



export default function EditModal({isOpen, setIsOpen, expense, setSnackbar}) {

    const { updateExpense } = useExpenses()

    const [categoria,setCategoria] = useState(null)
    const [subcategoria, setSubcategoria] = useState(null)
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('')
    const [data, setData] = useState(dayjs())

    useEffect(() => {
        if (!isOpen || !expense) return

        const cat = CATEGORIES.find(c => c.id === expense.categoria?.id)

        setCategoria(cat || null)

        setSubcategoria(
            expense.subcategoria && cat
            ? cat.subcategorias.find(s => s.id === expense.subcategoria.id)
            : null
        )

        setDescricao(expense.observacao || '')
        setValor(String(expense.valor ?? ''))
        setTipo(expense.tipo || '')

        setData(
            expense.data
            ? dayjs(expense.data, 'DD/MM/YYYY', true)
            : dayjs()
        )
    }, [isOpen, expense])

    async function submitForm(){
        if (!valor || !tipo || !categoria) {
            alert('Preencha os campos obrigatórios')
            return
        }

        try {
            await updateExpense(expense.id, {
                observacao: descricao || '',
                valor: Number(valor),
                tipo,
                data: data.format('DD/MM/YYYY'),
                categoria: {
                    id: categoria.id,
                    nome: categoria.nome
                },
                subcategoria: subcategoria
                ? { id: subcategoria.id, nome: subcategoria.nome }: null
            })
        setSnackbar({
            open: true,
            message: 'Registro atualizado com sucesso!',
            severity: 'success'
        })

        setIsOpen(false)
        } catch (err) {
            console.error(err)
            alert('Erro ao atualizar registro')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            overlayClassName="fixed inset-0 flex items-center justify-center  bg-black/40"
            className="w-[90%] max-w-lg bg-white p-6 rounded-xl outline-none relative flex flex-col gap-6"
        >
            <div className="flex items-center justify-between ">
                <h2 className="text-2xl mb-4">Editar Transação</h2>
                <button type="button"
                    className="absolute right-2 top-1 sm:right-4 sm:top-4"
                    onClick={()=>setIsOpen(!isOpen)}
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* DATA */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Data"
                    value={data}
                    onChange={newValue => setData(newValue)}
                    slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                />
            </LocalizationProvider>

            {/* CATEGORIA */}
            <FormControl fullWidth size="small" className="mt-4">
                <InputLabel>Categoria</InputLabel>
                <Select
                    value={categoria?.id || ''}
                    label="Categoria"
                    onChange={e => {
                        const cat = CATEGORIES.find(c => c.id === e.target.value)
                        setCategoria(cat)
                        setSubcategoria(null)
                    }}
                >
                {CATEGORIES.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.nome}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            {/* SUBCATEGORIA */}
            {categoria?.subcategorias?.length > 0 && (
                <FormControl fullWidth size="small" className="mt-4">
                <InputLabel>Subcategoria</InputLabel>
                <Select
                    value={subcategoria?.id || ''}
                    label="Subcategoria"
                    onChange={e =>
                        setSubcategoria(
                            categoria.subcategorias.find(
                            s => s.id === e.target.value
                            )
                        )
                    }
                >
                    {categoria.subcategorias.map(sub => (
                    <MenuItem key={sub.id} value={sub.id}>
                        {sub.nome}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            )}

            {/* OBSERVAÇÃO */}
            <TextField
                label="Observação"
                size="small"
                fullWidth
                className="mt-4"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />

            {/* VALOR */}
            <TextField
                label="Valor"
                size="small"
                fullWidth
                className="mt-4"
                value={valor}
                onChange={e => {
                    let raw = e.target.value
                    raw = raw.replace(/[^\d.,]/g, '').replace(',', '.')
                    raw = raw.replace(/(\..*)\./g, '$1')
                    setValor(raw)
                }}
            />

            <button
                type="button"
                className="mt-6 text-xl w-full bg-emerald-600 cursor-pointer hover:bg-emerald-800 text-white p-2 rounded "
                onClick={submitForm}
            >
                Salvar
            </button>
        </Modal>
    )
}
