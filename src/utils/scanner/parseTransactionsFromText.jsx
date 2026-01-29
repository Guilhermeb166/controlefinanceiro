/**
 * Analisador sintático (parser) que identifica transações em blocos de texto, extraindo datas e valores.
 */
export function parseTransactionsFromText(text, onTransaction) {
  const linhas = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const meses = {
    jan: "01", janeiro: "01",
    fev: "02", fevereiro: "02",
    mar: "03", marco: "03",
    abr: "04", abril: "04",
    mai: "05", maio: "05",
    jun: "06", junho: "06",
    jul: "07", julho: "07",
    ago: "08", agosto: "08",
    set: "09", setembro: "09",
    out: "10", outubro: "10",
    nov: "11", novembro: "11",
    dez: "12", dezembro: "12",
  }

  for (const linha of linhas) {
    let data = null

    /* 1️⃣ 16 de dezembro de 2025 (Mercado Pago) */
    let m = linha.match(
      /(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/i
    )

    if (m) {
      const [, d, mesTxt, ano] = m
      const mes = meses[mesTxt.toLowerCase()]

      if (mes) {
        data = `${d.padStart(2, "0")}/${mes}/${ano}`
      }
    }

    /* 2️⃣ 17/dez/2025 | 17/12/2025 */
    if (!data) {
      m = linha.match(
        /(\d{1,2})\/([a-z]{3}|\d{2})\/(\d{4})/i
      )

      if (m) {
        const [, d, mesRaw, ano] = m

        // biome-ignore lint/suspicious/noGlobalIsNan: <>
        const mes = isNaN(mesRaw)
          ? meses[mesRaw.toLowerCase()]
          : mesRaw

        // valida mês
        if (mes && Number(mes) >= 1 && Number(mes) <= 12) {
          data = `${d.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`
        }
      }
    }

    /* VALOR */
    const valorMatch = linha.match(/-?\d{1,3}(\.\d{3})*,\d{2}/)
    if (!data || !valorMatch) continue

    const valor = Number(
      valorMatch[0].replace(/\./g, "").replace(",", ".")
    )

    onTransaction({ data, valor })
  }
}
