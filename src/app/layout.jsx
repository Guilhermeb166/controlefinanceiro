/**
 * Layout raiz da aplicação que define a estrutura HTML básica e envolve os filhos com provedores.
 */
import "./globals.css";
import AuthLoader from "@/components/AuthLoader";
import Providers from "./providers";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


export const metadata = {
  title: {
    default: "Meu Controle Financeiro",
    template: "%s | Meu Controle Financeiro",
  },
  description: "Gerencie suas finanças pessoais de forma simples e gratuita. Acompanhe gastos, receitas e metas.",
  // Importante para SEO: define a URL base para o Google entender os links
  metadataBase: new URL('https://meu-controle-financeiro-web.vercel.app'),
  // Isso ajuda quando alguém compartilha seu link no WhatsApp/LinkedIn (Open Graph)
  openGraph: {
    title: 'Meu Controle Financeiro',
    description: 'Gerencie suas finanças pessoais de forma simples.',
    url: 'https://meu-controle-financeiro-web.vercel.app',
    siteName: 'Meu Controle Financeiro',
    locale: 'pt_BR',
    type: 'website',
  },
  verification: {
    google: 'xGt8WcvHeYWP0Mtze0TBYReJTGC5M1bFFPbyLudUM0M',
  }
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
