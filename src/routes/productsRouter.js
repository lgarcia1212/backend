import { Router } from 'express';
import productModel from '../models/products';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const prods = await productModel.find()
        let limite = parseInt(limit);
        if (!limite) {
            limite = prods.length;
        }
        const prodsLimit = prods.slice(0, limite);
        res.status(200).render(prodsLimit);
    } catch (error) {
        res.status(500).render(`Error interno del Servidor ${error}`);
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const prod = await productModel.findById(idProducto)

        if (prod) {
            res.status(200).render(prod);
        } else {
            res.status(400).render("Producto no existe");
        }
    } catch (error) {
        res.status(500).render(`Error interno del Servidor al intentar obtener producto: ${error}`);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        const mensaje = await productModel.create(product)
        if (mensaje === "Producto creado correctamente") {
            res.status(200).render(mensaje);
        } else {
            res.status(400).render(mensaje);
        }
    } catch (error) {
        res.status(500).render(`Error interno del Servidor al intentar añadir producto: ${error}`);
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const updateProduct = req.body;
        const mensaje = await productModel.findByIdAndUpdate(idProducto, updateProduct)

        if (mensaje === "Producto actualizado correctamente") {
            res.status(200).render(mensaje);
        } else {
            res.status(404).render(mensaje);
        }
    } catch (error) {
        res.status(500).render(`Error interno del Servidor al intentar actualizar producto: ${error}`);
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const mensaje = await productModel.findByIdAndDelete(idProducto)

        if (mensaje === "Producto eliminado correctamente") {
            res.status(200).render(mensaje);
        } else {
            res.status(404).render(mensaje);
        }
    } catch (error) {
        res.status(500).render(`Error interno del Servidor al intentar eliminar producto: ${error}`);
    }
});

export default productsRouter;
