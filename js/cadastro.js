document
        .querySelector("form")
        .addEventListener("submit", async function (e) {
          e.preventDefault();
          const nome = document.getElementById("nome").value.trim();
          const email = document.getElementById("email").value.trim();
          const senha = document.getElementById("senha").value;
          const confirmar = document.getElementById("confirmar").value;
          const senhaError = document.getElementById("senhaError");
          if (senha !== confirmar) {
            senhaError.style.display = "block";
            return;
          } else {
            senhaError.style.display = "none";
          }
          try {
            const resposta = await fetch("php/cadastrar.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nome, email, senha }),
            });
            const resultado = await resposta.json();
            if (resultado.success) {
              alert("Cadastro realizado com sucesso!");
              window.location.href = "login.html";
            } else {
              alert("Erro ao cadastrar: " + resultado.message);
            }
          } catch (error) {
            alert("Erro ao conectar ao servidor.");
          }
        });