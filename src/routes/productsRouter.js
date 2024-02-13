import { Router } from 'express';
import { ProductManager } from '../config/ProductsManager';

const productManager = new ProductManager('../data/products.json');
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const prods = await productManager.getProducts();
        let limite = parseInt(limit);
        if (!limite) {
            limite = prods.length;
        }
        const prodsLimit = prods.slice(0, limite);
        res.status(200).send(prodsLimit);
    } catch (error) {
        res.status(500).send(`Error interno del Servidor ${error}`);
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const prod = await productManager.getProductById(idProducto);

        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(400).send("Producto no existe");
        }
    } catch (error) {
        res.status(500).send(`Error interno del Servidor al intentar obtener producto: ${error}`);
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        const mensaje = await productManager.addProduct(product);
        if (mensaje === "Producto creado correctamente") {
            res.status(200).send(mensaje);
        } else {
            res.status(400).send(mensaje);
        }
    } catch (error) {
        res.status(500).send(`Error interno del Servidor al intentar añadir producto: ${error}`);
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const updateProduct = req.body;
        const mensaje = await productManager.updateProduct(idProducto, updateProduct);

        if (mensaje === "Producto actualizado correctamente") {
            res.status(200).send(mensaje);
        } else {
            res.status(404).send(mensaje);
        }
    } catch (error) {
        res.status(500).send(`Error interno del Servidor al intentar actualizar producto: ${error}`);
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const mensaje = await productManager.deleteProduct(idProducto);

        if (mensaje === "Producto eliminado correctamente") {
            res.status(200).send(mensaje);
        } else {
            res.status(404).send(mensaje);
        }
    } catch (error) {
        res.status(500).send(`Error interno del Servidor al intentar eliminar producto: ${error}`);
    }
});

export default productsRouter;
