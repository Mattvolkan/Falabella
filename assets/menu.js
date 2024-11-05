document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenuBtn = document.querySelector('.close-menu');
    
    // Abrir menú
    menuBtn.addEventListener('click', function() {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
    
    // Cerrar menú
    closeMenuBtn.addEventListener('click', closeMenu);
    
    // Cerrar al hacer clic fuera del menú
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Manejo de submenús
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Aquí puedes agregar la lógica para mostrar submenús
            // Por ahora solo prevenimos la navegación
            e.preventDefault();
        });
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});