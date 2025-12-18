import Tesseract from "tesseract.js"

export async function extractFromImage(image, callback) {
  const result = await Tesseract.recognize(image, "por")

  let texto = result.data.text || ""

  texto = texto
    .replace(/\bO(?=\d)/g, "0")
    .replace(/\bI(?=\d)/g, "1")
    .replace(/\u00A0/g, " ")
    .replace(/\t/g, " ")
    .replace(/\r/g, "\n")

  /* ================= DATA ================= */

  let data = ""

  // Mercado Pago / Nubank / PicPay
  const dataRegex =
    /(\d{1,2})\s*(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\s*(20\d{2})?/i

  const match = texto.match(dataRegex)

  if (match) {
    const [, d, mesTxt, anoRaw] = match

    const meses = {
      JAN: "01", FEV: "02", MAR: "03", ABR: "04",
      MAI: "05", JUN: "06", JUL: "07", AGO: "08",
      SET: "09", OUT: "10", NOV: "11", DEZ: "12",
    }

    const dia = d.padStart(2, "0")
    const mes = meses[mesTxt.toUpperCase()]
    const ano = anoRaw || new Date().getFullYear()

    data = `${dia}/${mes}/${ano}`
  }

  if (!data) {
    data = new Date().toLocaleDateString("pt-BR")
  }

  /* ================= VALOR ================= */

  let valor = 0

  const valorRegex = /R\$\s*([\d\.\,]+)/i
  const valorMatch = texto.match(valorRegex)

  if (valorMatch) {
    valor = Number(valorMatch[1].replace(/\./g, "").replace(",", "."))
  }

  callback({ data, valor })
}
