import AuthLoader from "@/components/AuthLoader";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer/Footer";


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
          <AuthLoader>
            {children}
            <Footer/>
          </AuthLoader>  
        </Providers>
      </body>
    </html>
  );
}
