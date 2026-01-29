/**
 * Funções auxiliares para manipulação e comparação de datas nos dashboards.
 */
//semanal
export function isSameWeek(date, baseDate){
    const start = new Date(baseDate)
    start.setDate(baseDate.getDate() - baseDate.getDay())

    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    return date >= start && date <= end
}

//mensal
export function isSameMonth(date, baseDate){
    return (
        date.getMonth() === baseDate.getMonth() &&
        date.getFullYear() === baseDate.getFullYear()
    )
}

//anual
export function isSameYear(date, baseDate){
    return date.getFullYear() === baseDate.getFullYear()
}

export function parseBRDate (dateStr) {
    if (!dateStr) return new Date() 
    
    const [d, m, y] = dateStr.split("/")
    
 
    if (!d || !m || !y) {
        console.error("Data inválida:", dateStr)
        return new Date() 
    }
    
    return new Date(y, m - 1, d)
}