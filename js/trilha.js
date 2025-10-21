// Perfis clássicos e novos aspectos do quiz
const modulos = [
    // Relação Interpessoal
    {
      nome: "Relação Interpessoal - Básico",
      perfil: "relacao",
      etapas: 4,
      conquista: "🤝 Relacionador Júnior",
      descricao: [
        "Construir confiança",
        "Praticar empatia",
        "Resolver conflitos",
        "Desenvolver networking",
      ],
    },
    {
      nome: "Relação Interpessoal - Avançado",
      perfil: "relacao",
      etapas: 4,
      conquista: "🤝 Relacionador Sênior",
      descricao: [
        "Mentorar colegas",
        "Gerenciar relacionamentos difíceis",
        "Promover colaboração",
        "Construir alianças estratégicas",
      ],
    },
    {
      nome: "Relação Interpessoal - Comunicação",
      perfil: "relacao",
      etapas: 4,
      conquista: "🗨️ Comunicador Relacional",
      descricao: [
        "Aprimorar comunicação interpessoal",
        "Ouvir ativamente",
        "Expressar sentimentos de forma clara",
        "Gerenciar mal-entendidos",
      ],
    },
    {
      nome: "Relação Interpessoal - Mediação",
      perfil: "relacao",
      etapas: 4,
      conquista: "🕊️ Mediador de Conflitos",
      descricao: [
        "Medir conflitos",
        "Buscar consenso",
        "Facilitar acordos",
        "Promover reconciliação",
      ],
    },
    {
      nome: "Relação Interpessoal - Diversidade",
      perfil: "relacao",
      etapas: 4,
      conquista: "🌈 Promotor da Diversidade",
      descricao: [
        "Valorizar diferenças",
        "Incluir perspectivas diversas",
        "Combater preconceitos",
        "Promover respeito mútuo",
      ],
    },
    {
      nome: "Relação Interpessoal - Networking Avançado",
      perfil: "relacao",
      etapas: 4,
      conquista: "🔗 Mestre do Networking",
      descricao: [
        "Expandir rede de contatos",
        "Manter relacionamentos profissionais",
        "Aproveitar oportunidades de networking",
        "Gerar parcerias estratégicas",
      ],
    },
    {
      nome: "Relação Interpessoal - Influência",
      perfil: "relacao",
      etapas: 4,
      conquista: "� Influenciador Social",
      descricao: [
        "Influenciar positivamente",
        "Inspirar confiança",
        "Ser referência no grupo",
        "Mobilizar pessoas para objetivos comuns",
      ],
    },
    {
      nome: "Relação Interpessoal - Comunicação Avançada",
      perfil: "relacao",
      etapas: 4,
      conquista: "🗣️ Comunicador de Relacionamento",
      descricao: [
        "Comunicar com clareza",
        "Ouvir ativamente",
        "Adaptar linguagem ao público",
        "Gerenciar feedbacks",
      ],
    },
    {
      nome: "Relação Interpessoal - Diversidade Avançada",
      perfil: "relacao",
      etapas: 4,
      conquista: "🌍 Promotor da Diversidade",
      descricao: [
        "Valorizar diferenças",
        "Promover inclusão",
        "Medir clima organizacional",
        "Celebrar conquistas diversas",
      ],
    },
    {
      nome: "Relação Interpessoal - Influência Avançada",
      perfil: "relacao",
      etapas: 4,
      conquista: "🏅 Influenciador Social",
      descricao: [
        "Negociar acordos",
        "Influenciar decisões",
        "Gerar engajamento",
        "Construir reputação positiva",
      ],
    },
    {
      nome: "Relação Interpessoal - Mediação Profunda",
      perfil: "relacao",
      etapas: 4,
      conquista: "🕊️ Mediador de Conflitos",
      descricao: [
        "Identificar conflitos",
        "Medir impactos",
        "Facilitar acordos",
        "Restaurar relações",
      ],
    },
    {
      nome: "Relação Interpessoal - Networking Profundo",
      perfil: "relacao",
      etapas: 4,
      conquista: "🔗 Conector de Oportunidades",
      descricao: [
        "Expandir rede de contatos",
        "Manter relacionamentos",
        "Apoiar colegas",
        "Gerar oportunidades para outros",
      ],
    },
    // Liderança
    {
      nome: "Liderança - Fundamentos",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🌟 Líder em Formação",
      descricao: [
        "Inspirar e motivar equipe",
        "Delegar responsabilidades",
        "Tomar decisões assertivas",
        "Dar feedbacks construtivos",
      ],
    },
    {
      nome: "Liderança - Estratégica",
      perfil: "lideranca",
      etapas: 4,
      conquista: "� Líder Estratégico",
      descricao: [
        "Desenvolver visão de futuro",
        "Gerenciar mudanças",
        "Liderar sob pressão",
        "Formar novos líderes",
      ],
    },
    {
      nome: "Liderança - Comunicação",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🗣️ Comunicador de Liderança",
      descricao: [
        "Comunicar visão",
        "Inspirar por meio da fala",
        "Gerenciar expectativas",
        "Promover alinhamento de equipe",
      ],
    },
    {
      nome: "Liderança - Coaching",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🧑‍� Líder Coach",
      descricao: [
        "Desenvolver talentos",
        "Apoiar crescimento individual",
        "Oferecer feedback contínuo",
        "Celebrar conquistas do time",
      ],
    },
    {
      nome: "Liderança - Gestão de Crises",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🚨 Gestor de Crises",
      descricao: [
        "Liderar em situações adversas",
        "Tomar decisões rápidas",
        "Gerenciar recursos sob pressão",
        "Restaurar moral da equipe",
      ],
    },
    {
      nome: "Liderança - Inovação",
      perfil: "lideranca",
      etapas: 4,
      conquista: "💡 Líder Inovador",
      descricao: [
        "Estimular criatividade",
        "Promover cultura de inovação",
        "Implementar novas ideias",
        "Gerenciar mudanças disruptivas",
      ],
    },
    {
      nome: "Liderança - Ética",
      perfil: "lideranca",
      etapas: 4,
      conquista: "⚖️ Líder Ético",
      descricao: [
        "Tomar decisões responsáveis",
        "Ser exemplo de integridade",
        "Promover justiça",
        "Inspirar confiança ética",
      ],
    },
    {
      nome: "Liderança - Comunicação Avançada",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🗣️ Líder Comunicador",
      descricao: [
        "Comunicar visão",
        "Inspirar confiança",
        "Gerenciar crises",
        "Fomentar cultura de feedback",
      ],
    },
    {
      nome: "Liderança - Inovação Avançada",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🔬 Líder Inovador",
      descricao: [
        "Estimular criatividade",
        "Apoiar experimentação",
        "Gerenciar mudanças disruptivas",
        "Celebrar aprendizados",
      ],
    },
    {
      nome: "Liderança - Desenvolvimento de Pessoas",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🧑‍💼 Líder Desenvolvedor",
      descricao: [
        "Mentorar talentos",
        "Delegar para crescimento",
        "Reconhecer conquistas",
        "Promover sucessão",
      ],
    },
    {
      nome: "Liderança - Diversidade e Inclusão",
      perfil: "lideranca",
      etapas: 4,
      conquista: "� Líder Inclusivo",
      descricao: [
        "Promover diversidade",
        "Garantir equidade",
        "Combater vieses",
        "Valorizar perspectivas diferentes",
      ],
    },
    {
      nome: "Liderança - Resiliência",
      perfil: "lideranca",
      etapas: 4,
      conquista: "🛡️ Líder Resiliente",
      descricao: [
        "Gerenciar sob pressão",
        "Tomar decisões rápidas",
        "Comunicar em situações críticas",
        "Restaurar moral da equipe",
      ],
    },
    // Empreendedorismo
    {
      nome: "Empreendedorismo - Iniciação",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Empreendedor Júnior",
      descricao: [
        "Identificar oportunidades",
        "Assumir riscos calculados",
        "Inovar em processos",
        "Validar ideias de negócio",
      ],
    },
    {
      nome: "Empreendedorismo - Avançado",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Empreendedor Sênior",
      descricao: [
        "Escalar negócios",
        "Buscar investidores",
        "Gerenciar equipes empreendedoras",
        "Internacionalizar soluções",
      ],
    },
    {
      nome: "Empreendedorismo - Inovação",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Inovador Empreendedor",
      descricao: [
        "Criar novos produtos",
        "Testar modelos de negócio",
        "Adotar tecnologias emergentes",
        "Pivotar estratégias",
      ],
    },
    {
      nome: "Empreendedorismo - Finanças",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Gestor Financeiro",
      descricao: [
        "Planejar orçamento",
        "Controlar fluxo de caixa",
        "Buscar investimentos",
        "Gerenciar riscos financeiros",
      ],
    },
    {
      nome: "Empreendedorismo - Marketing",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Estrategista de Marketing",
      descricao: [
        "Desenvolver marca",
        "Planejar campanhas",
        "Analisar mercado",
        "Gerar leads",
      ],
    },
    {
      nome: "Empreendedorismo - Vendas",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Mestre em Vendas",
      descricao: [
        "Negociar com clientes",
        "Fechar contratos",
        "Gerenciar pós-venda",
        "Fidelizar clientes",
      ],
    },
    {
      nome: "Empreendedorismo - Sustentabilidade",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Empreendedor Sustentável",
      descricao: [
        "Implementar práticas sustentáveis",
        "Reduzir impactos ambientais",
        "Promover responsabilidade social",
        "Gerar valor compartilhado",
      ],
    },
    {
      nome: "Empreendedorismo - Inovação",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Inovador Empreendedor",
      descricao: [
        "Criar novos produtos",
        "Testar MVPs",
        "Pivotar modelos de negócio",
        "Escalar soluções inovadoras",
      ],
    },
    {
      nome: "Empreendedorismo - Finanças",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Gestor Financeiro",
      descricao: [
        "Planejar orçamento",
        "Buscar investimentos",
        "Gerenciar fluxo de caixa",
        "Analisar viabilidade",
      ],
    },
    {
      nome: "Empreendedorismo - Marketing",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Estrategista de Marketing",
      descricao: [
        "Criar campanhas digitais",
        "Gerenciar redes sociais",
        "Analisar métricas",
        "Construir marca forte",
      ],
    },
    {
      nome: "Empreendedorismo - Vendas",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Mestre de Vendas",
      descricao: [
        "Prospectar clientes",
        "Negociar contratos",
        "Fechar vendas",
        "Fidelizar clientes",
      ],
    },
    {
      nome: "Empreendedorismo - Gestão de Pessoas",
      perfil: "empreendedorismo",
      etapas: 4,
      conquista: "🚀 Gestor de Pessoas",
      descricao: [
        "Contratar talentos",
        "Desenvolver equipes",
        "Gerenciar conflitos",
        "Promover cultura empreendedora",
      ],
    },
    // Comunicação eficaz
    {
      nome: "Comunicação Eficaz - Essencial",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Comunicador Essencial",
      descricao: [
        "Praticar escuta ativa",
        "Expressar ideias com clareza",
        "Dar e receber feedback construtivo",
        "Comunicação não-verbal",
      ],
    },
    {
      nome: "Comunicação Eficaz - Avançada",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Comunicador Avançado",
      descricao: [
        "Falar em público",
        "Negociar com assertividade",
        "Gerenciar crises de comunicação",
        "Comunicação intercultural",
      ],
    },
    {
      nome: "Comunicação Eficaz - Digital",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Comunicador Digital",
      descricao: [
        "Comunicar-se em redes sociais",
        "Gerenciar reputação online",
        "Produzir conteúdo digital",
        "Utilizar ferramentas de comunicação digital",
      ],
    },
    {
      nome: "Comunicação Eficaz - Persuasão",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Mestre da Persuasão",
      descricao: [
        "Convencer audiências",
        "Usar técnicas de storytelling",
        "Influenciar decisões",
        "Gerar engajamento",
      ],
    },
    {
      nome: "Comunicação Eficaz - Escrita",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Escritor Profissional",
      descricao: [
        "Redigir e-mails eficazes",
        "Produzir relatórios claros",
        "Elaborar propostas",
        "Aprimorar gramática e ortografia",
      ],
    },
    {
      nome: "Comunicação Eficaz - Negociação",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Negociador Habilidoso",
      descricao: [
        "Preparar negociações",
        "Definir objetivos",
        "Gerenciar concessões",
        "Fechar acordos vantajosos",
      ],
    },
    {
      nome: "Comunicação Eficaz - Liderança",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Líder Comunicador",
      descricao: [
        "Inspirar equipes",
        "Comunicar metas",
        "Gerenciar conflitos por comunicação",
        "Celebrar conquistas do grupo",
      ],
    },
    {
      nome: "Comunicação Eficaz - Digital",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Comunicador Digital",
      descricao: [
        "Comunicar em redes sociais",
        "Produzir conteúdo digital",
        "Gerenciar reputação online",
        "Utilizar ferramentas digitais",
      ],
    },
    {
      nome: "Comunicação Eficaz - Negociação",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Negociador Eficaz",
      descricao: [
        "Preparar argumentos",
        "Lidar com objeções",
        "Fechar acordos",
        "Manter relacionamentos pós-negociação",
      ],
    },
    {
      nome: "Comunicação Eficaz - Apresentações",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Mestre de Apresentações",
      descricao: [
        "Criar apresentações impactantes",
        "Usar recursos visuais",
        "Controlar o tempo",
        "Engajar a audiência",
      ],
    },
    {
      nome: "Comunicação Eficaz - Relacionamento",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Comunicador Relacional",
      descricao: [
        "Construir rapport",
        "Gerenciar expectativas",
        "Resolver mal-entendidos",
        "Promover comunicação aberta",
      ],
    },
    {
      nome: "Comunicação Eficaz - Liderança",
      perfil: "comunicacao_eficaz",
      etapas: 4,
      conquista: "🗣 Líder Comunicador",
      descricao: [
        "Inspirar equipes",
        "Comunicar metas",
        "Dar feedbacks estratégicos",
        "Celebrar conquistas em público",
      ],
    },
    // Inteligência emocional
    {
      nome: "Inteligência Emocional - Autoconhecimento",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Autoconsciente",
      descricao: [
        "Reconhecer emoções",
        "Gerenciar emoções",
        "Praticar empatia",
        "Desenvolver resiliência",
      ],
    },
    {
      nome: "Inteligência Emocional - Liderança",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Líder Emocional",
      descricao: [
        "Inspirar confiança emocional",
        "Gerenciar conflitos emocionais",
        "Promover bem-estar no time",
        "Tomar decisões equilibradas",
      ],
    },
    {
      nome: "Inteligência Emocional - Autocontrole",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Mestre do Autocontrole",
      descricao: [
        "Controlar impulsos",
        "Gerenciar ansiedade",
        "Manter calma sob pressão",
        "Desenvolver paciência",
      ],
    },
    {
      nome: "Inteligência Emocional - Relacionamentos",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Gestor de Relacionamentos",
      descricao: [
        "Construir relações saudáveis",
        "Gerenciar expectativas alheias",
        "Resolver conflitos emocionais",
        "Apoiar colegas emocionalmente",
      ],
    },
    {
      nome: "Inteligência Emocional - Motivação",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Motivador",
      descricao: [
        "Definir metas pessoais",
        "Buscar autodesenvolvimento",
        "Superar desafios emocionais",
        "Celebrar conquistas pessoais",
      ],
    },
    {
      nome: "Inteligência Emocional - Empatia",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Empático",
      descricao: [
        "Compreender sentimentos dos outros",
        "Praticar escuta ativa",
        "Apoiar emocionalmente",
        "Promover ambiente acolhedor",
      ],
    },
    {
      nome: "Inteligência Emocional - Resiliência",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Resiliente",
      descricao: [
        "Superar adversidades",
        "Aprender com fracassos",
        "Manter otimismo",
        "Adaptar-se a mudanças emocionais",
      ],
    },
    {
      nome: "Inteligência Emocional - Resiliência",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Resiliente Emocional",
      descricao: [
        "Superar adversidades",
        "Manter otimismo",
        "Aprender com fracassos",
        "Apoiar colegas em dificuldades",
      ],
    },
    {
      nome: "Inteligência Emocional - Autocontrole",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Mestre do Autocontrole",
      descricao: [
        "Controlar impulsos",
        "Gerenciar ansiedade",
        "Praticar mindfulness",
        "Tomar decisões racionais",
      ],
    },
    {
      nome: "Inteligência Emocional - Empatia",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Empático",
      descricao: [
        "Ouvir sem julgar",
        "Compreender emoções alheias",
        "Apoiar emocionalmente",
        "Promover ambiente acolhedor",
      ],
    },
    {
      nome: "Inteligência Emocional - Comunicação",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Comunicador Emocional",
      descricao: [
        "Expressar sentimentos",
        "Dar feedbacks empáticos",
        "Gerenciar conversas difíceis",
        "Celebrar conquistas emocionais",
      ],
    },
    {
      nome: "Inteligência Emocional - Bem-estar",
      perfil: "inteligencia_emocional",
      etapas: 4,
      conquista: "🧠 Promotor de Bem-estar",
      descricao: [
        "Cuidar da saúde mental",
        "Promover equilíbrio",
        "Reduzir estresse",
        "Apoiar qualidade de vida",
      ],
    },
    // Adaptabilidade
    {
      nome: "Adaptabilidade - Flexibilidade",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Flexível",
      descricao: [
        "Ajustar-se a mudanças",
        "Aprender novas habilidades",
        "Buscar soluções criativas",
        "Lidar com incertezas",
      ],
    },
    {
      nome: "Adaptabilidade - Inovação",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Inovador Adaptativo",
      descricao: [
        "Propor melhorias",
        "Adotar novas tecnologias",
        "Gerenciar mudanças rápidas",
        "Transformar desafios em oportunidades",
      ],
    },
    {
      nome: "Adaptabilidade - Aprendizagem",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Aprendiz Contínuo",
      descricao: [
        "Buscar novos conhecimentos",
        "Aprender com experiências",
        "Adaptar métodos de trabalho",
        "Compartilhar aprendizados",
      ],
    },
    {
      nome: "Adaptabilidade - Mudança de Cenário",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Agente de Mudança",
      descricao: [
        "Adaptar-se a novos ambientes",
        "Gerenciar transições",
        "Apoiar colegas em mudanças",
        "Promover cultura adaptativa",
      ],
    },
    {
      nome: "Adaptabilidade - Resiliência",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Resiliente Adaptativo",
      descricao: [
        "Superar obstáculos",
        "Manter motivação",
        "Aprender com fracassos",
        "Persistir diante de desafios",
      ],
    },
    {
      nome: "Adaptabilidade - Criatividade",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Criativo Adaptativo",
      descricao: [
        "Gerar ideias inovadoras",
        "Experimentar novas abordagens",
        "Estimular pensamento criativo",
        "Aplicar soluções originais",
      ],
    },
    {
      nome: "Adaptabilidade - Proatividade",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Proativo",
      descricao: [
        "Antecipar mudanças",
        "Tomar iniciativa",
        "Buscar melhorias contínuas",
        "Influenciar positivamente o ambiente",
      ],
    },
    {
      nome: "Adaptabilidade - Mudança de Carreira",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Explorador de Carreiras",
      descricao: [
        "Identificar novas oportunidades",
        "Planejar transições",
        "Desenvolver novas competências",
        "Adaptar-se a novos ambientes",
      ],
    },
    {
      nome: "Adaptabilidade - Aprendizagem Contínua",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Aprendiz Contínuo",
      descricao: [
        "Buscar novos conhecimentos",
        "Participar de treinamentos",
        "Aplicar aprendizados",
        "Compartilhar conhecimento",
      ],
    },
    {
      nome: "Adaptabilidade - Resiliência",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Resiliente",
      descricao: [
        "Superar adversidades",
        "Manter motivação",
        "Apoiar colegas em mudanças",
        "Celebrar conquistas após desafios",
      ],
    },
    {
      nome: "Adaptabilidade - Criatividade",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Criativo Adaptativo",
      descricao: [
        "Gerar ideias inovadoras",
        "Testar soluções alternativas",
        "Aprender com erros",
        "Implementar melhorias",
      ],
    },
    {
      nome: "Adaptabilidade - Gestão de Mudanças",
      perfil: "adaptabilidade",
      etapas: 4,
      conquista: "🌊 Gestor de Mudanças",
      descricao: [
        "Planejar mudanças",
        "Comunicar transições",
        "Gerenciar resistência",
        "Avaliar resultados de mudanças",
      ],
    },
    // Resolução de problemas
    {
      nome: "Resolução de Problemas - Diagnóstico",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Diagnóstico",
      descricao: [
        "Identificar causas de problemas",
        "Analisar alternativas",
        "Implementar soluções eficazes",
        "Avaliar resultados",
      ],
    },
    {
      nome: "Resolução de Problemas - Estratégico",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Estrategista",
      descricao: [
        "Pensar fora da caixa",
        "Gerenciar riscos",
        "Liderar resolução coletiva",
        "Documentar aprendizados",
      ],
    },
    {
      nome: "Resolução de Problemas - Análise",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Analista de Problemas",
      descricao: [
        "Coletar dados",
        "Identificar padrões",
        "Gerar hipóteses",
        "Testar soluções",
      ],
    },
    {
      nome: "Resolução de Problemas - Tomada de Decisão",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Decisor",
      descricao: [
        "Avaliar opções",
        "Considerar consequências",
        "Escolher melhor alternativa",
        "Implementar decisão",
      ],
    },
    {
      nome: "Resolução de Problemas - Criatividade",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Criativo",
      descricao: [
        "Gerar ideias inovadoras",
        "Explorar soluções não convencionais",
        "Estimular brainstorming",
        "Aplicar criatividade em problemas",
      ],
    },
    {
      nome: "Resolução de Problemas - Colaboração",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Colaborador de Soluções",
      descricao: [
        "Trabalhar em equipe para resolver problemas",
        "Compartilhar conhecimento",
        "Apoiar colegas",
        "Celebrar soluções coletivas",
      ],
    },
    {
      nome: "Resolução de Problemas - Avaliação",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Avaliador de Resultados",
      descricao: [
        "Medir impacto das soluções",
        "Ajustar estratégias",
        "Documentar aprendizados",
        "Promover melhoria contínua",
      ],
    },
    {
      nome: "Resolução de Problemas - Análise de Dados",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Analista de Dados",
      descricao: [
        "Coletar dados relevantes",
        "Interpretar informações",
        "Gerar insights",
        "Tomar decisões baseadas em dados",
      ],
    },
    {
      nome: "Resolução de Problemas - Criatividade",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Criativo Solucionador",
      descricao: [
        "Gerar ideias inovadoras",
        "Testar soluções alternativas",
        "Aprender com erros",
        "Implementar melhorias",
      ],
    },
    {
      nome: "Resolução de Problemas - Colaborativo",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Solucionador Colaborativo",
      descricao: [
        "Trabalhar em equipe",
        "Ouvir diferentes perspectivas",
        "Construir soluções conjuntas",
        "Celebrar conquistas coletivas",
      ],
    },
    {
      nome: "Resolução de Problemas - Tomada de Decisão",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Decisor Ágil",
      descricao: [
        "Analisar cenários",
        "Avaliar riscos",
        "Escolher melhores alternativas",
        "Implementar decisões rapidamente",
      ],
    },
    {
      nome: "Resolução de Problemas - Gestão de Crises",
      perfil: "resolucao_problemas",
      etapas: 4,
      conquista: "🧩 Gestor de Crises",
      descricao: [
        "Identificar crises",
        "Planejar respostas",
        "Comunicar soluções",
        "Restaurar normalidade",
      ],
    },
    // Trabalho em equipe
    {
      nome: "Trabalho em Equipe - Colaboração",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Colaborador Ativo",
      descricao: [
        "Colaborar com colegas",
        "Resolver conflitos",
        "Apoiar o desenvolvimento do grupo",
        "Celebrar conquistas em equipe",
      ],
    },
    {
      nome: "Trabalho em Equipe - Liderança",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Líder de Equipe",
      descricao: [
        "Distribuir tarefas",
        "Motivar o grupo",
        "Gerenciar diversidade",
        "Promover inclusão",
      ],
    },
    {
      nome: "Trabalho em Equipe - Comunicação",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Comunicador de Equipe",
      descricao: [
        "Facilitar reuniões",
        "Promover diálogo aberto",
        "Gerenciar feedbacks",
        "Alinhar expectativas do grupo",
      ],
    },
    {
      nome: "Trabalho em Equipe - Diversidade",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Promotor da Diversidade em Equipe",
      descricao: [
        "Valorizar diferentes perspectivas",
        "Incluir todos os membros",
        "Combater preconceitos",
        "Promover respeito mútuo",
      ],
    },
    {
      nome: "Trabalho em Equipe - Resolução de Conflitos",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Mediador de Equipe",
      descricao: [
        "Identificar conflitos",
        "Medir disputas",
        "Buscar soluções coletivas",
        "Restaurar harmonia",
      ],
    },
    {
      nome: "Trabalho em Equipe - Colaboração Digital",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Colaborador Digital",
      descricao: [
        "Utilizar ferramentas colaborativas",
        "Gerenciar projetos online",
        "Comunicar-se virtualmente",
        "Acompanhar progresso digitalmente",
      ],
    },
    {
      nome: "Trabalho em Equipe - Proatividade",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Proativo em Equipe",
      descricao: [
        "Antecipar necessidades do grupo",
        "Tomar iniciativa",
        "Apoiar colegas espontaneamente",
        "Buscar melhorias para a equipe",
      ],
    },
    {
      nome: "Trabalho em Equipe - Comunicação",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Comunicador de Equipe",
      descricao: [
        "Facilitar reuniões",
        "Promover diálogo aberto",
        "Gerenciar expectativas",
        "Celebrar conquistas em grupo",
      ],
    },
    {
      nome: "Trabalho em Equipe - Diversidade",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Equipe Diversa",
      descricao: [
        "Valorizar diferentes perfis",
        "Promover inclusão",
        "Gerenciar conflitos culturais",
        "Aproveitar talentos diversos",
      ],
    },
    {
      nome: "Trabalho em Equipe - Colaboração Remota",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Colaborador Remoto",
      descricao: [
        "Usar ferramentas digitais",
        "Gerenciar equipes à distância",
        "Manter engajamento remoto",
        "Celebrar conquistas online",
      ],
    },
    {
      nome: "Trabalho em Equipe - Gestão de Projetos",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Gestor de Projetos",
      descricao: [
        "Planejar projetos em equipe",
        "Distribuir responsabilidades",
        "Acompanhar entregas",
        "Avaliar resultados em grupo",
      ],
    },
    {
      nome: "Trabalho em Equipe - Resolução de Conflitos",
      perfil: "trabalho_equipe",
      etapas: 4,
      conquista: "🤝 Pacificador de Equipes",
      descricao: [
        "Identificar conflitos",
        "Medir impactos",
        "Facilitar acordos",
        "Restaurar relações em grupo",
      ],
    },
    // Gestão do tempo
    {
      nome: "Gestão do Tempo - Produtividade",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Produtivo",
      descricao: [
        "Definir prioridades",
        "Planejar tarefas",
        "Cumprir prazos",
        "Evitar procrastinação",
      ],
    },
    {
      nome: "Gestão do Tempo - Avançada",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Mestre do Tempo",
      descricao: [
        "Automatizar rotinas",
        "Delegar tarefas",
        "Gerenciar múltiplos projetos",
        "Equilibrar vida e trabalho",
      ],
    },
    {
      nome: "Gestão do Tempo - Planejamento",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Planejador",
      descricao: [
        "Elaborar cronogramas",
        "Definir metas de curto e longo prazo",
        "Acompanhar progresso",
        "Revisar planos periodicamente",
      ],
    },
    {
      nome: "Gestão do Tempo - Organização",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Organizador",
      descricao: [
        "Organizar ambiente de trabalho",
        "Priorizar tarefas",
        "Reduzir distrações",
        "Manter rotina eficiente",
      ],
    },
    {
      nome: "Gestão do Tempo - Foco",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Focado",
      descricao: [
        "Evitar interrupções",
        "Manter concentração",
        "Gerenciar tempo de tela",
        "Atingir objetivos diários",
      ],
    },
    {
      nome: "Gestão do Tempo - Equilíbrio",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Equilibrado",
      descricao: [
        "Equilibrar vida pessoal e profissional",
        "Gerenciar estresse",
        "Reservar tempo para lazer",
        "Cuidar da saúde mental",
      ],
    },
    {
      nome: "Gestão do Tempo - Produtividade Digital",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Produtivo Digital",
      descricao: [
        "Utilizar ferramentas digitais",
        "Automatizar tarefas online",
        "Gerenciar agenda eletrônica",
        "Aproveitar recursos tecnológicos",
      ],
    },
    {
      nome: "Gestão do Tempo - Planejamento",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Planejador",
      descricao: [
        "Definir metas",
        "Organizar cronogramas",
        "Priorizar atividades",
        "Revisar planos periodicamente",
      ],
    },
    {
      nome: "Gestão do Tempo - Produtividade Digital",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Digitalmente Produtivo",
      descricao: [
        "Usar apps de produtividade",
        "Automatizar tarefas",
        "Gerenciar tempo online",
        "Reduzir distrações digitais",
      ],
    },
    {
      nome: "Gestão do Tempo - Equilíbrio",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Equilibrado",
      descricao: [
        "Equilibrar vida pessoal e profissional",
        "Gerenciar estresse",
        "Reservar tempo para lazer",
        "Cuidar da saúde mental",
      ],
    },
    {
      nome: "Gestão do Tempo - Eficiência",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Eficiente",
      descricao: [
        "Eliminar desperdícios de tempo",
        "Otimizar processos",
        "Delegar com eficiência",
        "Avaliar produtividade",
      ],
    },
    {
      nome: "Gestão do Tempo - Foco",
      perfil: "gestao_tempo",
      etapas: 4,
      conquista: "⏰ Focado",
      descricao: [
        "Evitar multitarefas",
        "Manter concentração",
        "Estabelecer rotinas",
        "Celebrar metas atingidas",
      ],
    },
    // Ética profissional
    {
      nome: "Ética Profissional - Fundamentos",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Ético Fundamental",
      descricao: [
        "Agir com integridade",
        "Respeitar normas e valores",
        "Promover ambiente justo",
        "Denunciar condutas inadequadas",
      ],
    },
    {
      nome: "Ética Profissional - Liderança",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Líder Ético",
      descricao: [
        "Inspirar ética na equipe",
        "Tomar decisões responsáveis",
        "Promover diversidade e respeito",
        "Ser exemplo de conduta",
      ],
    },
    {
      nome: "Ética Profissional - Responsabilidade",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Responsável",
      descricao: [
        "Cumprir compromissos",
        "Assumir consequências",
        "Ser transparente",
        "Promover responsabilidade coletiva",
      ],
    },
    {
      nome: "Ética Profissional - Justiça",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Justo",
      descricao: [
        "Promover igualdade",
        "Combater discriminação",
        "Defender direitos",
        "Garantir tratamento imparcial",
      ],
    },
    {
      nome: "Ética Profissional - Sustentabilidade",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Sustentável",
      descricao: [
        "Adotar práticas sustentáveis",
        "Reduzir impactos ambientais",
        "Promover responsabilidade social",
        "Gerar valor para a sociedade",
      ],
    },
    {
      nome: "Ética Profissional - Transparência",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Transparente",
      descricao: [
        "Comunicar decisões abertamente",
        "Prestar contas",
        "Evitar conflitos de interesse",
        "Promover cultura de transparência",
      ],
    },
    {
      nome: "Ética Profissional - Cidadania",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Cidadão Ético",
      descricao: [
        "Exercer cidadania ativa",
        "Participar de ações sociais",
        "Promover bem comum",
        "Ser exemplo na comunidade",
      ],
    },
    {
      nome: "Ética Profissional - Compliance",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Guardião do Compliance",
      descricao: [
        "Conhecer normas legais",
        "Implementar políticas",
        "Monitorar conformidade",
        "Reportar desvios",
      ],
    },
    {
      nome: "Ética Profissional - Responsabilidade Social",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Responsável Social",
      descricao: [
        "Promover ações sociais",
        "Incentivar voluntariado",
        "Gerar impacto positivo",
        "Engajar a comunidade",
      ],
    },
    {
      nome: "Ética Profissional - Transparência",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Transparente",
      descricao: [
        "Comunicar decisões",
        "Prestar contas",
        "Garantir acesso à informação",
        "Promover cultura de abertura",
      ],
    },
    {
      nome: "Ética Profissional - Justiça",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Justo",
      descricao: [
        "Tratar todos com equidade",
        "Combater discriminação",
        "Promover igualdade de oportunidades",
        "Corrigir injustiças",
      ],
    },
    {
      nome: "Ética Profissional - Sustentabilidade",
      perfil: "etica_profissional",
      etapas: 4,
      conquista: "⚖️ Sustentável",
      descricao: [
        "Adotar práticas sustentáveis",
        "Reduzir impactos ambientais",
        "Promover consumo consciente",
        "Engajar em projetos verdes",
      ],
    },
  ];

  // Inicializa progressoUsuario com base no progresso salvo/localStorage
  let progressoUsuario = [];
  let conquistas = [];

  function inicializarProgresso() {
    // Tenta restaurar progresso do localStorage
    const progressoSalvo = localStorage.getItem("pdi_progress");
    if (progressoSalvo) {
      try {
        const progresso = JSON.parse(progressoSalvo);
        // Se progresso for objeto (do backend), alinhar pelo id do módulo
        if (
          progresso &&
          typeof progresso === "object" &&
          !Array.isArray(progresso)
        ) {
          progressoUsuario = modulos.map((mod, idx) => {
            // O id do módulo no banco é idx+1
            const arr =
              progresso[(idx + 1).toString()] || progresso[idx + 1] || [];
            return Array.from(
              { length: mod.etapas },
              (_, i) => arr[i] === true
            );
          });
        } else if (Array.isArray(progresso)) {
          progressoUsuario = modulos.map((mod, idx) => {
            if (progresso[idx] && Array.isArray(progresso[idx])) {
              return progresso[idx].slice(0, mod.etapas).map(Boolean);
            } else {
              return Array(mod.etapas).fill(false);
            }
          });
        } else {
          progressoUsuario = modulos.map((mod) =>
            Array(mod.etapas).fill(false)
          );
        }
      } catch {
        progressoUsuario = modulos.map((mod) =>
          Array(mod.etapas).fill(false)
        );
      }
    } else {
      progressoUsuario = modulos.map((mod) =>
        Array(mod.etapas).fill(false)
      );
    }
    // Atualiza conquistas
    conquistas = [];
    modulos.forEach((mod, idx) => {
      if (progressoUsuario[idx].filter(Boolean).length === mod.etapas) {
        conquistas.push(mod.conquista);
      }
    });
  }

  // Renderiza as trilhas
  function renderPaths() {
    const pathList = document.querySelector(".path-list");
    pathList.innerHTML = "";
    // Filtra módulos conforme perfil selecionado ou dominante
    let perfilSelecionado = "";
    try {
      const user = JSON.parse(localStorage.getItem("pdi_user"));
      perfilSelecionado = user && user.perfil ? user.perfil : "";
    } catch {}
    if (!perfilSelecionado || perfilSelecionado === "") {
      perfilSelecionado = localStorage.getItem("perfilProfissional") || "";
    }
    // Se for um dos aspectos do quiz, mostra só o módulo correspondente
    let modulosFiltrados = modulos;
    if (
      [
        "comunicacao_eficaz",
        "inteligencia_emocional",
        "adaptabilidade",
        "resolucao_problemas",
        "trabalho_equipe",
        "gestao_tempo",
        "etica_profissional",
      ].includes(perfilSelecionado)
    ) {
      modulosFiltrados = modulos.filter(
        (m) => m.perfil === perfilSelecionado
      );
    } else if (
      ["relacao", "lideranca", "empreendedorismo"].includes(
        perfilSelecionado
      )
    ) {
      modulosFiltrados = modulos.filter(
        (m) => m.perfil === perfilSelecionado
      );
    }
    if (modulosFiltrados.length === 0) modulosFiltrados = modulos;
    modulosFiltrados.forEach((modulo, idx) => {
      // idx real do módulo no array original
      const idxReal = modulos.findIndex((m) => m.nome === modulo.nome);
      const etapasConcluidas =
        progressoUsuario[idxReal]?.filter(Boolean).length || 0;
      const div = document.createElement("div");
      div.className = "modulo-card";
      div.innerHTML = `
        <h3>${modulo.nome}</h3>
        <p>Etapas concluídas: ${etapasConcluidas} / ${modulo.etapas}</p>
        <ul>
          ${modulo.descricao
            .map(
              (desc, etapaIdx) => `
              <li>
                <label>
                  <input type="checkbox" data-modulo="${idxReal}" data-etapa="${etapaIdx}" ${
                progressoUsuario[idxReal]?.[etapaIdx] ? "checked" : ""
              }>
                  ${desc}
                </label>
              </li>
            `
            )
            .join("")}
        </ul>
      `;
      pathList.appendChild(div);
    });

    // Botão Salvar Progresso
    let btnSalvar = document.getElementById("btnSalvarProgresso");
    if (!btnSalvar) {
      btnSalvar = document.createElement("button");
      btnSalvar.id = "btnSalvarProgresso";
      btnSalvar.textContent = "Salvar Progresso";
      btnSalvar.style.margin = "24px auto 0 auto";
      btnSalvar.style.display = "block";
      btnSalvar.className = "btn-avaliar";
      pathList.parentElement.appendChild(btnSalvar);
    }
    btnSalvar.onclick = async function () {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("pdi_user"));
      } catch {
        user = null;
      }
      if (!user || !user.id) {
        alert("Usuário não identificado. Faça login novamente.");
        return;
      }
      // Monta objeto {modulo_id: [etapas...]} para o backend
      const progressoObj = {};
      modulos.forEach((mod, idx) => {
        progressoObj[idx + 1] = progressoUsuario[idx].map(Boolean);
      });
      try {
        const response = await fetch("php/salvar_trilha.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            usuario_id: user.id,
            progresso: progressoObj,
          }),
        });
        const result = await response.json();
        if (result && result.success) {
          localStorage.setItem(
            "pdi_progress",
            JSON.stringify(progressoObj)
          );
          alert("Progresso salvo com sucesso!");
        } else {
          alert("Erro ao salvar progresso no banco de dados.");
        }
      } catch (error) {
        alert("Erro ao salvar progresso no banco de dados.");
      }
    };

    // Adiciona eventos aos checkboxes
    document
      .querySelectorAll("input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.addEventListener("change", async (event) => {
          const moduloIdx = parseInt(event.target.dataset.modulo);
          const etapaIdx = parseInt(event.target.dataset.etapa);
          const valorAnterior = progressoUsuario[moduloIdx][etapaIdx];
          progressoUsuario[moduloIdx][etapaIdx] = event.target.checked;

          // Só salva se houve alteração real
          if (valorAnterior !== event.target.checked) {
            // Salvar progresso no banco de dados via POST (apenas o módulo alterado)
            const user = JSON.parse(localStorage.getItem("pdi_user"));
            if (user && user.id) {
              const progressoObj = {};
              progressoObj[moduloIdx + 1] =
                progressoUsuario[moduloIdx].map(Boolean);
              try {
                const response = await fetch("php/salvar_trilha.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({
                    usuario_id: user.id,
                    progresso: progressoObj,
                  }),
                });
                const result = await response.json();
                if (result && result.success) {
                  // Atualiza localStorage (mantendo todos os módulos)
                  let progressoAtual = {};
                  try {
                    progressoAtual =
                      JSON.parse(localStorage.getItem("pdi_progress")) ||
                      {};
                  } catch {
                    progressoAtual = {};
                  }
                  progressoAtual[moduloIdx + 1] =
                    progressoUsuario[moduloIdx].map(Boolean);
                  localStorage.setItem(
                    "pdi_progress",
                    JSON.stringify(progressoAtual)
                  );
                } else if (
                  result &&
                  result.message &&
                  result.message.includes("Usuário não identificado")
                ) {
                  // Sessão expirada ou inválida
                  alert("Sua sessão expirou. Faça login novamente.");
                  window.location.href = "login.html";
                  return;
                } else {
                  // Reverte alteração local se falhar
                  progressoUsuario[moduloIdx][etapaIdx] = valorAnterior;
                  alert("Erro ao salvar progresso no banco de dados.");
                  renderPaths();
                  return;
                }
              } catch (error) {
                progressoUsuario[moduloIdx][etapaIdx] = valorAnterior;
                alert("Erro ao salvar progresso no banco de dados.");
                renderPaths();
                return;
              }
            } else {
              // Usuário não identificado localmente
              alert("Faça login para salvar seu progresso.");
              window.location.href = "login.html";
              return;
            }
          }

          const etapasConcluidas =
            progressoUsuario[moduloIdx].filter(Boolean).length;
          if (etapasConcluidas === modulos[moduloIdx].etapas) {
            if (!conquistas.includes(modulos[moduloIdx].conquista)) {
              conquistas.push(modulos[moduloIdx].conquista);
              atualizarConquistas();
              alert(
                `Parabéns! Você concluiu o módulo ${modulos[moduloIdx].nome}!`
              );
            }
          }
          atualizarStatus();
          renderPaths();
        });
      });
  }

  // Atualiza o status de progresso e conquistas
  function atualizarStatus() {
    const totalEtapas = progressoUsuario.flat().filter(Boolean).length;
    document.getElementById(
      "etapasStatus"
    ).textContent = `🎯 ${totalEtapas}`;
    document.getElementById(
      "conquistasStatus"
    ).textContent = `🏅 ${conquistas.length}`;
  }

  // Atualiza as conquistas
  function atualizarConquistas() {
    const badges = document.getElementById("badges");
    badges.innerHTML = "";
    conquistas.forEach((c) => {
      const badge = document.createElement("div");
      badge.className = "badge-card";
      badge.textContent = c;
      badges.appendChild(badge);
    });
  }

  // Exibe a tela de seleção de perfil
  async function mostrarSelecaoPerfil() {
    document.getElementById("login").style.display = "flex";
    document.getElementById("app").style.display = "none";
    // Salva o progresso atual no banco e no localStorage ao trocar de perfil
    if (progressoUsuario && progressoUsuario.length === modulos.length) {
      const progressoObj = {};
      modulos.forEach((mod, idx) => {
        progressoObj[idx + 1] = progressoUsuario[idx].map(Boolean);
      });
      localStorage.setItem("pdi_progress", JSON.stringify(progressoObj));
      // Salva no banco
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("pdi_user"));
      } catch {
        user = null;
      }
      if (user && user.id) {
        try {
          await fetch("salvar_trilha.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              usuario_id: user.id,
              progresso: progressoObj,
            }),
          });
        } catch {}
      }
    }
  }

  // Exibe a tela principal
  function mostrarTrilha() {
    try {
      const user = JSON.parse(localStorage.getItem("pdi_user"));
      if (user && user.perfil) atualizarPerfilProfissional(user.perfil);
    } catch {}
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    inicializarProgresso();
    renderPaths();
    atualizarStatus();
    atualizarConquistas();
  }

  // Configura os eventos dos botões
  document.getElementById("btn-voltar").onclick = function () {
    window.location.href = "telainicial.html";
  };

  document.getElementById("btn-mudar-perfil").onclick = async function () {
    // Ao trocar de perfil, salva o progresso atual no banco e força recarregar do backend ao logar novamente
    if (progressoUsuario && progressoUsuario.length === modulos.length) {
      const progressoObj = {};
      modulos.forEach((mod, idx) => {
        progressoObj[idx + 1] = progressoUsuario[idx].map(Boolean);
      });
      localStorage.setItem("pdi_progress", JSON.stringify(progressoObj));
      // Salva no banco
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("pdi_user"));
      } catch {
        user = null;
      }
      if (user && user.id) {
        try {
          await fetch("salvar_trilha.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              usuario_id: user.id,
              progresso: progressoObj,
            }),
          });
        } catch {}
      }
    }
    mostrarSelecaoPerfil();
  };

  document.getElementById("loginBtn").onclick = async function () {
    const nome = document.getElementById("username").value.trim();
    const perfil = document.getElementById("perfil").value;
    if (!nome || !perfil) {
      alert("Preencha seu nome e selecione um perfil profissional.");
      return;
    }
    // Mantém o id salvo do login, se existir
    const user = JSON.parse(localStorage.getItem("pdi_user")) || {};
    localStorage.setItem(
      "pdi_user",
      JSON.stringify({
        id: user.id,
        nome,
        perfil,
      })
    );
    document.getElementById("userName").textContent = `Olá, ${nome}!`;
    atualizarPerfilProfissional(perfil);
    mostrarTrilha();
  };
  function atualizarPerfilProfissional(perfil) {
    const span = document.querySelector("#perfilProfissional span");
    let texto = "Não definido";
    // Integração com resultado do quiz comportamental
    // O valor salvo no localStorage é o nome do aspecto dominante
    if (!perfil || perfil === "") {
      // Tenta buscar do localStorage (quiz)
      const perfilQuiz = localStorage.getItem("perfilProfissional");
      if (perfilQuiz) texto = perfilQuiz;
    } else {
      texto = perfil;
    }
    span.textContent = texto;
  }
  document.getElementById("alterarFotoBtn").onclick = function () {
    document.getElementById("avatarInput").click();
  };

  document.getElementById("avatarInput").onchange = async function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const avatarBase64 = reader.result;
        document.querySelector(
          ".avatar"
        ).innerHTML = `<img src="${avatarBase64}" alt="Avatar" style="border-radius: 50%; width: 80px; height: 80px;">`;

        // Salva a foto no banco de dados
        const user = JSON.parse(localStorage.getItem("pdi_user"));
        if (user) {
          try {
            const response = await fetch("php/salvar_foto.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                avatar: avatarBase64,
              }),
            });
            const result = await response.json();
            if (result.success) {
              alert("Foto de perfil atualizada com sucesso!");
            } else {
              alert("Erro ao salvar a foto de perfil.");
            }
          } catch (error) {
            alert("Erro ao conectar ao servidor.");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function carregarProgressoDoBackend() {
    try {
      const resposta = await fetch("php/get_progresso.php", {
        credentials: "include",
      });
      const dados = await resposta.json();
      if (dados.success) {
        // Salva nome e id do usuário no localStorage (opcional)
        localStorage.setItem(
          "pdi_user",
          JSON.stringify({ id: dados.usuario_id, nome: dados.usuario_nome })
        );
        // Salva progresso no localStorage para uso do JS existente
        localStorage.setItem(
          "pdi_progress",
          JSON.stringify(dados.progresso)
        );
        inicializarProgresso();
        if (typeof renderPaths === "function") renderPaths();
      } else {
        // Usuário não autenticado, redireciona para login
        alert("Sua sessão expirou. Faça login novamente.");
        window.location.href = "login.html";
      }
    } catch (e) {
      // Falha na requisição
      alert("Erro de conexão. Faça login novamente.");
      window.location.href = "login.html";
    }
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    carregarProgressoDoBackend().then(() => {
      mostrarSelecaoPerfil();
    });
  });