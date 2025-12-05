"use client"
import Tesseract from "tesseract.js"

export async function extractFromImage(file, callback) {

        try{
            const imageUrl = URL.createObjectURL(file)

            const result = await Tesseract.recognize(imageUrl, "por", {
                logger: (m) => console.log(m),
            })

            const texto = result.data.text
            console.log("OCR Result:", texto);

            const linhas = texto.split("\n")

            const regex = /(\d{2}\/\d{2}|\d{2}\s?[A-Z]{3})\s+(.*?)\s+([+-]?\s?R?\$?\s?\d+[\.,]\d{2})/i;

            linhas.forEach((linha) => {
                const match = linha.match(regex)
                if (!match) return

                const [, dataBruta, descricao, valorStr] = match

                let data = dataBruta
                    .replace("JAN", "01")
                    .replace("FEV", "02")
                    .replace("MAR", "03")
                    .replace("ABR", "04")
                    .replace("MAI", "05")
                    .replace("JUN", "06")
                    .replace("JUL", "07")
                    .replace("AGO", "08")
                    .replace("SET", "09")
                    .replace("OUT", "10")
                    .replace("NOV", "11")
                    .replace("DEZ", "12");

                if (data.includes("")) {
                    const [dia, mes] = data.split("")
                    data = `${dia}/${mes}`
                }

                let valor = Number(
                    valorStr
                        .replace("R$", "")
                        .replace(" ", "")
                        .replace(".", "")
                        .replace(",", ".")
                )

                const tipo = valor > 0 ? "Receita" : "Despesa"
                const tipoDetalhado = valor < 0 ? "Débito/Pix" : "Crédito"

                callback({
                    id: crypto.randomUUID(),
                    descricao: descricao.trim(),
                    valor: Math.abs(valor),
                    tipo,
                    tipoDetalhado,
                    data,
                });
            });

    return true;
  } catch (err) {
    console.error("Erro no OCR:", err);
    throw err;
  }
}
