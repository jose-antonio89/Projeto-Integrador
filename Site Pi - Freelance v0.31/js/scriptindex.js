


if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.replace('fa-moon', 'fa-sun');
}
