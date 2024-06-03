import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import ticketModel from "../models/ticket.js";

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
}

export const createCart = async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al intentar crear carrito: ${error}`)
    }
}

export const insertProductCart = async (req, res) => {
    try {
        if (req.user.rol == "User") {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
            const cart = await cartModel.findById(cartId)
            const indice = cart.products.findIndex(product => product.id_prod == productId)
            if (indice != -1) {
                cart.products[indice].quantity = quantity
            } else {
                cart.products.push({ id_prod: productId, quantity: quantity })
            }
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
            res.status(200).send(mensaje)
        } else {
            res.status(403).send("Usuario no autorizado")
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al intentar crear producto: ${error}`)
    }
}

export const createTicket = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        const prodSinStock = []
        if (cart) {
            cart.products.forEach(async (prod) => {
                let producto = await productModel.findById(prod.id_prod)
                if (producto.stock - prod.quantity < 0) {
                    prodSinStock.push(producto.id)
                }
            })
            if (prodSinStock.length == 0) {
                const totalPrice = cart.products.reduce((a,b) => (a.id_prod.price * a.quantity) + (b.id_prod.price * b.quantity), 0)
                const aux = [...cart.products]
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalPrice,
                    products: cart.products
                })
                cart.products.forEach(async (prod) => {
                    const prodBDD = await productModel.findByIdAndUpdate(prod.id_prod, {
                        stock: prod.quantity
                    })
                     
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: []
                })
                res.status(200).send(newTicket)
            } else {
                console.log(prodSinStock)
                prodSinStock.forEach((prodId) => {
                    cart.products = cart.products.filter(pro => pro.id_prod !== prodId)
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: cart.products
                })
                res.status(400).send(`Productos sin stock: ${prodSinStock}`)
            }
        } else {
            res.status(404).send("Carrito inexistente")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}