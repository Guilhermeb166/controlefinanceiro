/**
 * Componente de legenda customizada para dispositivos móveis, exibindo cores e porcentagens.
 */
export function MobileLegend({ data, colors }) {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <div className="flex flex-col gap-2 mt-4 sm:hidden">
            {data.map(item => {
                const percent = total
                    ? ((item.value / total) * 100).toFixed(1)
                    : "0.0"

                return (
                    <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[item.name] }}
                            />
                            <span className="text-gray-700">{item.name}</span>
                        </div>

                        <span className="font-medium text-gray-900">
                            {percent}%
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
