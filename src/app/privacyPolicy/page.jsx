/**
 * Página de Política de Privacidade.
 * Informa ao usuário sobre como seus dados são coletados, usados e protegidos.
 */
import { FaChartPie, FaCheckCircle, FaCogs, FaEnvelope, FaEye, FaShieldAlt, FaUserShield } from "react-icons/fa";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FaShieldAlt className="w-12 h-12" />
                        <h1 className="text-4xl font-bold">Política de Privacidade</h1>
                    </div>
                    <p className="text-emerald-100 text-lg">
                        Sua privacidade e segurança são nossas prioridades
                    </p>
                    <p className="text-sm text-emerald-200 mt-2">
                        Última atualização: Dezembro de 2025
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    
                    {/* Introdução */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Introdução
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            O Sistema de Controle Financeiro foi desenvolvido com o compromisso de proteger seus dados pessoais e financeiros. 
                            Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações.
                        </p>
                    </section>

                    {/* Segurança dos Dados */}
                    <section className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                            Segurança dos Dados
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex items-start gap-3">
                                <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                                <p><strong>Criptografia de ponta:</strong> Todos os seus dados são criptografados tanto em trânsito quanto em repouso, utilizando protocolos de segurança de nível bancário.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                                <p><strong>Autenticação segura:</strong> Utilizamos Firebase Authentication com proteção contra acesso não autorizado.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                                <p><strong>Senhas protegidas:</strong> Suas senhas são armazenadas com hash seguro e nunca são acessíveis em texto plano.</p>
                            </div>
                        </div>
                    </section>

                    {/* Dados Coletados */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Dados Coletados
                        </h2>
                        <p className="text-gray-600 mb-4">Coletamos apenas as informações necessárias para o funcionamento do sistema:</p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold mt-1">•</span>
                                <span><strong>Dados de cadastro:</strong> Nome, e-mail e senha (criptografada)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold mt-1">•</span>
                                <span><strong>Dados financeiros:</strong> Receitas, despesas e categorias que você registra</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold mt-1">•</span>
                                <span><strong>Dados de uso:</strong> Informações sobre como você interage com o sistema (para melhorias)</span>
                            </li>
                        </ul>
                    </section>

                    {/* Privacidade */}
                    <section className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaEye className="w-7 h-7 text-blue-600" />
                            Sua Privacidade
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex items-start gap-3">
                                <FaUserShield className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                <p><strong>Nunca compartilhamos seus dados:</strong> Suas informações financeiras são privadas e não serão vendidas, alugadas ou compartilhadas com terceiros.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaUserShield className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                <p><strong>Conta isolada:</strong> Cada usuário tem acesso apenas aos seus próprios dados financeiros. Nem outros usuários nem administradores podem visualizar suas informações.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaUserShield className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                                <p><strong>Direito ao esquecimento:</strong> Você pode excluir sua conta e todos os seus dados a qualquer momento, de forma permanente.</p>
                            </div>
                        </div>
                    </section>

                    {/* Uso dos Dados */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Como Usamos Seus Dados
                        </h2>
                        <p className="text-gray-600 mb-3">Utilizamos suas informações exclusivamente para:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaChartPie className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Fornecer o Serviço</h3>
                                </div>
                                <p className="text-sm text-gray-600">Permitir que você registre e visualize suas finanças</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCogs className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Melhorar o Sistema</h3>
                                </div>
                                <p className="text-sm text-gray-600">Desenvolver novos recursos e melhorias</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaEnvelope className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Comunicação</h3>
                                </div>
                                <p className="text-sm text-gray-600">Enviar notificações importantes sobre o serviço</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaShieldAlt className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800">Segurança</h3>
                                </div>
                                <p className="text-sm text-gray-600">Detectar e prevenir atividades suspeitas</p>
                            </div>
                        </div>
                    </section>

                    {/* Seus Direitos */}
                    <section className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-1" />
                            Seus Direitos
                        </h2>
                        <p className="text-gray-700 mb-4">De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a:</p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                <span>Acessar seus dados pessoais armazenados</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                <span>Solicitar correção de dados incompletos ou incorretos</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                <span>Solicitar a exclusão de seus dados</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                <span>Revogar consentimento a qualquer momento</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold mt-1">✓</span>
                                <span>Solicitar portabilidade dos seus dados</span>
                            </li>
                        </ul>
                    </section>

                    

                </div>
            </div>
        </div>
    )
}