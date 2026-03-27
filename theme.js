/**
 * Sistema de alternância entre Dark Mode e Light Mode
 * Salva a preferência no localStorage e detecta o tema do sistema como fallback
 */

// Nome da chave no localStorage para armazenar a preferência
const THEME_KEY = 'netflix-theme-preference';

// Elementos do DOM
const htmlElement = document.documentElement;
const themeToggleButton = document.getElementById('theme-toggle');

/**
 * Obtém o tema atual do sistema operacional
 * @returns {string} 'dark' ou 'light' baseado na preferência do sistema
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Obtém o tema salvo no localStorage ou usa o tema do sistema como fallback
 * @returns {string} 'dark' ou 'light'
 */
function getSavedTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    return saved;
  }
  return getSystemTheme();
}

/**
 * Define o tema no documento e atualiza o localStorage
 * @param {string} theme - 'dark' ou 'light'
 */
function setTheme(theme) {
  // Valida o tema
  if (theme !== 'dark' && theme !== 'light') {
    console.warn(`Tema inválido: ${theme}. Usando 'dark' como padrão.`);
    theme = 'dark';
  }

  // Atualiza o atributo data-theme no elemento raiz
  htmlElement.setAttribute('data-theme', theme);

  // Salva a preferência no localStorage
  localStorage.setItem(THEME_KEY, theme);

  // Atualiza o emoji do botão
  updateToggleButtonEmoji(theme);
}

/**
 * Atualiza o emoji do botão baseado no tema atual
 * @param {string} theme - 'dark' ou 'light'
 */
function updateToggleButtonEmoji(theme) {
  // Se o tema é escuro, mostra o sol (para alternar para claro)
  // Se o tema é claro, mostra a lua (para alternar para escuro)
  themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * Alterna entre dark mode e light mode
 */
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Detecta mudanças na preferência de tema do sistema
 */
function setupSystemThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply system theme if user hasn't set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Inicializa a funcionalidade de temas
 */
function initTheme() {
  // Obtém o tema salvo ou do sistema
  const theme = getSavedTheme();

  // Define o tema
  setTheme(theme);

  // Adiciona listener ao botão de toggle
  themeToggleButton.addEventListener('click', toggleTheme);

  // Adiciona listener para mudanças de tema do sistema
  setupSystemThemeListener();
}

// Inicializa quando o DOM está carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
