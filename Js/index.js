//alert("Bem-vindo à Netflix");

// Função para armazenar o perfil ativo no localStorage
function armazenarPerfilAtivo(event) {
    const profileElement = event.currentTarget;
    const imgElement = profileElement.querySelector('img');
    const nameElement = profileElement.querySelector('p');

    if (imgElement && nameElement) {
        const nome = nameElement.textContent;
        const imagem = imgElement.src;

        localStorage.setItem('perfilAtivoNome', nome);
        localStorage.setItem('perfilAtivoImagem', imagem);
    }
}

// Adicionar event listeners aos perfis
document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.querySelectorAll('.profile a');

    profiles.forEach(profile => {
        profile.addEventListener('click', armazenarPerfilAtivo);
    });
});