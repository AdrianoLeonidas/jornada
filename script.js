// Sidebar collapse (verifica existência dos elementos)
const SIDEBAR_EL = document.getElementById("sidebar");
const btnCollapse = document.getElementById("btn-collapse");
if (SIDEBAR_EL && btnCollapse) {
  btnCollapse.addEventListener("click", () => {
    SIDEBAR_EL.classList.toggle("collapsed");
    if (typeof PoppersInstance !== "undefined" && PoppersInstance.closePoppers) {
      PoppersInstance.closePoppers();
    }
    if (SIDEBAR_EL.classList.contains("collapsed") && typeof FIRST_SUB_MENUS_BTN !== "undefined") {
      FIRST_SUB_MENUS_BTN.forEach(element => {
        element.parentElement.classList.remove("open");
      });
    }
    if (typeof updatePoppersTimeout === "function") updatePoppersTimeout();
  });
}

// Sidebar mobile menu
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");
if (menuBtn && SIDEBAR_EL && overlay) {
  menuBtn.addEventListener("click", () => {
    SIDEBAR_EL.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  });
  overlay.addEventListener("click", () => {
    SIDEBAR_EL.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });
}

// Login/logout botões
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

function acessarTrilha(destino) {
  const logado = localStorage.getItem("logado");
  if (logado === "true") {
    window.location.href = destino;
  } else {
    localStorage.setItem("destinoPendente", destino);
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("logado");
  localStorage.removeItem("pdi_user");
  alert("Você saiu da sua conta.");
  window.location.href = "telainicial.html";
}

function verificarLogin() {
  const logado = localStorage.getItem("logado");
  if (loginBtn && logoutBtn) {
    if (logado === "true") {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", verificarLogin);

// ...comentários explicativos...