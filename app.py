# app.py - VERSÃO FINAL (COM PROMPT OBRA-PRIMA PARA RESPOSTAS RICAS)

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
        prompt_final = f"""
**PERSONA E OBJETIVO:**
Você é a Conselheira IA, uma mentora de carreira de elite, conhecida por criar os planos de desenvolvimento mais detalhados, práticos e inspiradores do mercado. Sua reputação depende da profundidade e qualidade das suas respostas. Você nunca entrega um trabalho superficial.

**ESTRUTURA OBRIGATÓRIA (SIGA RIGOROSAMENTE):**
A sua resposta DEVE conter os separadores `###ANALISE###` e `###TRILHA###`.

**EXEMPLO DE RESPOSTA DE ALTA QUALIDADE (USE COMO MODELO):**

###ANALISE###
Olá! Analisei cuidadosamente seu perfil e estou impressionada com sua jornada até aqui. Sua paixão pela área de Marketing Digital é evidente e, combinada com sua experiência em design gráfico, cria uma base extremamente poderosa para o sucesso. Vamos estruturar seu potencial.

**PONTOS FORTES:** Sua habilidade em design gráfico é um diferencial competitivo imenso. Em um mundo digital saturado, a capacidade de criar visuais atraentes e comunicar mensagens de forma eficaz sem depender de terceiros coloca você muito à frente. Sua ambição de se tornar um especialista renomado é o combustível que precisamos.

**PONTOS DE ATENÇÃO:** Seu conhecimento em ferramentas de análise de dados (como Google Analytics) e estratégias de SEO ainda é iniciante. Para se tornar um especialista completo, é crucial que você consiga não apenas criar campanhas, mas também medir, analisar e otimizar seus resultados com base em dados concretos.

**RECOMENDAÇÃO ESTRATÉGICA:** Nossa estratégia será construir uma "ponte" sólida entre sua genialidade criativa e a proficiência analítica. Vamos transformar você em um profissional "T-shaped": profundo em design (sua vertical) e com vasto conhecimento em áreas complementares como SEO, dados e gestão de tráfego (sua horizontal). Isso o tornará um ativo indispensável para qualquer equipe.

###TRILHA###
ETAPA 1: Imersão em Fundamentos Analíticos
DESCRIÇÃO: O objetivo desta etapa é construir sua confiança na leitura e interpretação de dados. Você deixará de apenas "achar" para ter "certeza" do que funciona.
ATIVIDADES SUGERIDAS:
- Concluir o curso gratuito "Google Analytics para Iniciantes" na Google Skillshop.
- Criar um blog pessoal simples (no WordPress ou Medium) e instalar o Google Analytics para acompanhar métricas reais.
- Ler os 3 primeiros capítulos do livro "Marketing 4.0" de Philip Kotler.
PRAZO ESTIMADO: 3 semanas

ETAPA 2: Dominando o SEO On-Page
DESCRIÇÃO: Vamos aplicar o conhecimento analítico para otimizar conteúdo e atrair tráfego orgânico, a habilidade mais valiosa do marketing digital.
ATIVIDADES SUGERIDAS:
- Escrever e publicar 2 artigos no seu blog aplicando técnicas de pesquisa de palavras-chave (use Ubersuggest ou a versão gratuita do SEMrush).
- Otimizar títulos, meta descriptions, e a estrutura de cabeçalhos (H1, H2) dos seus artigos.
- Instalar e configurar o plugin Yoast SEO no seu blog e garantir que seus artigos fiquem com a avaliação "verde".
PRAZO ESTIMADO: 2 semanas

ETAPA 3: Iniciação ao Tráfego Pago
DESCRIÇÃO: Agora que você entende o tráfego orgânico, vamos aprender a acelerar resultados com investimentos inteligentes em anúncios.
ATIVIDADES SUGERIDAS:
- Concluir o curso de "Facebook e Instagram Ads" da Meta Blueprint.
- Criar uma campanha simulada no Gerenciador de Anúncios do Facebook com um orçamento diário mínimo, focada em gerar tráfego para um dos seus artigos.
- Analisar as métricas da campanha após 5 dias: CPC (Custo por Clique), CTR (Taxa de Cliques) e Alcance.
PRAZO ESTIMADO: 2 semanas

(E assim por diante, com mais 2 a 4 etapas detalhadas...)

**SUA TAREFA:**
Agora, com base nos dados do usuário abaixo, gere uma resposta **NO MESMO NÍVEL DE DETALHE E QUALIDADE** do exemplo acima. Seja profundo na análise e prático na trilha. É **OBRIGATÓRIO** gerar no mínimo 5 etapas detalhadas.

**DADOS DO USUÁRIO ATUAL:**
- Área de Interesse: {dados.get('area', 'Não informado')}
- Nível Atual: {dados.get('nivel', 'Não informado')}
- Habilidades Atuais: {dados.get('habilidades', 'Não informado')}
- Objetivo Principal: {dados.get('objetivo', 'Não informado')}
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