import { FaHome, FaQuestionCircle } from "react-icons/fa"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Sobre o Sistema */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-emerald-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                            Controle Financeiro
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Gerencie suas finanças de forma simples e eficiente. 
                            Controle receitas, despesas e mantenha seu orçamento sempre organizado.
                        </p>
                    </div>

                    {/* Links Úteis */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                                    <FaHome />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/howToUse" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                                    <FaQuestionCircle />
                                    Como usar o sistema
                                </a>
                            </li>
                            
                            <li>
                                <a href="privacyPolicy" className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                    </svg>
                                    Política de privacidade
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Suporte */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Suporte</h3>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-start gap-2">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <span>
                                    <span className="text-gray-400 block mb-1">Email para suporte:</span>
                                    <a href="mailto:guilhermebarroso@example.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                        guilhermebarroso@example.com
                                    </a>
                                </span>
                            </p>
                            <p className="flex items-start gap-2">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>
                                    <span className="text-gray-400 block mb-1">Horário de atendimento:</span>
                                    <span className="text-white">Segunda a Sexta, 9h às 18h</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Controle Financeiro. Todos os direitos reservados.
                        </p>
                        <p className="text-sm flex items-center gap-2">
                            <span className="text-gray-400">Desenvolvido por</span>
                            <span className="text-emerald-400 font-semibold">Guilherme Barroso</span>
                            
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}