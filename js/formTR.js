 // Função para redirecionar para a trilha
      function redirecionarTrilha() {
        window.location.href = "trilha.html";
      }
      // Perfis clássicos do quiz comportamental
      const perfisQuiz = [
        {
          key: "executor",
          nome: "Executor",
          icone: "💼",
          descricao:
            "Foco em ação, resultados e liderança. Gosta de desafios e de tomar decisões rápidas.",
        },
        {
          key: "comunicador",
          nome: "Comunicador",
          icone: "🗣️",
          descricao:
            "Expressivo, entusiasta, influencia pessoas, valoriza relações e comunicação.",
        },
        {
          key: "planejador",
          nome: "Planejador",
          icone: "📅",
          descricao:
            "Organizado, metódico, valoriza planejamento, prazos e previsibilidade.",
        },
        {
          key: "analista",
          nome: "Analista",
          icone: "📊",
          descricao:
            "Detalhista, lógico, busca precisão, qualidade e segurança nas decisões.",
        },
        {
          key: "competitivo",
          nome: "Competitivo",
          icone: "🏆",
          descricao:
            "Motivado por metas, gosta de vencer, superar desafios e se destacar.",
        },
        {
          key: "colaborador",
          nome: "Colaborador",
          icone: "🤝",
          descricao:
            "Cooperativo, valoriza o grupo, gosta de ajudar e trabalhar em equipe.",
        },
        {
          key: "idealista",
          nome: "Idealista",
          icone: "🚀",
          descricao:
            "Inovador, criativo, busca propósito, gosta de criar e transformar.",
        },
        {
          key: "procrastinador",
          nome: "Procrastinador",
          icone: "⏳",
          descricao:
            "Tende a adiar tarefas, precisa de estímulo para agir e concluir projetos.",
        },
      ];

      // Perguntas do quiz comportamental (cada opção pode pontuar para mais de um perfil)
      const perguntas = [
        {
          texto: "Quando você recebe um novo desafio, qual sua reação?",
          opcoes: [
            {
              texto: "Já começo a agir e liderar a solução.",
              perfis: ["executor", "competitivo"],
            },
            {
              texto: "Converso com todos e motivo a equipe.",
              perfis: ["comunicador", "colaborador"],
            },
            {
              texto: "Faço um plano detalhado antes de agir.",
              perfis: ["planejador"],
            },
            {
              texto: "Analiso riscos e dados antes de decidir.",
              perfis: ["analista"],
            },
          ],
        },
        {
          texto: "O que mais te motiva em um projeto?",
          opcoes: [
            {
              texto: "Bater metas e ser reconhecido.",
              perfis: ["competitivo", "executor"],
            },
            {
              texto: "Trabalhar junto e ajudar colegas.",
              perfis: ["colaborador"],
            },
            {
              texto: "Criar algo novo e diferente.",
              perfis: ["idealista"],
            },
            {
              texto: "Ter tempo para pensar e organizar tudo.",
              perfis: ["planejador", "analista"],
            },
          ],
        },
        {
          texto: "Como você lida com prazos apertados?",
          opcoes: [
            {
              texto: "Vou direto ao ponto e cobro resultados.",
              perfis: ["executor", "competitivo"],
            },
            {
              texto: "Peço ajuda e comunico a todos.",
              perfis: ["comunicador", "colaborador"],
            },
            {
              texto: "Organizo as tarefas e sigo o cronograma.",
              perfis: ["planejador"],
            },
            {
              texto: "Fico ansioso e acabo adiando tarefas.",
              perfis: ["procrastinador"],
            },
          ],
        },
        {
          texto: "No trabalho em equipe, você costuma:",
          opcoes: [
            {
              texto: "Assumir a liderança naturalmente.",
              perfis: ["executor"],
            },
            {
              texto: "Animar e integrar o grupo.",
              perfis: ["comunicador"],
            },
            { texto: "Ajudar e apoiar quem precisa.", perfis: ["colaborador"] },
            {
              texto: "Ficar mais na sua, mas entregar com qualidade.",
              perfis: ["analista", "planejador"],
            },
          ],
        },
        {
          texto: "Quando surge um problema inesperado:",
          opcoes: [
            {
              texto: "Tomo a frente e busco solução rápida.",
              perfis: ["executor", "competitivo"],
            },
            {
              texto: "Procuro inovar e pensar fora da caixa.",
              perfis: ["idealista"],
            },
            {
              texto: "Peço opinião do grupo e colaboro.",
              perfis: ["colaborador"],
            },
            {
              texto: "Analiso causas e consequências.",
              perfis: ["analista"],
            },
          ],
        },
        {
          texto: "O que mais te incomoda no trabalho?",
          opcoes: [
            {
              texto: "Falta de ação e demora nas decisões.",
              perfis: ["executor", "competitivo"],
            },
            {
              texto: "Falta de comunicação e integração.",
              perfis: ["comunicador", "colaborador"],
            },
            {
              texto: "Mudanças inesperadas e bagunça.",
              perfis: ["planejador"],
            },
            { texto: "Falta de lógica ou dados claros.", perfis: ["analista"] },
          ],
        },
        {
          texto: "Sobre metas e resultados, você:",
          opcoes: [
            {
              texto: "Quer sempre superar e ser o melhor.",
              perfis: ["competitivo", "executor"],
            },
            {
              texto: "Prefere ajudar o grupo a vencer junto.",
              perfis: ["colaborador"],
            },
            {
              texto: "Busca inovar e fazer diferente.",
              perfis: ["idealista"],
            },
            {
              texto: "Cumpre o que foi planejado, sem surpresas.",
              perfis: ["planejador", "analista"],
            },
          ],
        },
        {
          texto: "Quando precisa convencer alguém, você:",
          opcoes: [
            {
              texto: "Usa argumentos lógicos e dados.",
              perfis: ["analista"],
            },
            {
              texto: "Fala com entusiasmo e carisma.",
              perfis: ["comunicador"],
            },
            {
              texto: "Mostra resultados e exemplos práticos.",
              perfis: ["executor", "competitivo"],
            },
            { texto: "Apela para valores e propósito.", perfis: ["idealista"] },
          ],
        },
        {
          texto: "Se pudesse escolher, você seria:",
          opcoes: [
            { texto: "O líder do time.", perfis: ["executor"] },
            {
              texto: "O que anima e conecta as pessoas.",
              perfis: ["comunicador"],
            },
            {
              texto: "O que organiza e planeja tudo.",
              perfis: ["planejador", "analista"],
            },
            {
              texto: "O que traz ideias novas.",
              perfis: ["idealista"],
            },
          ],
        },
        {
          texto: "Quando está desmotivado, tende a:",
          opcoes: [
            {
              texto: "Buscar novos desafios e competição.",
              perfis: ["competitivo", "executor"],
            },
            {
              texto: "Conversar e buscar apoio do grupo.",
              perfis: ["colaborador", "comunicador"],
            },
            {
              texto: "Procrastinar e adiar tarefas.",
              perfis: ["procrastinador"],
            },
            {
              texto: "Refletir e buscar sentido no que faz.",
              perfis: ["idealista"],
            },
          ],
        },
        // Perguntas extras para maior precisão
        {
          texto: "Você prefere trabalhar sozinho ou em grupo?",
          opcoes: [
            {
              texto: "Prefiro liderar um grupo.",
              perfis: ["executor"],
            },
            {
              texto: "Prefiro colaborar em grupo.",
              perfis: ["colaborador"],
            },
            {
              texto: "Prefiro trabalhar sozinho, focado.",
              perfis: ["analista", "planejador"],
            },
            {
              texto: "Gosto de inovar, independente do formato.",
              perfis: ["idealista"],
            },
          ],
        },
        {
          texto: "Quando precisa entregar um projeto, você:",
          opcoes: [
            {
              texto: "Entrega rápido, mesmo que não esteja perfeito.",
              perfis: ["executor", "competitivo"],
            },
            {
              texto: "Prefere entregar com qualidade, mesmo que demore.",
              perfis: ["analista", "planejador"],
            },
            {
              texto: "Busca inovar e surpreender.",
              perfis: ["idealista"],
            },
            {
              texto: "Gosta de envolver o grupo na entrega.",
              perfis: ["colaborador"],
            },
          ],
        },
        {
          texto: "O que te faz procrastinar?",
          opcoes: [
            {
              texto: "Falta de desafio ou competição.",
              perfis: ["competitivo", "executor"],
            },
            {
              texto: "Falta de propósito ou inovação.",
              perfis: ["idealista"],
            },
            {
              texto: "Falta de organização ou planejamento.",
              perfis: ["planejador", "analista"],
            },
            {
              texto: "Falta de apoio do grupo.",
              perfis: ["colaborador"],
            },
          ],
        },
      ];

      // Inicializa pontuação para cada perfil clássico
      let pontuacoes = {};
      function resetPontuacoes() {
        pontuacoes = {};
        perfisQuiz.forEach((p) => (pontuacoes[p.key] = 0));
      }
      resetPontuacoes();
      let indice = 0;

      const perguntaContainer = document.getElementById("perguntaContainer");
      const btnProximo = document.getElementById("proximoBtn");
      const btnVoltar = document.getElementById("voltarBtn");
      const resultado = document.getElementById("resultado");

      function renderizarPergunta() {
        const p = perguntas[indice];
        perguntaContainer.innerHTML = `
        <h2>${p.texto}</h2>
        <form>
          ${p.opcoes
            .map(
              (op, i) => `
            <label>
              <input type="radio" name="resposta" value="${i}"> ${op.texto}
            </label>
          `
            )
            .join("")}
        </form>`;
        btnVoltar.disabled = indice === 0;
        atualizarBarraProgresso();
      }

      function atualizarBarraProgresso() {
        const total = perguntas.length;
        const atual = indice + 1;
        const percent = Math.round((atual / total) * 100);
        document.getElementById("progressBar").style.width = percent + "%";
        document.getElementById(
          "progressText"
        ).textContent = `Pergunta ${atual} de ${total}`;
      }

      function transicaoPergunta(callback) {
        perguntaContainer.classList.add("fade-out");
        setTimeout(() => {
          callback();
          perguntaContainer.classList.remove("fade-out");
        }, 300);
      }
      function finalizarFormTR() {
        // Calcula o perfil dominante
        const max = Math.max(...Object.values(pontuacoes));
        const perfisDominantes = Object.keys(pontuacoes).filter(
          (k) => pontuacoes[k] === max
        );
        // Se empate, pega o primeiro
        const perfilEscolhido = perfisDominantes[0];
        localStorage.setItem("perfilComportamental", perfilEscolhido);
        // Salva no banco se estiver logado
        fetch("php/salvar_perfil.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "comportamental",
            perfil: perfilEscolhido,
          }),
        })
          .then((r) => r.json())
          .then((resp) => {
            if (resp.success) {
              exibirMensagem("Perfil comportamental salvo com sucesso!", true);
            } else {
              exibirMensagem("Erro ao salvar perfil comportamental.", false);
            }
          })
          .catch(() => {
            exibirMensagem("Erro de conexão ao salvar perfil.", false);
          });
        // Busca dados do perfil
        const perfilObj = perfisQuiz.find((p) => p.key === perfilEscolhido);
        let html = `<div class=\"detalhe-icone\">${
          perfilObj?.icone || "🌟"
        }</div>`;
        // Função para exibir mensagem de feedback visual
        function exibirMensagem(msg, sucesso = true) {
          let el = document.getElementById("mensagemFeedback");
          if (!el) {
            el = document.createElement("div");
            el.id = "mensagemFeedback";
            el.style.position = "fixed";
            el.style.top = "24px";
            el.style.left = "50%";
            el.style.transform = "translateX(-50%)";
            el.style.zIndex = "9999";
            el.style.padding = "1rem 2rem";
            el.style.borderRadius = "1.2rem";
            el.style.fontWeight = "bold";
            el.style.fontSize = "1.1rem";
            el.style.boxShadow = "0 2px 12px #a855f755";
            document.body.appendChild(el);
          }
          el.textContent = msg;
          el.style.background = sucesso ? "#4ade80" : "#ef4444";
          el.style.color = "#fff";
          el.style.display = "block";
          setTimeout(() => {
            el.style.display = "none";
          }, 3000);
        }
        html += `<div style='font-size:1.2rem; color:#6b21a8; font-weight:600;'>Seu perfil comportamental é <span style='color:#a855f7;'>${
          perfilObj?.nome || perfilEscolhido
        }</span></div>`;
        html += `<div class='detalhe-desc' style='margin-top:0.7rem;'>${
          perfilObj?.descricao ||
          "Esse é o aspecto mais desenvolvido do seu perfil!"
        }</div>`;
        // Dicas rápidas para cada perfil
        const dicasPorPerfil = {
          executor: [
            "Busque equilibrar ação com planejamento.",
            "Cuidado com decisões impulsivas.",
          ],
          comunicador: [
            "Aproveite sua rede de contatos.",
            "Ouça mais para influenciar melhor.",
          ],
          planejador: [
            "Seja flexível diante de mudanças.",
            "Não deixe o perfeccionismo travar a ação.",
          ],
          analista: [
            "Confie mais na intuição às vezes.",
            "Compartilhe suas análises com o grupo.",
          ],
          competitivo: [
            "Valorize o trabalho em equipe.",
            "Lembre-se de celebrar pequenas conquistas.",
          ],
          colaborador: [
            "Cuide para não assumir tarefas demais.",
            "Aprenda a dizer não quando necessário.",
          ],
          idealista: [
            "Transforme ideias em ação.",
            "Busque apoio para tirar projetos do papel.",
          ],
          procrastinador: [
            "Divida tarefas grandes em pequenas.",
            "Use prazos e recompensas para se motivar.",
          ],
        };
        if (dicasPorPerfil[perfilEscolhido]) {
          html += `<div style='margin-top:1.2rem; background:#f9f6ff; border-radius:1rem; box-shadow:0 2px 8px #a855f733; padding:1.1rem 1rem;'>
            <b>Dicas para seu perfil:</b>
            <ul style='margin-top:0.5rem;'>${dicasPorPerfil[perfilEscolhido]
              .map((dica) => `<li>💡 ${dica}</li>`)
              .join("")}</ul>
          </div>`;
        }
        resultado.innerHTML = html;
        resultado.classList.remove("hidden");
        resultado.style.display = "block";
        document.getElementById("btnTrilha").classList.remove("hidden");
      }

      btnProximo.addEventListener("click", () => {
        const selecionada = perguntaContainer.querySelector(
          "input[name='resposta']:checked"
        );
        if (!selecionada) {
          alert("Escolha uma opção para continuar.");
          return;
        }
        const p = perguntas[indice];
        const perfis = p.opcoes[parseInt(selecionada.value)].perfis;
        if (Array.isArray(perfis)) {
          perfis.forEach((perfil) => {
            if (pontuacoes[perfil] !== undefined) pontuacoes[perfil] += 1;
          });
        }
        if (++indice < perguntas.length) {
          transicaoPergunta(renderizarPergunta);
        } else {
          document.getElementById("quiz").classList.add("hidden");
          finalizarFormTR();
        }
      });

      btnVoltar.addEventListener("click", () => {
        if (indice > 0) {
          indice--;
          transicaoPergunta(renderizarPergunta);
        }
      });

      renderizarPergunta();

      // Corrige o botão "Ir para a Trilha"
      document
        .getElementById("btnTrilha")
        .addEventListener("click", redirecionarTrilha);

      // Permite refazer o quiz comportamental ao recarregar/refazer
      function resetQuizComportamental() {
        indice = 0;
        resetPontuacoes();
        document.getElementById("quiz").classList.remove("hidden");
        resultado.classList.add("hidden");
        resultado.style.display = "none";
        document.getElementById("btnTrilha").classList.add("hidden");
        renderizarPergunta();
      }
      // Se quiser adicionar um botão de refazer, basta chamar resetQuizComportamental()

      // Script do formulário de perfil profissional e melhorias
      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("perfilProfForm");
        if (!form) return;
        const resultados = document.getElementById("resultadosPerfil");

        // Sugestões de livros e áreas profissionais para cada aspecto
        const dicasPorAspecto = {
          Liderança: {
            livros: [
              '"O Monge e o Executivo" – James C. Hunter',
              '"Liderança: A Inteligência Emocional na Formação do Líder de Sucesso" – Daniel Goleman',
              '"Os 7 Hábitos das Pessoas Altamente Eficazes" – Stephen R. Covey',
            ],
            areas: [
              "Gestão de equipes",
              "Coordenação de projetos",
              "Supervisão administrativa",
              "Empreendedorismo",
            ],
          },
          Criatividade: {
            livros: [
              '"Roube como um Artista" – Austin Kleon',
              '"Criatividade S.A." – Ed Catmull',
              '"O Caminho do Artista" – Julia Cameron',
            ],
            areas: [
              "Design",
              "Publicidade",
              "Inovação",
              "Marketing",
              "Startups",
            ],
          },
          Resiliência: {
            livros: [
              '"Antifrágil" – Nassim Nicholas Taleb',
              '"A Coragem de Ser Imperfeito" – Brené Brown',
              '"Mindset" – Carol S. Dweck',
            ],
            areas: [
              "Psicologia",
              "Recursos Humanos",
              "Saúde",
              "Gestão de crises",
            ],
          },
          Comunicação: {
            livros: [
              '"Como Fazer Amigos e Influenciar Pessoas" – Dale Carnegie',
              '"Comunicação Não-Violenta" – Marshall B. Rosenberg',
              '"Fale Menos, Ouça Mais" – Michael P. Nichols',
            ],
            areas: [
              "Jornalismo",
              "Relações Públicas",
              "Vendas",
              "Educação",
              "Mediação de conflitos",
            ],
          },
          "Tomada de Decisão": {
            livros: [
              '"Rápido e Devagar: Duas Formas de Pensar" – Daniel Kahneman',
              '"O Andar do Bêbado" – Leonard Mlodinow',
              '"O Poder do Hábito" – Charles Duhigg',
            ],
            areas: [
              "Administração",
              "Consultoria",
              "Gestão de projetos",
              "Finanças",
            ],
          },
          Colaboração: {
            livros: [
              '"Trabalho em Equipe" – John C. Maxwell',
              '"O Poder do Hábito" – Charles Duhigg',
              '"A Arte de Fazer Acontecer" – David Allen',
            ],
            areas: [
              "Recursos Humanos",
              "Projetos colaborativos",
              "Educação",
              "Gestão de equipes",
            ],
          },
          Planejamento: {
            livros: [
              '"A Tríade do Tempo" – Christian Barbosa',
              '"Essencialismo" – Greg McKeown',
              '"O Poder do Hábito" – Charles Duhigg',
            ],
            areas: [
              "Gestão de projetos",
              "Administração",
              "Consultoria",
              "Logística",
            ],
          },
          Ética: {
            livros: [
              '"Ética Profissional" – Clóvis de Barros Filho',
              '"Ética e Vergonha na Cara!" – Mário Sérgio Cortella',
              '"O Livro da Filosofia" – Vários autores',
            ],
            areas: [
              "Compliance",
              "Direito",
              "Administração pública",
              "Educação",
            ],
          },
          Aprendizado: {
            livros: [
              '"Aprendendo Inteligência" – Pierluigi Piazzi',
              '"Mindset" – Carol S. Dweck',
              '"O Poder do Hábito" – Charles Duhigg',
            ],
            areas: [
              "Educação",
              "Treinamento e desenvolvimento",
              "Pesquisa",
              "Mentoria",
            ],
          },
          Inovação: {
            livros: [
              '"Organizações Exponenciais" – Salim Ismail',
              '"A Startup Enxuta" – Eric Ries',
              '"Criatividade S.A." – Ed Catmull',
            ],
            areas: [
              "Startups",
              "Tecnologia",
              "Pesquisa e desenvolvimento",
              "Empreendedorismo",
            ],
          },
          Feedback: {
            livros: [
              '"Feedback: O Combustível do Crescimento" – M. Goldsmith',
              '"Comunicação Não-Violenta" – Marshall B. Rosenberg',
              '"O Poder da Empatia" – Roman Krznaric',
            ],
            areas: ["Gestão de pessoas", "Mentoria", "Educação", "Coaching"],
          },
          Organização: {
            livros: [
              '"A Mágica da Arrumação" – Marie Kondo',
              '"Essencialismo" – Greg McKeown',
              '"A Arte de Fazer Acontecer" – David Allen',
            ],
            areas: [
              "Administração",
              "Gestão de projetos",
              "Secretariado",
              "Logística",
            ],
          },
          Responsabilidade: {
            livros: [
              '"O Poder da Responsabilidade" – Paulo Vieira',
              '"Os 7 Hábitos das Pessoas Altamente Eficazes" – Stephen R. Covey',
              '"Mindset" – Carol S. Dweck',
            ],
            areas: ["Gestão", "Administração", "Educação", "Serviço público"],
          },
          "Busca por Feedback": {
            livros: [
              '"Feedback: O Combustível do Crescimento" – M. Goldsmith',
              '"Comunicação Não-Violenta" – Marshall B. Rosenberg',
              '"O Poder da Empatia" – Roman Krznaric',
            ],
            areas: ["Gestão de pessoas", "Mentoria", "Educação", "Coaching"],
          },
          Delegar: {
            livros: [
              '"O Gestor Eficaz" – Peter F. Drucker',
              '"Os 7 Hábitos das Pessoas Altamente Eficazes" – Stephen R. Covey',
              '"Liderança: A Inteligência Emocional na Formação do Líder de Sucesso" – Daniel Goleman',
            ],
            areas: [
              "Gestão de equipes",
              "Administração",
              "Projetos",
              "Empreendedorismo",
            ],
          },
          "Propor Melhorias": {
            livros: [
              '"A Startup Enxuta" – Eric Ries',
              '"Organizações Exponenciais" – Salim Ismail',
              '"Criatividade S.A." – Ed Catmull',
            ],
            areas: [
              "Inovação",
              "Gestão de processos",
              "Startups",
              "Consultoria",
            ],
          },
          Motivação: {
            livros: [
              '"Motivação 3.0" – Daniel H. Pink',
              '"O Poder do Hábito" – Charles Duhigg',
              '"A Coragem de Ser Imperfeito" – Brené Brown',
            ],
            areas: ["Gestão de pessoas", "Psicologia", "Mentoria", "Coaching"],
          },
        };

        function mostrarResultados(porcentagens) {
          resultados.innerHTML =
            '<h3 style="color:#6b21a8; margin-bottom:1rem;">Seus Aspectos Profissionais</h3>';
          // Mostra todos os aspectos
          Object.entries(porcentagens).forEach(([aspecto, valor]) => {
            resultados.innerHTML += `
              <div class="aspecto">
                <span class="aspecto-label">${aspecto}</span>
                <div class="barra-porcentagem">
                  <div class="barra-preenchida" style="width:${valor}%;"></div>
                </div>
                <span class="porcentagem-texto">${valor}%</span>
              </div>
            `;
          });
          // O feedback será adicionado depois, fora desta função
          resultados.innerHTML +=
            '<button class="btn-avaliar" onclick="window.location.reload()">Refazer</button>';
        }

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const dados = new FormData(form);
          const aspectos = {
            Liderança: parseInt(dados.get("lideranca")),
            Criatividade: parseInt(dados.get("criatividade")),
            Resiliência: parseInt(dados.get("resiliencia")),
            Comunicação: parseInt(dados.get("comunicacao")),
            "Tomada de Decisão": parseInt(dados.get("decisao")),
            Colaboração: parseInt(dados.get("colaboracao")),
            Planejamento: parseInt(dados.get("planejamento")),
            Ética: parseInt(dados.get("etica")),
            Aprendizado: parseInt(dados.get("aprendizado")),
            Inovação: parseInt(dados.get("inovacao")),
            Feedback: parseInt(dados.get("feedback")),
            Organização: parseInt(dados.get("organizacao")),
            Responsabilidade: parseInt(dados.get("responsabilidade")),
            "Busca por Feedback": parseInt(dados.get("busca_feedback")),
            Delegar: parseInt(dados.get("delegar")),
            "Propor Melhorias": parseInt(dados.get("melhorias")),
            Motivação: parseInt(dados.get("motivacao")),
          };
          const maximos = {
            Liderança: 4,
            Criatividade: 4,
            Resiliência: 4,
            Comunicação: 4,
            "Tomada de Decisão": 4,
            Colaboração: 4,
            Planejamento: 4,
            Ética: 4,
            Aprendizado: 4,
            Inovação: 4,
            Feedback: 4,
            Organização: 4,
            Responsabilidade: 4,
            "Busca por Feedback": 4,
            Delegar: 4,
            "Propor Melhorias": 4,
            Motivação: 4,
          };
          const porcentagens = {};
          Object.keys(aspectos).forEach((key) => {
            porcentagens[key] = Math.round(
              (aspectos[key] / maximos[key]) * 100
            );
          });
          // ...
          mostrarResultados(porcentagens);
          // Sugestão de melhoria e dicas para o aspecto mais baixo
          const menor = Object.entries(porcentagens).sort(
            (a, b) => a[1] - b[1]
          )[0];
          let sugestao = `<div style='margin-top:1.5rem;'><strong>Sugestão de melhoria:</strong> Foque em desenvolver mais seu aspecto de <span style='color:#a855f7;'>${menor[0]}</span>!</div>`;
          if (dicasPorAspecto[menor[0]]) {
            const dicas = dicasPorAspecto[menor[0]];
            sugestao += `
              <div style="background:#f9f6ff; border-radius:1rem; box-shadow:0 2px 8px #a855f733; padding:1.2rem 1rem; margin-top:1.2rem;">
                <b>Livros recomendados para ${menor[0]}:</b>
                <ul style="margin-bottom:0.7rem;">
                  ${dicas.livros.map((l) => `<li>📚 ${l}</li>`).join("")}
                </ul>
                <b>Áreas profissionais indicadas:</b>
                <ul>
                  ${dicas.areas.map((a) => `<li>💼 ${a}</li>`).join("")}
                </ul>
              </div>
            `;
          }
          // Agrupa todos que precisam melhorar (até 49%)
          // (NÃO redeclare variáveis já usadas acima!)
          var feedback = "";
          var prioridade = Object.entries(porcentagens).filter(
            ([_, v]) => v <= 25
          );
          var precisaMelhorar = Object.entries(porcentagens).filter(
            ([_, v]) => v > 25 && v < 50
          );
          var entre50e75 = Object.entries(porcentagens).filter(
            ([_, v]) => v >= 50 && v < 75
          );
          // Mostra todos que precisam melhorar (até 49%)
          if (prioridade.length + precisaMelhorar.length > 0) {
            feedback += `<div style='margin-top:1.5rem;'><strong>Você precisa melhorar nos seguintes aspectos (49% ou menos):</strong><ul>`;
            prioridade.forEach(([k]) => {
              feedback += `<li style='color:#ef4444;'>${k} <span style='font-size:0.95em;'>(prioridade)</span></li>`;
            });
            precisaMelhorar.forEach(([k]) => {
              feedback += `<li style='color:#a855f7;'>${k}</li>`;
            });
            feedback += "</ul></div>";
          }
          // Sempre mostra a lista de aspectos entre 50% e 75%, se houver
          if (entre50e75.length > 0) {
            feedback += `<div style='margin-top:1.5rem;'><strong>Aspectos entre 50% e 75%: estão bons, mas podem melhorar ainda mais:</strong><ul>`;
            entre50e75.forEach(([k]) => {
              feedback += `<li style='color:#22c55e;'>${k}</li>`;
            });
            feedback += "</ul></div>";
          }
          resultados.innerHTML += sugestao + feedback;
          // Salva perfil profissional no banco se estiver logado
          fetch("php/salvar_perfil.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tipo: "profissional", aspectos }),
          })
            .then((r) => r.json())
            .then((resp) => {
              if (resp.success) {
                exibirMensagem("Perfil profissional salvo com sucesso!", true);
              } else {
                exibirMensagem("Erro ao salvar perfil profissional.", false);
              }
            })
            .catch(() => {
              exibirMensagem("Erro de conexão ao salvar perfil.", false);
            });
          form.style.display = "none";
          resultados.style.display = "block";
        });
      });