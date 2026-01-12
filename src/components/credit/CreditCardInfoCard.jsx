'use client'

export default function CreditCardInfoCard({ card, onEdit, onAdd }) {
    return (
        <div className="bg-white border rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{card.bank}</h3>

                <button
                    onClick={onEdit}
                    className="text-sm text-emerald-600 underline"
                >
                    Editar
                </button>
            </div>

            <p>Limite total: R$ {card.creditLimit.toFixed(2)}</p>
            <p>Fechamento: dia {card.closingDay}</p>
            <p>Vencimento: dia {card.dueDay}</p>

            <button
                onClick={onAdd}
                className="mt-3 text-sm underline text-blue-600"
            >
                Adicionar outro cartão
            </button>
        </div>
    )
}
