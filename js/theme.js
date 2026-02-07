const toggleBtn = document.getElementById('themeToggle');

// Cargar preferencia
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');

}

// Toggle
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
   
});