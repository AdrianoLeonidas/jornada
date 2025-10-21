document.addEventListener("DOMContentLoaded", function() {
  // --- VERIFICAÇÃO DE LOGIN ---
  const logado = localStorage.getItem("logado");
  if (logado !== "true") {
    localStorage.setItem("destinoPendente", "curriculo.html");
    window.location.href = "login.html";
    return;
  }

  // --- BOTÃO DE LOGOUT ---
  document.getElementById("btnLogout").addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "login.html";
  });

  // --- CARREGAMENTO DE DADOS INICIAIS ---
  carregarDadosUsuario();
  carregarSoftSkills();

  // --- EVENTOS DOS BOTÕES PRINCIPAIS ---
  document.getElementById("addFormacao").addEventListener("click", () => adicionarSecao('formacao'));
  document.getElementById("addExperiencia").addEventListener("click", () => adicionarSecao('experiencia'));
  document.getElementById("addHabilidade").addEventListener("click", () => adicionarSecao('habilidade'));
  document.getElementById("curriculoForm").addEventListener("submit", gerarCurriculo);
  document.getElementById("downloadPDF").addEventListener("click", baixarCurriculoPDF);

  // --- ADICIONA SEÇÕES INICIAIS ---
  adicionarSecao('formacao');
  adicionarSecao('experiencia');
  adicionarSecao('habilidade');
});

// --- FUNÇÕES DE CARREGAMENTO DE DADOS ---
function carregarDadosUsuario() {
  const userData = JSON.parse(localStorage.getItem("pdi_user") || "{}");
  if (userData.nome) document.getElementById("nome").value = userData.nome;
  if (userData.email) document.getElementById("email").value = userData.email;
}

async function carregarSoftSkills() {
  const container = document.getElementById("softSkillsContainer");
  try {
    const formTRData = localStorage.getItem("formTR_results");
    if (formTRData) {
      const skills = JSON.parse(formTRData);
      exibirSoftSkills(skills, container);
    } else {
       container.innerHTML += "<p class='text-muted small'>Nenhuma soft skill encontrada. Complete o formulário de perfil primeiro.</p>";
    }
  } catch (error) {
    console.error("Erro ao carregar soft skills:", error);
    container.innerHTML += "<p class='text-danger small'>Não foi possível carregar as soft skills.</p>";
  }
}

function exibirSoftSkills(skills, container) {
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    container.innerHTML += "<p class='text-muted small'>Nenhuma soft skill encontrada.</p>";
    return;
  }
  let html = "<div class='row'>";
  skills.forEach(skill => {
    html += `<div class="col-md-6 mb-2"><span>${skill}</span></div>`;
  });
  html += "</div>";
  container.innerHTML += html;
}


// --- FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO ---

const templates = {
  formacao: `
    <div class="row g-3">
      <div class="col-md-6"><label class="form-label">Curso</label><input type="text" class="form-control" name="formacao_curso[]"></div>
      <div class="col-md-6"><label class="form-label">Instituição</label><input type="text" class="form-control" name="formacao_instituicao[]"></div>
      <div class="col-md-6"><label class="form-label">Início</label><input type="month" class="form-control" name="formacao_inicio[]"></div>
      <div class="col-md-6"><label class="form-label">Conclusão</label><input type="month" class="form-control" name="formacao_fim[]"></div>
    </div>`,
  experiencia: `
    <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Cargo</label><input type="text" class="form-control" name="exp_cargo[]"></div>
        <div class="col-md-6"><label class="form-label">Empresa</label><input type="text" class="form-control" name="exp_empresa[]"></div>
        <div class="col-md-6"><label class="form-label">Início</label><input type="month" class="form-control" name="exp_inicio[]"></div>
        <div class="col-md-6">
            <label class="form-label">Término</label><input type="month" class="form-control" name="exp_fim[]">
            <div class="form-check mt-2"><input class="form-check-input" type="checkbox" name="exp_atual[]" onchange="toggleEmpregoAtual(this)"><label class="form-check-label">Emprego atual</label></div>
        </div>
        <div class="col-12"><label class="form-label">Descrição das atividades</label><textarea class="form-control" name="exp_descricao[]" rows="3"></textarea></div>
    </div>`,
  habilidade: `
    <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Habilidade Técnica</label><input type="text" class="form-control" name="habilidade[]"></div>
        <div class="col-md-6">
            <label class="form-label">Nível</label>
            <select class="form-select" name="nivel[]">
                <option value="Básico">Básico</option>
                <option value="Intermediário" selected>Intermediário</option>
                <option value="Avançado">Avançado</option>
            </select>
        </div>
    </div>`
};

function adicionarSecao(tipo) {
  const container = document.getElementById(`${tipo}Container`);
  const novoItem = document.createElement("div");
  novoItem.className = "dynamic-item";
  novoItem.innerHTML = `
    <button type="button" class="btn-close btn-remove-item" aria-label="Remover"></button>
    ${templates[tipo]}
  `;
  container.appendChild(novoItem);
  novoItem.querySelector('.btn-remove-item').addEventListener('click', () => novoItem.remove());
}

function toggleEmpregoAtual(checkbox) {
  const container = checkbox.closest('.row');
  const terminoInput = container.querySelector('input[name="exp_fim[]"]');
  terminoInput.disabled = checkbox.checked;
  if (checkbox.checked) {
    terminoInput.value = '';
  }
}

// --- FUNÇÕES DE GERAÇÃO DE CURRÍCULO E PDF ---

function gerarCurriculo(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    linkedin: formData.get("linkedin"),
    endereco: formData.get("endereco"),
    objetivo: formData.get("objetivo"),
    formacoes: coletarDadosMultiplos(e.target, "formacao_curso[]", "formacao_instituicao[]", "formacao_inicio[]", "formacao_fim[]"),
    experiencias: coletarDadosMultiplos(e.target, "exp_cargo[]", "exp_empresa[]", "exp_inicio[]", "exp_fim[]", "exp_descricao[]"),
    habilidades: coletarDadosMultiplos(e.target, "habilidade[]", "nivel[]"),
    softSkills: Array.from(document.querySelectorAll("#softSkillsContainer span")).map(el => el.textContent)
  };
  
  const curriculoHTML = criarHTMLCurriculo(dados);
  document.getElementById("curriculoPreview").innerHTML = curriculoHTML;
  
  const curriculoModal = new bootstrap.Modal(document.getElementById("curriculoModal"));
  curriculoModal.show();
}

function coletarDadosMultiplos(form, ...campos) {
  const resultado = [];
  const total = form.querySelector(`[name="${campos[0]}"]`) ? form.querySelectorAll(`[name="${campos[0]}"]`).length : 0;
  
  for (let i = 0; i < total; i++) {
    const item = {};
    campos.forEach(campo => {
        // Simplificando o nome da chave (ex: 'formacao_curso[]' vira 'curso')
        const chave = campo.replace(/formacao_|exp_|\[\]/g, '');
        item[chave] = form.querySelectorAll(`[name="${campo}"]`)[i].value;
    });
    // Adiciona apenas se o primeiro campo (o principal) estiver preenchido
    if (Object.values(item)[0]) {
      resultado.push(item);
    }
  }
  return resultado;
}

function baixarCurriculoPDF() {
  const element = document.getElementById("curriculoPreview");
  const opt = {
    margin: 10,
    filename: `curriculo_${new Date().toISOString().slice(0,10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

// --- FUNÇÃO DE TEMPLATE DO CURRÍCULO ---

function formatarData(dataStr) {
  if (!dataStr) return '';
  const [ano, mes] = dataStr.split('-');
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${meses[parseInt(mes) - 1]} de ${ano}`;
}

function criarHTMLCurriculo(dados) {
  return `
    <div class="header">
      <h1>${dados.nome || ''}</h1>
      <div class="contato">
        ${dados.email ? `<span>📧 ${dados.email}</span>` : ''}
        ${dados.telefone ? `<span>📱 ${dados.telefone}</span>` : ''}
        ${dados.linkedin ? `<span>🔗 ${dados.linkedin}</span>` : ''}
        ${dados.endereco ? `<span>📍 ${dados.endereco}</span>` : ''}
      </div>
    </div>
    
    ${dados.objetivo ? `
      <div class="secao">
        <h2>🎯 Objetivo Profissional</h2>
        <p>${dados.objetivo}</p>
      </div>
    ` : ''}
    
    ${dados.formacoes.length > 0 ? `
      <div class="secao">
        <h2>🎓 Formação Acadêmica</h2>
        ${dados.formacoes.map(f => `
          <div class="item">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="instituicao">${f.instituicao}</h5>
              <span class="periodo">${formatarData(f.inicio)} - ${formatarData(f.fim) || 'Cursando'}</span>
            </div>
            <div><strong>${f.curso}</strong></div>
          </div>
        `).join('')}
      </div>` : ''}
    
    ${dados.experiencias.length > 0 ? `
      <div class="secao">
        <h2>💼 Experiência Profissional</h2>
        ${dados.experiencias.map(e => `
          <div class="item">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="instituicao">${e.empresa}</h5>
              <span class="periodo">${formatarData(e.inicio)} - ${formatarData(e.fim) || 'Atual'}</span>
            </div>
            <div><strong>${e.cargo}</strong></div>
            <p>${e.descricao || ''}</p>
          </div>
        `).join('')}
      </div>` : ''}
    
    <div class="row">
      ${dados.habilidades.length > 0 ? `
        <div class="col-md-6">
          <div class="secao">
            <h2>🛠️ Habilidades Técnicas</h2>
            <ul>${dados.habilidades.map(h => `<li><strong>${h.habilidade}</strong> - ${h.nivel}</li>`).join('')}</ul>
          </div>
        </div>` : ''}
      
      ${dados.softSkills.length > 0 ? `
        <div class="col-md-6">
          <div class="secao">
            <h2>🤝 Competências Comportamentais</h2>
            <ul>${dados.softSkills.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>` : ''}
    </div>
  `;
}