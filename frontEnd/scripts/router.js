document.addEventListener("DOMContentLoaded", () => {
    function setActiveMenu() {
        // Remove a classe 'active' de todos os itens do menu
        document.querySelectorAll(".side-item").forEach(item => item.classList.remove("active"));

        // Captura a página atual pelo hash (exemplo: #produtos)
        let page = window.location.hash.substring(1) || "inicio"; // Padrão "inicio"

        // Encontra o link correspondente e adiciona a classe 'active'
        let activeItem = document.querySelector(`a[href="#${page}"]`);
        if (activeItem) {
            activeItem.parentElement.classList.add("active");
        }
    }

    // Atualiza o menu quando a página muda
    window.addEventListener("hashchange", setActiveMenu);
    setActiveMenu(); // Chama no início para marcar a página atual
});
