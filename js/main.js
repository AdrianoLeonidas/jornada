// main.js

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const achievementsContainer = document.getElementById('achievements');
    const profileForm = document.getElementById('profile-form');
    let currentLevel = 0;
    let achievements = [];

    function updateProgressBar() {
        const progressPercentage = (currentLevel / totalLevels) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function addAchievement(achievement) {
        achievements.push(achievement);
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.textContent = achievement;
        achievementsContainer.appendChild(achievementElement);
    }

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(profileForm);
        const userProfile = Object.fromEntries(formData.entries());

        // Logic to determine the user's progression based on their profile
        // For example, increase level based on specific criteria
        if (userProfile.experience > 5) {
            currentLevel++;
            addAchievement('Experienced Professional');
        }

        updateProgressBar();
        profileForm.reset();
    });

    const totalLevels = 10; // Example total levels
    updateProgressBar();
});

function login() {
    const name = document.getElementById('username').value;
    const perfil = document.getElementById('perfil').value;
    if (!name || !perfil) {
        alert('Preencha seu nome e perfil!');
        return;
    }
    localStorage.setItem('pdi_user', JSON.stringify({ name, perfil }));
    document.getElementById('login').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    renderUser();
    renderPaths();
}

function renderUser() {
    const user = JSON.parse(localStorage.getItem('pdi_user'));
    if (user) {
        document.querySelector('.profile-info h2').textContent = `Olá, ${user.name}!`;
    }
}

function renderPaths() {
    const user = JSON.parse(localStorage.getItem('pdi_user'));
    const pathList = document.querySelector('.path-list');
    pathList.innerHTML = '';
    const etapasTotal = 5; // Exemplo: 5 etapas por trilha
    // Exemplo de trilhas por perfil
    const paths = {
        relacao: [
            { icon: '🤝', title: 'Comunicação', etapas: ['Ouvir ativamente', 'Dar feedback', 'Expressar ideias', 'Resolver conflitos', 'Networking'] },
            { icon: '💬', title: 'Empatia', etapas: ['Se colocar no lugar', 'Praticar escuta', 'Reconhecer emoções', 'Apoiar colegas', 'Ser paciente'] }
        ],
        lideranca: [
            { icon: '💼', title: 'Liderança', etapas: ['Delegar tarefas', 'Inspirar equipe', 'Tomar decisões', 'Dar exemplo', 'Gerenciar tempo'] },
            { icon: '🧭', title: 'Tomada de Decisão', etapas: ['Analisar dados', 'Ouvir opiniões', 'Avaliar riscos', 'Escolher caminhos', 'Revisar resultados'] }
        ],
        tecnologia: [
            { icon: '💻', title: 'Tecnologia', etapas: ['Aprender nova linguagem', 'Fazer projeto', 'Ler documentação', 'Testar código', 'Automatizar tarefa'] },
            { icon: '🔒', title: 'Segurança', etapas: ['Usar senhas fortes', 'Atualizar sistemas', 'Fazer backup', 'Evitar phishing', 'Proteger dados'] }
        ]
    };
    const userProgress = JSON.parse(localStorage.getItem('pdi_progress')) || {};
    (paths[user.perfil] || []).forEach((path, idx) => {
        // Conta etapas concluídas
        const checked = (userProgress[user.perfil]?.[idx] || []).filter(Boolean).length;
        const progress = Math.round((checked / etapasTotal) * 100);
        pathList.innerHTML += `
        <div class="path-card" data-path="${idx}">
            <div class="path-header">
                <span class="path-icon">${path.icon}</span>
                <span class="path-title">${path.title}</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
            <div class="progress-info">${checked}/${etapasTotal} etapas</div>
        </div>
        `;
    });

    // Evento para abrir painel de etapas
    document.querySelectorAll('.path-card').forEach(card => {
        card.onclick = function() {
            const idx = this.getAttribute('data-path');
            openEtapasPanel(user.perfil, idx, paths[user.perfil][idx].title, paths[user.perfil][idx].etapas);
        };
    });
}

// Painel/modal de etapas
function openEtapasPanel(perfil, idx, titulo, etapas) {
    // Remove painel antigo se existir
    let oldPanel = document.getElementById('etapas-panel');
    if (oldPanel) oldPanel.remove();

    const userProgress = JSON.parse(localStorage.getItem('pdi_progress')) || {};
    const checkedArr = userProgress[perfil]?.[idx] || [];

    // Cria painel
    const panel = document.createElement('div');
    panel.id = 'etapas-panel';
    panel.innerHTML = `
        <div class="etapas-modal-bg"></div>
        <div class="etapas-modal">
            <h3>${titulo}</h3>
            <ul>
                ${etapas.map((etapa, i) => `
                    <li>
                        <label>
                            <input type="checkbox" data-idx="${i}" ${checkedArr[i] ? 'checked' : ''}>
                            ${etapa}
                        </label>
                    </li>
                `).join('')}
            </ul>
            <button class="close-etapas">Fechar</button>
        </div>
    `;
    document.body.appendChild(panel);

    // Evento de fechar
    panel.querySelector('.close-etapas').onclick = () => panel.remove();
    panel.querySelector('.etapas-modal-bg').onclick = () => panel.remove();

    // Evento de marcar etapas
    panel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.onchange = function() {
            const etapaIdx = Number(this.getAttribute('data-idx'));
            let userProgress = JSON.parse(localStorage.getItem('pdi_progress')) || {};
            userProgress[perfil] = userProgress[perfil] || [];
            userProgress[perfil][idx] = userProgress[perfil][idx] || [];
            userProgress[perfil][idx][etapaIdx] = this.checked;
            localStorage.setItem('pdi_progress', JSON.stringify(userProgress));
            renderPaths();
        };
    });
}

// Supondo que cada módulo tem um array de etapas
const modulos = [
  { nome: "Módulo 1", etapas: 3, conquista: "🏆" },
  { nome: "Módulo 2", etapas: 4, conquista: "🚀" },
  // ...
];

// Progresso do usuário (exemplo: etapas concluídas por módulo)
let progressoUsuario = {
  0: 0, // Módulo 0: 0 etapas concluídas
  1: 0, // Módulo 1: 0 etapas concluídas
  // ...
};

// Função chamada ao concluir uma etapa
function concluirEtapa(moduloIndex) {
  progressoUsuario[moduloIndex]++;
  verificarConquista(moduloIndex);
}

// Verifica se o usuário completou todas as etapas do módulo
function verificarConquista(moduloIndex) {
  if (progressoUsuario[moduloIndex] === modulos[moduloIndex].etapas) {
    liberarConquista(modulos[moduloIndex].conquista);
  }
}

// Libera a conquista visualmente
function liberarConquista(conquista) {
  const badges = document.querySelector('.badges');
  const badgeCard = document.createElement('div');
  badgeCard.className = 'badge-card';
  badgeCard.textContent = conquista;
  badges.appendChild(badgeCard);
  alert("Parabéns! Você concluiu o módulo e ganhou uma conquista!");
}

// Ao carregar a página, verifica se já está logado
window.onload = function() {
    const user = JSON.parse(localStorage.getItem('pdi_user'));
    if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        renderUser();
        renderPaths();
    }
};