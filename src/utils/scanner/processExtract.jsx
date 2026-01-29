/**
 * Lógica principal para processar arquivos de extrato (PDF ou Imagem) e extrair transações.
 */
import { extractFromImage } from "./extractFromImage"
import { extractFromPdfText } from "./extractFromPdfText"
import { pdfToImages } from "./pdfToImages"

import { parseTransactionsFromText } from "./parseTransactionsFromText"

export async function processExtract(file, onTransaction) {
  const isPdf = file.type === "application/pdf"

  if (isPdf) {
    const text = await extractFromPdfText(file)

    // PDF digital
    if (text && text.length > 50) {
      return parseTransactionsFromText(text, onTransaction)
    }

    // PDF escaneado
    const images = await pdfToImages(file)
    for (const img of images) {
      await extractFromImage(img, onTransaction)
    }
    return
  }

  // Imagem
  await extractFromImage(file, onTransaction)
}
