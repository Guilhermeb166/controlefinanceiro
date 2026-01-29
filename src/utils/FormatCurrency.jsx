/**
 * Utilitário para formatar valores numéricos como moeda brasileira (BRL).
 */
export function formatCurrency(value = 0) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}