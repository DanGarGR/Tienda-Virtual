const app = Vue.createApp({
    created() {
        this.cargarCartasPokemon();
    },
    data() {
        return {
            cartas: [], // Lista de cartas de la API
            cartasFiltradas: [], // Lista filtrada según la búsqueda
            carrito: JSON.parse(localStorage.getItem('carrito')) || [], // Lista de cartas añadidas al carrito
            busqueda: "", // Término de búsqueda
        };
    },
    computed: {
        progresoBusqueda() {
            // Porcentaje de la barra de progreso
            return (this.cartasFiltradas.length / this.cartas.length) * 100 || 0;
        }
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
                    this.cartasFiltradas = this.cartas; // Inicializar las cartas filtradas con todas las cartas
                });
        },
        agregarAlCarrito(carta) {
            const itemEnCarrito = this.carrito.find(item => item.id === carta.id);
            if (itemEnCarrito) {
                // Incrementar el contador si ya existe
                itemEnCarrito.cantidad = Math.min(itemEnCarrito.cantidad + 1, 6);
            } else {
                // Añadir un nuevo artículo al carrito
                this.carrito.push({ ...carta, cantidad: 1 });
            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Guardar en localStorage
        },
        eliminarDelCarrito(indice) {
            this.carrito.splice(indice, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualizar localStorage
        },irADetalle(id) {
                // Redirigir a una página genérica con el ID como parámetro en la URL
                window.location.href = `detalle.html?id=${id}`;
            },
        filtrarCartas() {
            const termino = this.busqueda.toLowerCase();
            this.cartasFiltradas = this.cartas.filter((carta) =>
                carta.name.toLowerCase().includes(termino) ||
                carta.id.toLowerCase().includes(termino) ||
                (carta.rarity && carta.rarity.toLowerCase().includes(termino))
            );
        },
        irAFinalizacion() {
            if (this.carrito.length > 0) {
                // Redirigir al HTML de finalización
                window.location.href = '../Otras_PAG/Papulandia.html';
            } else {
                alert('El carrito está vacío. Agrega productos para continuar.');
            }
        },
    }
});

app.mount('#app');
