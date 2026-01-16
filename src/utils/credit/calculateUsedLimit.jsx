export function calculateUsedLimit({
    expenses,
    creditCardId,
    month,
    year,
    closingDay
}) {
    let total = 0

    expenses.forEach(exp => {
        if (exp.tipo !== 'Crédito') return
        if (exp.creditCardId !== creditCardId) return

        const purchaseDate = new Date(exp.purchaseDate)
        const installmentValue = exp.installmentValue || exp.valor
        const installments = exp.installments || 1

        for (let i = 0; i < installments; i++) {
        const invoiceDate = new Date(purchaseDate)
        invoiceDate.setMonth(invoiceDate.getMonth() + i)

        if (purchaseDate.getDate() > closingDay) {
            invoiceDate.setMonth(invoiceDate.getMonth() + 1)
        }

        if (
            invoiceDate.getMonth() === month &&
            invoiceDate.getFullYear() === year
        ) {
            total += installmentValue
        }
        }
    })

    return total
}
