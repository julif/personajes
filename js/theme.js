

const toggleBtn = document.getElementById('themeToggle');
const selector = document.getElementById('language-selector');
const body = document.body;

// --- LÓGICA DE TEMA (DARK MODE) ---
function initTheme() {
    // Cargar preferencia de tema
    const savedTheme = localStorage.getItem('theme');
    
    // Si hay tema guardado, aplicarlo
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } 
    // Si no hay tema guardado, usar preferencia del sistema
    else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    // Por defecto, tema claro
    else if (!savedTheme) {
        localStorage.setItem('theme', 'light');
    }
}

// Evento para cambiar tema
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});




// --- LÓGICA DE IDIOMA ---
function setLanguage(lang) {
    // Eliminamos las clases de idioma previas 
    body.classList.remove('lang-es', 'lang-en');
    body.classList.add(`lang-${lang}`);
    
    selector.value = lang;
    localStorage.setItem('userLanguage', lang);
    document.documentElement.lang = lang;
}

// --- INICIALIZACIÓN AL CARGAR ---
window.addEventListener('DOMContentLoaded', () => {
    // Inicializar Tema
    initTheme();
    // Inicializar Idioma
    const savedLang = localStorage.getItem('userLanguage');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('en') ? 'en' : 'es';
    setLanguage(savedLang || browserLang);
});

selector.addEventListener('change', (e) => setLanguage(e.target.value));

