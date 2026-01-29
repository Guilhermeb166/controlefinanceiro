/**
 * Página de Planejamento de Crédito.
 * Permite ao usuário planejar compras no cartão de crédito.
 */
import PlannedCreditClient from '@/components/credit/PlannedCreditClient'

export default function PlannedCreditPage() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Planejamento de Cartão de Crédito
      </h1>

      <PlannedCreditClient />
    </main>
  )
}
