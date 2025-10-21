// trilhaCarreira.js - VERSÃO FINAL E CORRIGIDA

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-questionario');
    const geradorForm = document.getElementById('gerador-form');
    const loading = document.getElementById('loading');
    const dashboard = document.getElementById('dashboard');
    const analiseContainer = document.getElementById('analise-container');
    const trilhaContainer = document.getElementById('trilha-container');
    const sidebarContent = document.getElementById('sidebar-content');
    const btnExcluir = document.getElementById('btn-excluir');
    const API_URL = 'http://localhost:5001/gerar_trilha';
    let state = { trilhaId: null, entregaveis: {} };

    async function handleFetchResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const message = errorData?.message || errorData?.erro || `Erro HTTP: ${response.status}`;
            throw new Error(message);
        }
        return response.json();
    }

    const atualizarStatusDasEtapas = () => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        document.querySelectorAll('.timeline-item').forEach(item => {
            const isConcluida = item.classList.contains('concluida');
            item.classList.remove('pendente', 'proximo');
            if (isConcluida) return;
            const dataEntregaDefinida = item.dataset.dataEntrega;
            if (dataEntregaDefinida && dataEntregaDefinida.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const dataEntrega = new Date(dataEntregaDefinida + 'T00:00:00');
                const diffTempo = dataEntrega.getTime() - hoje.getTime();
                const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
                if (diffDias < 0) item.classList.add('pendente');
                else if (diffDias <= 3) item.classList.add('proximo');
            }
        });
    };

    const salvarTrilhaNoDB = async (area, analiseHtml, trilhaHtml) => {
        const response = await fetch('php/salvar_trilha_ia.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ area_carreira: area, analise_conselheira: analiseHtml, trilha_html: trilhaHtml }) });
        const data = await handleFetchResponse(response);
        localStorage.setItem('trilhaId', data.trilha_id);
        state.trilhaId = data.trilha_id;
    };

    const carregarTrilhaExistente = async () => {
        state.trilhaId = localStorage.getItem('trilhaId');
        if (!state.trilhaId) { geradorForm.classList.remove('hidden'); return; }
        loading.classList.remove('hidden');
        geradorForm.classList.add('hidden');
        try {
            const response = await fetch('php/get_trilha_ia.php');
            const data = await handleFetchResponse(response);
            if (data.success && data.trilha) {
                state.entregaveis = data.entregaveis || {};
                renderizarDashboard(data.trilha);
            } else {
                limparDadosLocais();
                geradorForm.classList.remove('hidden');
            }
        } catch (error) {
            console.error("Erro ao carregar trilha:", error);
            alert(`Não foi possível carregar sua trilha: ${error.message}.`);
            limparDadosLocais();
            geradorForm.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    };

    const renderizarDashboard = (trilha) => {
        analiseContainer.innerHTML = trilha.analise_conselheira;
        trilhaContainer.innerHTML = `<div class="timeline">${trilha.trilha_html}</div>`;
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (localStorage.getItem(`etapa-${item.dataset.id}`) === 'concluida') {
                item.classList.add('concluida');
            }
        });
        geradorForm.classList.add('hidden');
        dashboard.classList.remove('hidden');
        atualizarSidebar();
        atualizarStatusDasEtapas();
    };

    const atualizarSidebar = (etapaElement = null) => {
        document.querySelectorAll('.timeline-item.active').forEach(item => item.classList.remove('active'));
        const totalEtapas = document.querySelectorAll('.timeline-item').length;
        const etapasConcluidas = document.querySelectorAll('.timeline-item.concluida').length;
        const progresso = totalEtapas > 0 ? (etapasConcluidas / totalEtapas) * 100 : 0;
        let sidebarHtml = `<div class="sidebar-card"><h3 class="text-xl font-bold text-white mb-4">Seu Progresso</h3><div class="progress-bar-container"><div class="progress-bar" style="width: ${progresso}%;"></div></div><p class="text-gray-400 text-sm mt-2">${etapasConcluidas} de ${totalEtapas} etapas concluídas.</p></div>`;
        if (etapaElement) {
            etapaElement.classList.add('active');
            const { id, titulo, descricao, prazo, dataEntrega } = etapaElement.dataset;
            const atividadesHtml = etapaElement.querySelector('.atividades-hidden').innerHTML;
            const isConcluida = etapaElement.classList.contains('concluida');
            const entregavel = state.entregaveis[id];
            let entregavelHtml = `<h4>Entregável</h4><p class="text-sm text-gray-400">Envie um PDF para validar a etapa.</p><input type="file" id="upload-entregavel" class="mt-2" accept=".pdf" style="opacity:0.5; width: 100%;"><button data-id="${id}" class="btn btn-upload w-full mt-2">Enviar</button><div id="upload-status" class="text-sm mt-2 text-center"></div>`;
            if (entregavel) { entregavelHtml = `<h4>Entregável Enviado</h4><a href="${entregavel.caminho_arquivo}" target="_blank" class="text-purple-400 hover:underline break-all">${entregavel.nome_original}</a>`; }
            let dataFormatada = "Data não definida";
            if (dataEntrega && dataEntrega.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const dataObj = new Date(dataEntrega + 'T00:00:00');
                dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
            }
            sidebarHtml += `<div class="sidebar-card mt-6"><h3 class="text-xl font-bold text-white">${titulo}</h3><p class="text-gray-300 mt-2">${descricao}</p><h4>Atividades Sugeridas</h4>${atividadesHtml}<h4>Prazo Estimado</h4><p class="text-gray-300">${prazo}</p><h4 class="text-sm text-gray-400 mt-4">Data de Entrega Definida:</h4><p class="font-bold text-lg text-white">${dataFormatada}</p><div class="entregavel-area">${entregavelHtml}</div><button data-id="${id}" class="btn btn-concluir ${isConcluida ? 'concluida' : ''}">${isConcluida ? '✓ Concluída' : 'Marcar como Concluída'}</button></div>`;
        } else {
            sidebarHtml += `<div class="sidebar-card mt-6"><p class="text-center text-gray-400">Clique em uma etapa para ver os detalhes.</p></div>`;
        }
        sidebarContent.innerHTML = sidebarHtml;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        limparDadosLocais();
        const dados = Object.fromEntries(new FormData(form).entries());
        loading.classList.remove('hidden');
        geradorForm.classList.add('hidden');
        try {
            const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) });
            const data = await handleFetchResponse(response);
            await salvarTrilhaNoDB(dados.area, data.analise_conselheira, data.trilha_html);
            await carregarTrilhaExistente();
        } catch (error) {
            alert(`Erro ao gerar trilha: ${error.message}`);
            geradorForm.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    };

    const handleDashboardClick = async (e) => {
        const timelineItem = e.target.closest('.timeline-item');
        if (timelineItem) atualizarSidebar(timelineItem);
        if (e.target.matches('.btn-concluir')) {
            const { id } = e.target.dataset;
            const item = document.querySelector(`.timeline-item[data-id="${id}"]`);
            item.classList.toggle('concluida');
            if (item.classList.contains('concluida')) { localStorage.setItem(`etapa-${id}`, 'concluida'); } 
            else { localStorage.removeItem(`etapa-${id}`); }
            atualizarSidebar(item);
            atualizarStatusDasEtapas();
        }
        if (e.target.matches('.btn-upload')) {
            const { id } = e.target.dataset;
            const fileInput = document.getElementById('upload-entregavel');
            const statusDiv = document.getElementById('upload-status');
            if (!fileInput.files.length) { statusDiv.textContent = 'Por favor, selecione um arquivo.'; return; }
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('pdfFile', file);
            formData.append('etapa_id', id);
            formData.append('trilha_id', state.trilhaId);
            statusDiv.textContent = 'Enviando...';
            try {
                const response = await fetch('php/upload_entregavel.php', { method: 'POST', body: formData });
                const data = await handleFetchResponse(response);
                statusDiv.textContent = 'Enviado com sucesso!';
                state.entregaveis[id] = data.entregavel;
                atualizarSidebar(document.querySelector(`.timeline-item[data-id="${id}"]`));
            } catch (error) { 
                statusDiv.textContent = `Erro: ${error.message}`; 
            }
        }
    };
    
    const limparDadosLocais = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('etapa-') || key === 'trilhaId') {
                localStorage.removeItem(key);
            }
        });
        state.trilhaId = null;
    };

    const handleExcluir = async () => {
        if (confirm('Tem certeza que deseja apagar esta trilha e todos os seus entregáveis? Esta ação não pode ser desfeita.')) {
            try {
                const response = await fetch('php/excluir_trilha_ia.php', { method: 'POST' });
                const data = await handleFetchResponse(response);
                limparDadosLocais();
                alert('Trilha excluída com sucesso!');
                location.reload();
            } catch (error) {
                alert(`Erro ao excluir trilha: ${error.message}`);
            }
        }
    };

    form.addEventListener('submit', handleFormSubmit);
    dashboard.addEventListener('click', handleDashboardClick);
    btnExcluir.addEventListener('click', handleExcluir);

    carregarTrilhaExistente();
});