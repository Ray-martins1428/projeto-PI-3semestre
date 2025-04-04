document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("open_btn");
    const menuLinks = document.querySelectorAll(".side-item a");
    const mainContent = document.getElementById("main-content");

    // Abre e fecha o menu lateral
    openBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open-sidebar");
    });

    // Função para carregar o conteúdo da página dinamicamente
    function loadPage(page) {
        fetch(`../pages/${page}.html`) // Busca o arquivo HTML correto
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html; // Insere o conteúdo dentro da <main>
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    }

    // Função para atualizar o item ativo do menu
    function updateActiveMenu() {
        const hash = window.location.hash.substring(1) || "inicio"; // Página padrão

        menuLinks.forEach(link => {
            link.parentElement.classList.remove("active"); // Remove 'active' de todos

            if (link.getAttribute("href") === `#${hash}`) {
                link.parentElement.classList.add("active"); // Adiciona no item correto
            }
        });

        // Chama a função para carregar a página correta dentro da <main>
        loadPage(hash);
    }

    // Detecta mudanças no hash (ao clicar ou usar o botão "voltar")
    window.addEventListener("hashchange", updateActiveMenu);

    // Ativa o menu correto e carrega a página ao iniciar
    updateActiveMenu();
});


document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout_btn");

    logoutBtn.addEventListener("click", function () {
        // Limpa os dados da sessão (se houver)
        sessionStorage.clear();
        localStorage.clear();

        // Redireciona para a tela de login
        window.location.href = "../pages/login.html";

        // Impede o usuário de voltar para a página anterior
        history.pushState(null, null, "../pages/login.html");
        window.addEventListener("popstate", function () {
            history.pushState(null, null, "../pages/login.html");
        });
    });
});
