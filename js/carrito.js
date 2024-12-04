const app = Vue.createApp({
    data() {
        return {
            carrito: JSON.parse(localStorage.getItem('carrito')) || [] // Recuperar carrito de localStorage
        };
    },
    computed: {
        total() {
            // Calcula el subtotal (sin IVA)
            return this.carrito.reduce((acc, item) => acc + (item.cantidad * parseFloat(item.precio)), 0).toFixed(2);
        },
        iva() {
            // Calcula el IVA del 16% sobre el subtotal
            return (this.total * 0.16).toFixed(2);
        },
        totalConIVA() {
            // Calcula el total incluyendo el IVA
            return (parseFloat(this.total) + parseFloat(this.iva)).toFixed(2);
        }
    },
    methods: {
        modificarCantidad(index, cambio) {
            const item = this.carrito[index];
            item.cantidad += cambio;
            localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualizar localStorage
        },
        eliminarItem(index) {
            this.carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualizar localStorage
        },
        finalizarCompra() {
            alert('¡Compra finalizada con éxito!');
            this.carrito = [];
            localStorage.removeItem('carrito');
        }
    }
});

app.mount('#app');
    