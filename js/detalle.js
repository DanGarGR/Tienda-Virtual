const app = Vue.createApp({
    data() {
        return {
            carta: null, // Carta seleccionada
            carrito: JSON.parse(localStorage.getItem('carrito')) || [] // Recuperar carrito
        };
    },
    created() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (id) {
            this.cargarCarta(id);
        }
    },
    methods: {
        cargarCarta(id) {
            // Obtener carta de la API o localStorage
            fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
                .then(response => response.json())
                .then(data => {
                    this.carta = data.data; // Cargar detalles de la carta
                    this.carta.precio = (Math.random() * 15 + 5).toFixed(2); // Simular precio
                })
                .catch(() => {
                    alert('Error al cargar los detalles de la carta.');
                });
        },
        agregarAlCarrito(carta) {
            const itemEnCarrito = this.carrito.find(item => item.id === carta.id);
            if (itemEnCarrito) {
                itemEnCarrito.cantidad = Math.min(itemEnCarrito.cantidad + 1, 6);
            } else {
                this.carrito.push({ ...carta, cantidad: 1 });
            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Guardar carrito
            alert('Carta añadida al carrito.');
        }
    }
});

app.mount('#app');
