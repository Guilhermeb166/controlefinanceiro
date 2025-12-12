
import Tesseract from "tesseract.js";

export async function extractFromImage(file, callback) {
  try {
    const imageUrl = URL.createObjectURL(file);

    const result = await Tesseract.recognize(imageUrl, "por", {
      logger: (m) => console.log(m),
    });

    let texto = result.data.text || "";
    console.log("OCR Result:", texto);

    texto = texto.replace(/\bO(?=\d)/g, "0");

    texto = texto.replace(/\bI(?=\d)/g, "1");
    
    texto = texto.replace(/\u00A0/g, " "); 

    texto = texto.replace(/\t/g, " ").replace(/\r/g, "\n");

    let data = "";

    const dataMesTxtRegex = /(\d{1,2})\s*(?:\/|-)?\s*(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\s*(?:\/|-)?\s*(20\d{2})/i;
    const matchMesTxt = texto.match(dataMesTxtRegex);

    if (matchMesTxt) {
      const [, diaRaw, mesTxt, ano] = matchMesTxt;
      const dia = diaRaw.padStart(2, "0");
      const meses = {
        JAN: "01",
        FEV: "02",
        MAR: "03",
        ABR: "04",
        MAI: "05",
        JUN: "06",
        JUL: "07",
        AGO: "08",
        SET: "09",
        OUT: "10",
        NOV: "11",
        DEZ: "12",
      };
      const mes = meses[mesTxt.toUpperCase()] || "01";
      data = `${dia}/${mes}/${ano}`;
    }

    if (!data) {
      const dataBarraRegex = /(\d{1,2})[\/\-](\d{1,2})[\/\-](20\d{2})/;
      const matchBarra = texto.match(dataBarraRegex);
      if (matchBarra) {
        const [, d, m, y] = matchBarra;
        const dia = String(d).padStart(2, "0");
        const mes = String(m).padStart(2, "0");
        data = `${dia}/${mes}/${y}`;
      }
    }

    if (!data) {
      const diaMesRegex = /(\d{1,2})[\/\-](\d{1,2})\b/;
      const matchDiaMes = texto.match(diaMesRegex);
      if (matchDiaMes) {
        const [, d, m] = matchDiaMes;
        const anoAtual = new Date().getFullYear();
        const dia = String(d).padStart(2, "0");
        const mes = String(m).padStart(2, "0");
        data = `${dia}/${mes}/${anoAtual}`;
      }
    }


    if (!data) {
      const hoje = new Date();
      data = hoje.toLocaleDateString("pt-BR");
    }

    const valorRegex = /(?:Valor[:\s]*)?R\$\s*([\d\.\,]{1,})/i;
    const valorMatch = texto.match(valorRegex);

    let valor = 0;
    if (valorMatch) {
      valor = Number(valorMatch[1].replace(/\./g, "").replace(",", "."));
    } else {

      const anyValor = texto.match(/([+-]?\s?[\d\.]{1,}\,[0-9]{2})/);
      if (anyValor) {
        valor = Number(anyValor[1].replace(/\./g, "").replace(",", "."));
      }
    }


    let descricao = "Transferência";


    const destinoRegex = /Destino[\s\S]*?Nome\s+([A-Za-zÀ-ÿ0-9\.\-\s]+)/i;
    const destinoMatch = texto.match(destinoRegex);
    if (destinoMatch) {
      descricao = `PIX enviado para ${destinoMatch[1].trim()}`;
    } else {

      const nomeRegex = /Nome\s+([A-Za-zÀ-ÿ0-9\.\-\s]{3,})/i;
      const nomeMatch = texto.match(nomeRegex);
      if (nomeMatch) {
        descricao = `Transferência - ${nomeMatch[1].trim()}`;
      }
    }


    const isPix = /pix/i.test(texto);
    const tipo = "Despesa";
    const tipoDetalhado = isPix ? "Débito/Pix" : "Débito";


    callback({
      descricao,
      valor,
      data,
    });

    return true;
  } catch (err) {
    console.error("Erro no OCR:", err);
    throw err;
  }
}
