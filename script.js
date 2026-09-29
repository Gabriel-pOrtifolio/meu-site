// Sistema de Menu Mobile (Hambúrguer)
function toggleMenu() {
    const menu = document.getElementById('nav-links');
    menu.classList.toggle('active');
}

// Sistema de Dark Mode com salvamento na memória do navegador (localStorage)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Salva a preferência do usuário
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Troca o ícone do botão
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Carrega o tema salvo ao abrir a página
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = 'fas fa-sun';
    }
    
    // Chama a API do GitHub apenas se o container existir na página atual
    fetchGitHubRepos();
};

// Integração Dinâmica com GitHub
async function fetchGitHubRepos() {
    const container = document.getElementById('github-container');
    if (!container) return; 

    // Aqui está o seu usuário real do GitHub
    const username = 'Gabriel-pOrtifolio'; 
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        const repos = await response.json();
        
        container.innerHTML = ''; // Limpa o texto "Carregando..."
        
        repos.forEach(repo => {
            container.innerHTML += `
                <div class="card">
                    <i class="fab fa-github"></i>
                    <h3>${repo.name}</h3>
                    <p style="margin-bottom: 15px;">${repo.description ? repo.description : 'Projeto sem descrição detalhada.'}</p>
                    <a href="${repo.html_url}" target="_blank" style="color: var(--primary); text-decoration: none; font-weight: bold;">Ver Código <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = '<p>Erro ao carregar repositórios do GitHub.</p>';
    }
}
