# app.py - VERSÃO FINAL (COM PROMPT GENÉRICO E REFORÇADO)

from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import traceback
import re
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/gerar_trilha": {"origins": "*"}})

# --- FUNÇÃO HELPER DE DATA (ROBUSTA) ---
def calcular_data_futura(prazo_texto):
    hoje = datetime.now()
    prazo_texto = prazo_texto.lower()
    numero_match = re.search(r'\d+', prazo_texto)
    numero = int(numero_match.group(0)) if numero_match else 1
    if 'semana' in prazo_texto: delta = timedelta(weeks=numero)
    elif 'dia' in prazo_texto: delta = timedelta(days=numero)
    elif 'mês' in prazo_texto or 'mes' in prazo_texto: delta = timedelta(days=numero * 30)
    else: delta = timedelta(weeks=2)
    return (hoje + delta).strftime('%Y-%m-%d')

# --- PARSER DE HTML (ROBUSTO) ---
def parse_ai_response_to_html_robust(ai_text):
    try:
        etapa_headers = re.findall(r'ETAPA\s+(\d+)\s*:(.*)', ai_text, flags=re.IGNORECASE)
        etapa_blocos = re.split(r'ETAPA\s+\d+\s*:', ai_text, flags=re.IGNORECASE)[1:]
        if not etapa_blocos: return ""
        html = ""
        for i, bloco in enumerate(etapa_blocos):
            numero_etapa = etapa_headers[i][0].strip()
            titulo_clean = etapa_headers[i][1].strip().replace('"', '&quot;')
            descricao_match = re.search(r'DESCRIÇÃO:\s*(.*?)(?=\n\s*(?:ATIVIDADES SUGERIDAS:|PRAZO ESTIMADO:)|$)', bloco, re.DOTALL | re.IGNORECASE)
            atividades_match = re.search(r'ATIVIDADES SUGERIDAS:\s*(.*?)(?=\n\s*PRAZO ESTIMADO:|$)', bloco, re.DOTALL | re.IGNORECASE)
            prazo_match = re.search(r'PRAZO ESTIMADO:\s*(.*)', bloco, re.DOTALL | re.IGNORECASE)
            descricao_clean = descricao_match.group(1).strip().replace('"', '&quot;') if descricao_match else "Descrição não especificada."
            prazo_clean = prazo_match.group(1).strip().replace('"', '&quot;') if prazo_match else "2 semanas"
            data_de_entrega_calculada = calcular_data_futura(prazo_clean)
            atividades_html = "<ul>"
            if atividades_match:
                for linha in atividades_match.group(1).strip().split('\n'):
                    if atividade_limpa := linha.strip().lstrip('-* ').strip():
                        atividades_html += f"<li>{atividade_limpa}</li>"
            atividades_html += "</ul>"
            html += f"""<div class="timeline-item" data-id="{numero_etapa}" data-titulo="{titulo_clean}" data-descricao="{descricao_clean}" data-prazo="{prazo_clean}" data-data-entrega="{data_de_entrega_calculada}"><div class="timeline-item-content"><span class="tag">Etapa {numero_etapa}</span><h4 class="mt-2 font-bold text-lg">{titulo_clean}</h4><p class="text-sm text-gray-400 mt-1 prazo-display"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clip-rule="evenodd" /></svg>{prazo_clean}</p><div class="atividades-hidden" style="display: none;">{atividades_html}</div></div></div>"""
        return html
    except Exception as e:
        print(f"ERRO CRÍTICO DURANTE O PARSING HTML: {e}")
        traceback.print_exc()
        return ""

@app.route('/gerar_trilha', methods=['POST', 'OPTIONS'])
def gerar_trilha():
    if request.method == 'OPTIONS': return '', 204
    try:
        dados = request.get_json()
        if not dados: return jsonify({"erro": "Nenhum dado recebido."}), 400

        # <<< PROMPT OBRA-PRIMA: O CORAÇÃO DA CORREÇÃO >>>
        # Esta versão usa um EXEMPLO GENÉRICO para evitar o viés de "Marketing"
        # e reforça a regra de 5+ etapas.
        prompt_final = f"""
**PERSONA E OBJETIVO:**
Você é a Conselheira IA, uma mentora de carreira de elite, conhecida por criar os planos de desenvolvimento mais detalhados, práticos e inspiradores do mercado. Sua reputação depende da profundidade e qualidade das suas respostas. Você nunca entrega um trabalho superficial.

**ESTRUTURA OBRIGATÓRIA (SIGA RIGOROSAMENTE):**
A sua resposta DEVE conter os separadores `###ANALISE###` e `###TRILHA###`.

**EXEMPLO DE RESPOSTA DE ALTA QUALIDADE (USE COMO MODELO):**

###ANALISE###
Olá! Analisei cuidadosamente seu perfil. Sua paixão pela área de [Área de Interesse do Exemplo, ex: Gastronomia] é evidente e, combinada com sua experiência em [Habilidade Complementar, ex: Gestão Financeira], cria uma base poderosa para o sucesso.

**PONTOS FORTES:** Sua habilidade em [Habilidade Complementar] é um diferencial competitivo. Em um mercado saturado, a capacidade de [Ação de Valor, ex: controlar custos e precificar pratos] sem depender de terceiros coloca você à frente.

**PONTOS DE ATENÇÃO:** Seu conhecimento em [Ferramenta Específica da Área, ex: Software de Gestão de Cozinha] e estratégias de [Habilidade Técnica Chave, ex: Marketing Gastronômico] ainda é iniciante. Para se tornar um especialista, é crucial medir, analisar e otimizar seus resultados.

**RECOMENDAÇÃO ESTRATÉGICA:** Nossa estratégia será construir uma "ponte" sólida entre sua genialidade criativa e a proficiência analítica. Vamos transformar você em um profissional completo: profundo em [Habilidade Principal] e com vasto conhecimento em áreas complementares como [Técnica 1], [Técnica 2] e [Técnica 3].

###TRILHA### (exemplo do formato de trilha e etapas)
ETAPA 1: Imersão em [Fundamento Essencial 1]
DESCRIÇÃO: O objetivo desta etapa é construir sua confiança na [Habilidade Fundamental, ex: Culinária Clássica Francesa]. Você deixará de apenas "achar" para ter "certeza" do que funciona.
ATIVIDADES SUGERIDAS:
- Concluir o curso "Introdução à [Fundamento 1]" no Coursera/Udemy.
- Criar um [Projeto Prático Simples, ex: menu degustação de 3 pratos] e aplicar os conceitos.
- Ler os 3 primeiros capítulos do livro "[Livro de Referência da Área]".
PRAZO ESTIMADO: 3 semanas

ETAPA 2: Dominando a [Habilidade Técnica Chave]
DESCRIÇÃO: Vamos aplicar o conhecimento analítico para [Objetivo Prático, ex: otimizar seu cardápio] e atrair [Público Alvo, ex: clientes].
ATIVIDADES SUGERIDAS:
- Escrever e publicar 2 [Peças de Conteúdo, ex: receitas no seu blog] aplicando técnicas de [Habilidade Técnica Chave].
- Otimizar [Aspectos Técnicos, ex: fotos, descrições e custos] dos seus pratos.
- Instalar e configurar o [Ferramenta de Análise, ex: software de gestão] para acompanhar métricas.
PRAZO ESTIMADO: 6 semanas

ETAPA 3: Iniciação à [Prática Profissional 1]
DESCRIÇÃO: Agora que você entende o básico, vamos aprender a acelerar resultados com [Ação Profissional, ex: parcerias estratégicas].
ATIVIDADES SUGERIDAS:
- Concluir o curso de "[Tópico Avançado]" da [Plataforma de Ensino].
- Criar uma campanha simulada [Ação Prática, ex: de evento local] com um orçamento mínimo.
- Analisar as métricas da campanha após 5 dias: [Métrica 1], [Métrica 2] e [Métrica 3].
PRAZO ESTIMADO: 9 semanas.

(faça assim por diante, com mais etapas detalhadas...)

**SUA TAREFA:**
Agora, com base nos dados do usuário abaixo, gere uma resposta **NO MESMO NÍVEL DE DETALHE E QUALIDADE** do exemplo acima. Seja profundo na análise e prático na trilha.
É **OBRIGATÓRIO** gerar no mínimo **5 (CINCO)** etapas detalhadas. Não gere 3 ou 4. Gere 5 ou mais.
**Use o "Estilo de Aprendizagem" para sugerir ATIVIDADES (vídeos, livros, projetos) e a "Ambição de Carreira" para definir o tom da análise estratégica.**

**DADOS DO USUÁRIO ATUAL:**
- Área de Interesse: {dados.get('area', 'Não informado')}
- Nível Atual: {dados.get('nivel', 'Não informado')}
- Habilidades Atuais: {dados.get('habilidades', 'Não informado')}
- Objetivo Principal: {dados.get('objetivo', 'Não informado')}
- Estilo de Aprendizagem Preferido: {dados.get('estilo_aprendizagem', 'Não informado')}
- Ambição de Carreira (5 anos): {dados.get('ambicao_carreira', 'Não informado')}
"""

        try:
            response = ollama.chat(model='llama3:8b', messages=[{'role': 'user', 'content': prompt_final}], options={"temperature": 0.7})
            ai_text = response['message']['content']
        except Exception as e:
            print(f"ERRO CRÍTICO: Falha ao comunicar com o Ollama. Detalhes: {e}")
            return jsonify({"erro": "Não foi possível conectar ao serviço de IA. Verifique se o Ollama está em execução."}), 503

        # Lógica de separação flexível (já estava correta, mas mantemos)
        partes = re.split(r'\W*TRILHA\W*', ai_text, maxsplit=1, flags=re.IGNORECASE)

        if len(partes) < 2:
            print("ERRO DE FORMATAÇÃO DA IA: O separador 'TRILHA' não foi encontrado.")
            print(f"--- RESPOSTA RECEBIDA ---\n{ai_text}\n-------------------------")
            return jsonify({"erro": "A IA retornou uma resposta em um formato inválido. Tente novamente."}), 500

        analise_texto_bruto = partes[0]
        trilha_texto = partes[1].strip()
        
        analise_texto = re.sub(r'\W*ANALISE\W*', '', analise_texto_bruto, count=1, flags=re.IGNORECASE).strip()
        
        analise_html = f"<h3>Análise do seu Perfil</h3><p>{analise_texto.replace('**', '<strong>').replace('PONTOS FORTES:', '<strong>PONTOS FORTES:</strong>').replace('PONTOS DE ATENÇÃO:', '<br><br><strong>PONTOS DE ATENÇÃO:</strong>').replace('RECOMENDAÇÃO ESTRATÉGICA:', '<br><br><strong>RECOMENDAÇÃO ESTRATÉGICA:</strong>')}</p>"
        trilha_html = parse_ai_response_to_html_robust(trilha_texto)

        if not trilha_html: return jsonify({"erro": "A IA gerou uma trilha em formato inesperado."}), 500
        
        return jsonify({"analise_conselheira": analise_html, "trilha_html": trilha_html})

    except Exception as e:
        print("Erro detalhado no backend:", traceback.format_exc())
        return jsonify({"erro": f"Um erro inesperado ocorreu no servidor: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
