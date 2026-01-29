/**
 * Página principal da aplicação (Server Component).
 * Esta página serve como o ponto de entrada e renderiza o componente principal da Home.
 */

import HomeMain from "@/components/Home/HomeMain";
export default function Home() {


    return (
        <main className="min-h-screen bg-neutral-200 pb-30">
            <HomeMain />
        </main>
    );
}
