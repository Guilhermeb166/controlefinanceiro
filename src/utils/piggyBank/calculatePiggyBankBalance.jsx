/**
 * Utilitário para calcular o saldo do cofrinho baseado nas transações com subcategoria "cofrinho"
 */


export default function calculatePiggyBankBalance(expenses) {

    if (!expenses || expenses.length === 0) {
        return {
            balance: 0,
            deposits: 0,
            withdrawals: 0,
            transactions:  []
        }
    }
    
    const piggyBankTransactions = expenses.filter(
        expense => expense.subcategoria?.id === "cofrinho"
    )

    let balance = 0
    let deposits = 0
    let withdrawals = 0

    piggyBankTransactions.forEach(transaction => {
        if (transaction.tipo === "Receita") {
            //Receita é um depósito no cofrinho
            balance += transaction.valor
            deposits += transaction.valor
        } else if (transaction.tipo === "Despesa" || transaction.tipo === "Débito/Pix") {
            // Despesa é uma retirada do cofrinho
            balance -= transaction.valor
            withdrawals += transaction.valor
        }
    })

   return {
        balance: Math.max(0, balance), // Não permitir saldo negativo
        deposits,
        withdrawals,
        transactions: piggyBankTransactions.sort((a, b) => {
            // Ordenar por data decrescente
            const dateA = new Date(a.data.split("/").reverse().join("-"))
            const dateB = new Date(b.data.split("/").reverse().join("-"))
            return dateB - dateA
        })
    }
}

/**
 * Formata uma transação do cofrinho para exibição
 */
export function formatPiggyBankTransaction(transaction) {
    return {
        ...transaction,
        isDeposit: transaction.tipo === "Receita",
        isWithdrawal: transaction.tipo === "Despesa" || transaction.tipo === "Débito/Pix"
    }
}
