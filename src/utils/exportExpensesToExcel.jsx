/**
 * Utilitário para exportar a lista de transações para um arquivo Excel (.xlsx).
 */
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

export async function exportExpensesToExcel(expenses) {

    if (!expenses || expenses.length === 0) {
        alert("Não há dados para exportar")
        return
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Despesas")

    worksheet.columns = [
        { header: "Data", key: "data", width: 14 },
        { header: "Categoria", key: "categoria", width: 32 },
        { header: "Observação", key: "observacao", width: 40 },
        { header: "Valor", key: "valor", width: 16 },
        { header: "Tipo", key: "tipo", width: 22 },
    ]

    worksheet.getRow(1).font = {bold: true}
    worksheet.getRow(1).alignment = {vertical: "middle"}

    expenses.forEach(item => {
        worksheet.addRow({
            data: item.data,
            categoria: item.subcategoria?.nome
                ? `${item.categoria.nome} / ${item.subcategoria.nome}`
                : item.categoria?.nome || "-",
            observacao: item.observacao || "Sem observação",
            valor: Number(item.valor),
            tipo: item.tipo,
        })
    })

    worksheet.getColumn("valor").numFmt = '"R$"#,##0.00;[Red]-"R$"#,##0.00'

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
        type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    saveAs(blob, "controleFinanceiro.xlsx")
}
