export function calculateUsedLimit({
    expenses = [],
    creditCard,
    month,
    year
}) {
    let total = 0
    const closingDay = creditCard?.closingDay || 1
    const creditCardId = creditCard?.id

    // 1. Calcular a partir das despesas gerais (legado ou transações avulsas)
    expenses.forEach(exp => {
        if (exp.tipo !== 'Crédito') return
        if (exp.creditCardId !== creditCardId) return

        const purchaseDate = new Date(exp.purchaseDate)
        const installmentValue = exp.installmentValue || exp.valor
        const installments = exp.installments || 1

        for (let i = 0; i < installments; i++) {
            const invoiceDate = new Date(purchaseDate)
            invoiceDate.setMonth(invoiceDate.getMonth() + i)

            // Se a compra foi após o fechamento, a primeira parcela vai para o próximo mês
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

    // 2. Calcular a partir das parcelas vinculadas ao cartão (nova estrutura)
    if (creditCard?.parcelas) {
        creditCard.parcelas.forEach(parcela => {
            const purchaseDate = new Date(parcela.purchaseDate)
            const installmentValue = parcela.installmentValue
            const installments = parcela.installments

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
    }

    return total
}

/**
 * Calcula o limite total comprometido (todas as parcelas futuras)
 */
export function calculateTotalCommittedLimit(creditCard) {
    let total = 0
    const closingDay = creditCard?.closingDay || 1
    const now = new Date()

    if (creditCard?.parcelas) {
        creditCard.parcelas.forEach(parcela => {
            const purchaseDate = new Date(parcela.purchaseDate)
            const installments = parcela.installments
            const installmentValue = parcela.installmentValue

            for (let i = 0; i < installments; i++) {
                const invoiceDate = new Date(purchaseDate)
                invoiceDate.setMonth(invoiceDate.getMonth() + i)

                if (purchaseDate.getDate() > closingDay) {
                    invoiceDate.setMonth(invoiceDate.getMonth() + 1)
                }

                // Só conta se a fatura for igual ou posterior ao mês atual
                if (invoiceDate >= new Date(now.getFullYear(), now.getMonth(), 1)) {
                    total += installmentValue
                }
            }
        })
    }
    return total
}
