// Calcula a primeira fatura baseada no dia de fechamento
export function getFirstInvoiceDate(purchaseDate, closingDay) {
    const date = new Date(purchaseDate)

    if (date.getDate() > Number(closingDay)) {
        date.setMonth(date.getMonth() + 1)
    }

    date.setDate(1)
    return date
}

// Gera faturas futuras
export function generateInvoices({
  purchaseDate,
  closingDay,
  installments,
  installmentValue,
}) {
    const invoices = []
    let date = getFirstInvoiceDate(purchaseDate, closingDay)

    for (let i = 1; i <= installments; i++) {
        invoices.push({
        month: date.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        }),
        installment: `${i}/${installments}`,
        value: installmentValue,
        })

        date.setMonth(date.getMonth() + 1)
    }

    return invoices
}
