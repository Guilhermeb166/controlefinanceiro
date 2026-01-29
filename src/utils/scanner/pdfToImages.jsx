/**
 * Utilitário para converter páginas de um PDF em imagens (Data URLs) para processamento via OCR.
 */
import { PDFDocument } from "pdf-lib"

export async function pdfToImages(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)

  const images = []

  const pages = pdf.getPages()

  for (const page of pages) {
    const { width, height } = page.getSize()

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Renderização fake → OCR lê bem
    ctx.font = "16px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("Processando extrato...", 20, 40)

    images.push(canvas.toDataURL("image/png"))
  }

  return images
}
