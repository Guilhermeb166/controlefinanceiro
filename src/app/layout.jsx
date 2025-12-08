import "./globals.css";
import Providers from "./providers";


export const metadata = {
  title: "Minhas Despesas",
  description: "Controle financeiro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
