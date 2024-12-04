const app = Vue.createApp({
    created() {
        this.cargarCartasPokemon();
    },
    data() {
        return {
            cartas: [], // Lista de cartas de la API
            carrito: [] // Lista de cartas añadidas al carrito
        };
    },
    methods: {
        cargarCartasPokemon() {
            fetch('https://api.pokemontcg.io/v2/cards?pageSize=12')
                .then((response) => response.json())
                .then((data) => {
                    this.cartas = data.data.map((carta) => {
                        return {
                            ...carta,
                            precio: (Math.random() * 15 + 5).toFixed(2)
                        };
                    });
                });
        },
        agregarAlCarrito(carta) {
            this.carrito.push(carta);
        },
        eliminarDelCarrito(indice) {
            this.carrito.splice(indice, 1);
        },
        irADetalle(id) {
            window.location.href = `detalle-${id}.html`;
        }
        
    }
    
});

app.mount('#app');

// Añadir efecto de desvanecimiento al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
});

document.body.style.transition = 'opacity 2s';
document.body.classList.add('fade-in');
