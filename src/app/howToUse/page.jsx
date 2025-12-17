export default function HowToUse() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        <h1 className="text-4xl font-bold">Como Usar o Sistema</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Guia completo para gerenciar suas finanças de forma eficiente
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                
                {/* Primeiros Passos */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">1</span>
                            Primeiros Passos
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Criar Sua Conta</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Clique no botão "Cadastrar" e preencha seus dados: nome, e-mail e senha. 
                                        Sua senha deve ter pelo menos 6 caracteres para garantir segurança. 
                                        Após o cadastro, você já estará logado e pronto para usar!
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Fazer Login</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Nas próximas visitas, basta inserir seu e-mail e senha na tela inicial. 
                                        O sistema é seguro e seus dados estarão sempre protegidos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gerenciando Receitas */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg font-bold">2</span>
                            Registrando Receitas
                        </h2>

                        <div className="bg-emerald-50 rounded-xl p-6 mb-6 border-l-4 border-emerald-500">
                            <p className="text-gray-700 leading-relaxed">
                                <strong className="text-emerald-700">Receitas</strong> são todo dinheiro que entra, como salário, freelance, vendas ou qualquer tipo de ganho financeiro.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">1</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Clique no botão "Adicionar Receita"</h4>
                                    <p className="text-gray-600 text-sm">Localizado no painel principal do sistema</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">2</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Preencha os dados</h4>
                                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                                        <li>• <strong>Descrição:</strong> Ex: "Salário de Dezembro", "Venda de produto"</li>
                                        <li>• <strong>Valor:</strong> Quanto você recebeu</li>
                                        <li>• <strong>Data:</strong> Quando você recebeu</li>
                                        <li>• <strong>Categoria:</strong> Escolha ou crie uma (Salário, Freelance, Vendas, etc.)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">3</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Salvar</h4>
                                    <p className="text-gray-600 text-sm">Clique em "Salvar" e sua receita será registrada!</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-700">
                                    <strong className="text-blue-700">Dica:</strong> Registre suas receitas assim que receber o dinheiro para manter seu controle sempre atualizado.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gerenciando Despesas */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold">3</span>
                            Registrando Despesas
                        </h2>

                        <div className="bg-red-50 rounded-xl p-6 mb-6 border-l-4 border-red-500">
                            <p className="text-gray-700 leading-relaxed">
                                <strong className="text-red-700">Despesas</strong> são todo dinheiro que sai, como contas, compras, alimentação, transporte e outros gastos.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">1</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Clique no botão "Adicionar Despesa"</h4>
                                    <p className="text-gray-600 text-sm">Disponível no painel principal</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">2</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Preencha os dados</h4>
                                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                                        <li>• <strong>Descrição:</strong> Ex: "Conta de luz", "Supermercado", "Gasolina"</li>
                                        <li>• <strong>Valor:</strong> Quanto você gastou</li>
                                        <li>• <strong>Data:</strong> Quando você fez o gasto</li>
                                        <li>• <strong>Categoria:</strong> Escolha ou crie uma (Alimentação, Transporte, Moradia, etc.)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">3</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Salvar</h4>
                                    <p className="text-gray-600 text-sm">Confirme para adicionar a despesa ao seu histórico</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-700">
                                    <strong className="text-blue-700">Dica:</strong> Categorize suas despesas corretamente para ter relatórios mais precisos sobre seus gastos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Organizando com Categorias */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-lg font-bold">4</span>
                            Organizando com Categorias
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Categorias ajudam você a entender para onde seu dinheiro está indo e de onde ele vem. 
                            O sistema já vem com categorias padrão, mas você pode criar suas próprias!
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
                                <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Categorias de Receita
                                </h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Salário
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Freelance
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Investimentos
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Vendas
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Outros
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                                <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                    Categorias de Despesa
                                </h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Alimentação
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Transporte
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Moradia
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Saúde
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Lazer
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Criar Categoria Personalizada
                            </h4>
                            <p className="text-sm text-gray-700">
                                Ao registrar uma receita ou despesa, você pode criar uma nova categoria digitando o nome desejado no campo de categoria.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Visualizando Dados */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">5</span>
                            Visualizando Seus Dados
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Painel de Resumo</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        No painel principal, você vê cards com seu saldo total, total de receitas e total de despesas. 
                                        Esses valores são atualizados automaticamente sempre que você adiciona ou remove transações.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Lista de Transações</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Veja todas as suas receitas e despesas em ordem cronológica. 
                                        Você pode filtrar por tipo (receita/despesa), pesquisar por descrição e ordenar por data ou valor.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Gráficos e Relatórios</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Visualize gráficos que mostram a distribuição dos seus gastos por categoria, evolução do saldo ao longo do tempo e comparações entre receitas e despesas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Editando e Excluindo */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-lg font-bold">6</span>
                            Editando e Excluindo
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Editar Transação
                                </h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold mt-0.5">1.</span>
                                        <span>Na lista de transações, clique no ícone de editar (lápis)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold mt-0.5">2.</span>
                                        <span>Altere os dados que desejar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold mt-0.5">3.</span>
                                        <span>Clique em "Salvar" para confirmar</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
                                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Excluir Transação
                                </h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold mt-0.5">1.</span>
                                        <span>Na lista de transações, clique no ícone de excluir (lixeira)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold mt-0.5">2.</span>
                                        <span>Confirme a exclusão</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold mt-0.5">⚠️</span>
                                        <span><strong>Atenção:</strong> Esta ação não pode ser desfeita!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dicas Importantes */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                            Dicas para um Controle Eficiente
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📅</span>
                                    Registre Diariamente
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Crie o hábito de registrar suas transações todos os dias. Assim você não esquece nenhum gasto e mantém seu controle sempre atualizado.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🏷️</span>
                                    Use Categorias Corretamente
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Categorize suas transações de forma consistente. Isso te ajudará a identificar padrões de gastos e áreas onde você pode economizar.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    Defina Metas
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Estabeleça limites de gastos por categoria. Acompanhe seus progressos e ajuste seus hábitos financeiros quando necessário.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Analise Mensalmente
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Reserve um tempo no final do mês para revisar seus gastos e receitas. Identifique onde você pode melhorar no próximo mês.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">💰</span>
                                    Priorize a Reserva de Emergência
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Separe uma parte das suas receitas para uma reserva de emergência. Isso te dá segurança financeira para imprevistos.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📱</span>
                                    Acesse de Qualquer Lugar
                                </h3>
                                <p className="text-emerald-50 text-sm">
                                    Use o sistema no computador, tablet ou celular. Seus dados estão sempre sincronizados e acessíveis onde você estiver.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Precisa de Ajuda */}
                <section>
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Precisa de Ajuda?</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Se você tiver dúvidas sobre como usar o sistema ou encontrar alguma dificuldade, 
                            estamos aqui para ajudar! Entre em contato conosco.
                        </p>
                        <a 
                            href="mailto:guilhermebarroso@example.com" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            Entrar em Contato
                        </a>
                    </div>
                </section>

            </div>
        </div>
    )
}