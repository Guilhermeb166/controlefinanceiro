import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

export async function exportExpensesToExcel(expenses) {

    if (!expenses || expenses.length === 0) {
        alert("Não há dados para exportar")
        return
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Despesas")

    return (
        <div>exportExpensesToExcel</div>
    )
}
