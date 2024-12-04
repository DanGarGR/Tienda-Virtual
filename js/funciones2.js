document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de desvanecimiento al cargar la página
    document.body.classList.add('fade-in');
});

// Añadir clase para la animación de desvanecimiento
document.body.style.transition = 'opacity 2s';
document.body.classList.add('fade-in');

// Función para efecto de cambio de color al hacer clic en el header
document.querySelector('header').addEventListener('click', function() {
    this.style.backgroundColor = '#ffcc00';
});
