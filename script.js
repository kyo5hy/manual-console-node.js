// Quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  // Coloca destaque nos códigos (usando a biblioteca highlight.js)
  hljs.highlightAll();

  // Adiciona um botão de copiar em cada bloco de código
  document.querySelectorAll("pre").forEach((bloco) => {
    const botao = document.createElement("button");
    botao.className = "copy-btn";
    botao.textContent = "Copiar";
    bloco.appendChild(botao);

    // Quando clicar no botão, copia o código
    botao.addEventListener("click", () => {
      const codigo = bloco.querySelector("code").textContent;
      navigator.clipboard.writeText(codigo).then(() => {
        botao.textContent = "Copiado!";
        botao.style.background = "#27ae60"; // Muda a cor para verde
        setTimeout(() => {
          botao.textContent = "Copiar";
          botao.style.background = "#3498db"; // Volta para a cor original
        }, 2000); // Espera 2 segundos
      });
    });
  });

  // Mostra todas as seções quando a página carrega
  const secoes = document.querySelectorAll(".fade-in");
  secoes.forEach((secao) => {
    secao.style.display = "block"; // Garante que a seção aparece
    secao.style.opacity = "1"; // Remove o efeito de fade inicial
  });

  // Animação simples ao rolar a página
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.style.transition = "opacity 0.5s ease-in";
        entrada.target.style.opacity = "1";
      }
    });
  }, { threshold: 0.1 }); // Detecta quando 10% da seção aparece

  secoes.forEach((secao) => observador.observe(secao));
});

// Função para buscar texto e rolar até ele
function searchAndScroll() {
  const termoBusca = document.getElementById("searchInput").value.toLowerCase();
  const elementosTexto = document.querySelectorAll("p, h2, h3, code");

  for (const elemento of elementosTexto) {
    const texto = elemento.textContent.toLowerCase();
    if (texto.includes(termoBusca) && termoBusca.length > 0) {
      elemento.scrollIntoView({ behavior: "smooth", block: "center" }); // Rola até o elemento
      elemento.style.background = "rgba(255, 255, 0, 0.3)"; // Destaque amarelo
      setTimeout(() => {
        elemento.style.background = "none"; // Remove o destaque após 2 segundos
      }, 2000);
      break; // Para após encontrar o primeiro resultado
    }
  }
}