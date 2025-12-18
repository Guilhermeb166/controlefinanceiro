export function parseTransactionsFromText(text, onTransaction) {
  const linhas = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const meses = {
    jan: "01",
    fev: "02",
    mar: "03",
    abr: "04",
    mai: "05",
    jun: "06",
    jul: "07",
    ago: "08",
    set: "09",
    out: "10",
    nov: "11",
    dez: "12",
  }

  for (const linha of linhas) {
    // 17/dez/2025 | 17/dez | 17/12/2025
    const dataMatch = linha.match(
      /(\d{1,2})\/([a-z]{3}|\d{2})(?:\/(\d{4}))?/i
    )

    // 23,90 | -23,90 | 1.234,56
    const valorMatch = linha.match(/-?\d{1,3}(\.\d{3})*,\d{2}/)

    if (!dataMatch || !valorMatch) continue

    let [, d, mesRaw, anoRaw] = dataMatch

    let mes = mesRaw
    if (isNaN(mesRaw)) {
      mes = meses[mesRaw.toLowerCase()]
    }

    if (!mes) continue

    const dia = d.padStart(2, "0")
    const ano = anoRaw || new Date().getFullYear()

    const data = `${dia}/${mes}/${ano}`

    const valor = Number(
      valorMatch[0]
        .replace(/\./g, "")
        .replace(",", ".")
    )

    onTransaction({ data, valor })
  }
}
