export const CATEGORIES = [
  {
    id: "alimentacao",
    nome: "Alimentação",
    subcategorias: [
      { id: "delivery", nome: "Delivery" },
      { id: "feira", nome: "Feira" },
      { id: "lanches", nome: "Lanches" },
      { id: "mercado", nome: "Mercado / Supermercado" },
      { id: "outraAlimentacao", nome: "Outra Despesa com Alimentação" },
      { id: "padaria", nome: "Padaria" },
      { id: "restaurante", nome: "Restaurante / Rodízio" },
    ]
  },
  {
    id: "moradia",
    nome: "Contas de Casa",
    subcategorias: [
      { id: "aluguel", nome: "Aluguel / Financiamento" },
      { id: "agua", nome: "Água" },
      { id: "condominio", nome: "Condomínio" },
      { id: "luz", nome: "Energia" },
      { id: "gas", nome: "Gás" },
      { id: "internet", nome: "Internet" },
      { id: "manutencao", nome: "Manutenção / Reparos" },
      { id: "outraMoradia", nome: "Outra Despesa de Casa" },
      { id: "tv", nome: "TV por Assinatura / Streaming" },
      { id: "telefone", nome: "Telefone / Celular" },
    ]
  },
  {
    id: "financas",
    nome: "Despesas Financeiras & Serviços",
    subcategorias: [
      { id: "investimentos", nome: "Aporte em Investimentos" },
      { id: "cofrinho", nome: "Cofrinho / Reserva de Emergência" },
      { id: "emprestimo", nome: "Empréstimo / Financiamento" },
      { id: "faturaCredito", nome: "Fatura do Cartão de Crédito" },
      { id: "imposto", nome: "Impostos" },
      { id: "outraFinanceira", nome: "Outra Despesa Financeira" },
      { id: "seguro", nome: "Seguros (Vida, Residência, etc.)" },
      { id: "taxasBancarias", nome: "Taxas Bancárias" },
    ]
  },
  {
    id: "despesasPessoais",
    nome: "Despesas Pessoais",
    subcategorias: [
      { id: "acessorios", nome: "Acessórios (relógio, óculos, bolsas)" },
      { id: "cabeleleiro", nome: "Cabeleleira / Barbearia" },
      { id: "comprasOnline", nome: "Compras Online (para mim)" },
      { id: "cosmeticos", nome: "Cosméticos / Perfumaria" },
      { id: "joias", nome: "Joias / Bijuterias" },
      { id: "outraCompraPessoal", nome: "Outra Compra Pessoal" },
      { id: "presentes", nome: "Presentes (para outras pessoas)" },
      { id: "salao", nome: "Salão de Beleza" },
      { id: "transferenciaPessoas", nome: "Transferência para outras pessoas" },
    ]
  },
  {
    id: "educacao",
    nome: "Educação",
    subcategorias: [
      { id: "curso", nome: "Cursos" },
      { id: "faculdade", nome: "Faculdade / Pós-graduação" },
      { id: "material", nome: "Material Escolar / Livros" },
      { id: "outraEducacao", nome: "Outra Despesa de Educação" },
    ]
  },
  {
    id: "lazer",
    nome: "Lazer & Entretenimento",
    subcategorias: [
      { id: "cinema", nome: "Cinema / Teatro" },
      { id: "festas", nome: "Festas / Bares" },
      { id: "hobbies", nome: "Hobbies" },
      { id: "esportes", nome: "Esportes" },
      { id: "outroLazer", nome: "Outra Despesa de Lazer" },
      { id: "viagem", nome: "Viagem" },
      { id: "hospedagem", nome: "Hospedagem" },
      { id: "jogosDigitais", nome: "Jogos Digitais" },
    ]
  },
  {
    id: "receitas",
    nome: "Receitas / Lucro",
    subcategorias: [
      { id: "aluguel", nome: "Aluguel Recebido" },
      { id: "bonus", nome: "Bônus / Comissões" },
      { id: "emprestimoRecebido", nome: "Empréstimo Recebido" },
      { id: "freelance", nome: "Freelance / Autônomo" },
      { id: "outraReceita", nome: "Outra Receita" },
      { id: "presente", nome: "Presente / Doação" },
      { id: "reembolso", nome: "Reembolso" },
      { id: "rendimentos", nome: "Rendimentos / Resgate de Investimentos" },
      { id: "salario", nome: "Salário" },
      { id: "vendas", nome: "Vendas" },
    ]
  },
  {
    id: "tecnologia",
    nome: "Tecnologia",
    subcategorias: [
      { id: "acessorios", nome: "Acessórios (fones, carregadores)" },
      { id: "celular", nome: "Celular / Smartphone" },
      { id: "console", nome: "Console" },
      { id: "reparos", nome: "Consertos / Reparos" },
      { id: "notebook", nome: "Notebook / Computador" },
      { id: "outraTecnologia", nome: "Outra Despesa com Tecnologia" },
      { id: "perifericos", nome: "Periféricos (mouse, teclado, etc.)" },
      { id: "tablet", nome: "Tablet" },
    ]
  },
  {
    id: "transporte",
    nome: "Transporte",
    subcategorias: [
      { id: "combustivel", nome: "Combustível" },
      { id: "estacionamento", nome: "Estacionamento" },
      { id: "ipva", nome: "IPVA / Licenciamento" },
      { id: "manutencaoCarro", nome: "Manutenção do Veículo" },
      { id: "onibus", nome: "Ônibus / Metrô" },
      { id: "outroTransporte", nome: "Outra Despesa de Transporte" },
      { id: "seguroCarro", nome: "Seguro do Veículo" },
      { id: "uber", nome: "Uber / Táxi / 99" },
    ]
  },
  {
    id: "vestuario",
    nome: "Vestuário & Acessórios",
    subcategorias: [
      { id: "acessorios", nome: "Acessórios" },
      { id: "calcados", nome: "Calçados" },
      { id: "outroVestuario", nome: "Outra Despesa com Vestuário" },
      { id: "roupas", nome: "Roupas" },
    ]
  },
  {
    id: "outros",
    nome: "Outros",
    subcategorias: []
  },
]