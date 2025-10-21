 fetch("php/buscar_recomendacoes.php")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("conteudo");
        const resultados = document.getElementById("resultadosPerfil");

        if (!data.perfil || !data.cursos) {
          container.innerHTML = "<p>Perfil não encontrado. Preencha o <a href='formTR.html'>formulário</a>.</p>";
          return;
        }

        container.innerHTML = `
          <h2>Perfil: ${data.perfil}</h2>
          <h3>📚 Livros:</h3>
          <ul>${data.livros.map(l => `<li>${l.nome} — <em>${l.autor}</em></li>`).join("")}</ul>
          <h3>🎓 Cursos:</h3>
          <ul>${data.cursos.map(c => `<li><a href="${c.link}" target="_blank">${c.nome}</a></li>`).join("")}</ul>
        `;

        resultados.style.display = "block";
        resultados.innerHTML = `
          <h2>Resultados do Perfil</h2>
          <p>Perfil: ${data.perfil}</p>
          <p>Total de Cursos: ${data.cursos.length}</p>
          <p>Total de Livros: ${data.livros.length}</p>
        `;
      });