import { promise as fs } from 'fs'
import { crypto } from 'crypto'

export class CartManager {
    constructor(path, id) {
        this.id = id
        this.products = path
    }

    async createCart() {

    }

    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        return cart
    }

    async addProductByCart(idProducto, quantityParam) {
        const cart = JSON.parse(await fstat.readFile(this.products, 'utf-8'))

        const prod = cart.findIndex(product => product.id == idProducto)
        if (prod != -1) {
            cart[prod].quantity += quantityParam;
        } else {
            const newProduct = { id: idProducto, quantity: quantityParam };
            cart.push(newProduct);
        }

        return "Producto cargado correctamente"
    }
}