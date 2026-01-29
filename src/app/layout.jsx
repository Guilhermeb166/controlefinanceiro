/**
 * Layout raiz da aplicação que define a estrutura HTML básica e envolve os filhos com provedores.
 */
import "./globals.css";
import AuthLoader from "@/components/AuthLoader";
import Providers from "./providers";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


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
            <Header/>
            {children}
            <Footer/>
          </AuthLoader>  
        </Providers>
      </body>
    </html>
  );
}
