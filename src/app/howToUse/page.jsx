/**
 * Página de Instruções de Uso (Server Component).
 * Fornece um guia completo sobre como utilizar as funcionalidades do sistema.
 */
import { FaChartBar, FaChartPie, FaEdit, FaEnvelope, FaInfoCircle, FaLightbulb, FaList, FaMinus, FaPlus,
    FaQuestionCircle, FaRegCreditCard, FaSignInAlt, FaTrash, FaUserPlus } from "react-icons/fa";

export default function HowToUse() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FaQuestionCircle />
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
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FaUserPlus className="w-6 h-6 text-blue-600" />
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
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FaSignInAlt className="w-6 h-6 text-blue-600" />
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
                                <span className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">1</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Clique no botão "Adicionar Transação"</h4>
                                    <p className="text-gray-600 text-sm">Localizado no painel principal do sistema</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">2</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Preencha os dados</h4>
                                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                                        <li>• <strong>Observação:</strong> Ex: "Salário de Dezembro", "Venda de produto"</li>
                                        <li>• <strong>Valor:</strong> Quanto você recebeu</li>
                                        <li>• <strong>Data:</strong> Quando você recebeu</li>
                                        <li>• <strong>Categoria e Subcategoria:</strong> Escolha uma (Salário, Freelance, Vendas, etc.)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">3</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Salvar</h4>
                                    <p className="text-gray-600 text-sm">Clique em "Salvar" e sua receita será registrada!</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3">
                            <FaInfoCircle className="w-6 h-6 text-blue-600 shrink-0" />
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
                                <span className="shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">1</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Clique no botão "Adicionar Transação"</h4>
                                    <p className="text-gray-600 text-sm">Disponível no painel principal</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">2</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Preencha os dados</h4>
                                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                                        <li>• <strong>Observação:</strong> Ex: "Conta de luz", "Supermercado", "Gasolina"</li>
                                        <li>• <strong>Valor:</strong> Quanto você gastou</li>
                                        <li>• <strong>Data:</strong> Quando você fez o gasto</li>
                                        <li>• <strong>Categoria e Subcategoria:</strong> Escolha uma (Alimentação, Transporte, Moradia, etc.)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">3</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Salvar</h4>
                                    <p className="text-gray-600 text-sm">Confirme para adicionar a despesa ao seu histórico</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3">
                            <FaInfoCircle className="w-6 h-6 text-blue-600 shrink-0" />
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
                            O sistema já vem com categorias e subcategorias padrão!
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
                                <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                                    <FaPlus className="w-5 h-5" />
                                    Exemplos de Categorias de Receita
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
                                        Comissões
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
                                    <FaMinus className="w-5 h-5" />
                                    Exemplos de Categorias de Despesa
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
                                        Contas de casa
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Tecnologia
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Lazer
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/*<div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                                <FaPlus className="w-5 h-5" />
                                Criar Categoria Personalizada
                            </h4>
                            <p className="text-sm text-gray-700">
                                Ao registrar uma receita ou despesa, você pode criar uma nova categoria digitando o nome desejado no campo de categoria.
                            </p>
                        </div>*/}
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
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <FaChartBar className="w-6 h-6 text-indigo-600" />
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
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <FaList className="w-6 h-6 text-indigo-600" />
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
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <FaChartPie className="w-6 h-6 text-indigo-600" />

                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Gráficos e Relatórios</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Visualize gráficos que mostram a distribuição dos seus gastos por categoria e subcategorias na tela de Dashboards, evolução do saldo ao longo do tempo e comparações entre receitas e despesas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <FaRegCreditCard className="w-6 h-6 text-indigo-600" />

                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Controle de Crédito</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Controle os gastos dos seus cartões de Crédito na tela de planejamento de crédito, lá você pode ver os valores de suas faturas futuras até 12 meses e de qual cartão é cada fatura.
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
                                    <FaEdit className="w-5 h-5" />
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
                                    <FaTrash className="w-5 h-5" />
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
                    <div className="bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <FaLightbulb className="w-10 h-10" />
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
                            <FaQuestionCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Precisa de Ajuda?</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Se você tiver dúvidas sobre como usar o sistema ou encontrar alguma dificuldade, 
                            estamos aqui para ajudar! Entre em contato conosco.
                        </p>
                        <a 
                            href="mailto:guilhermebarroso@example.com" 
                            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <FaEnvelope className="w-5 h-5" />
                            Entrar em Contato
                        </a>
                    </div>
                </section>

            </div>
        </div>
    )
}