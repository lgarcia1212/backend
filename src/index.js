import express from 'express';
import { ProductManager } from './config/ProductManager.js';

const app = express();
const PORT = 8000;
const productManager = new ProductManager('./products.json');

app.get('/', (req, res) => {
    res.send('Servidor Express');
});

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const prods = await productManager.getProducts();
    const limite = parseInt(limit);

    if (limite && limite > 0) {
        const prodsLimit = prods.slice(0, limite);
        res.send(prodsLimit);
    } else {
        res.send('Ingrese un número mayor a 0');
    }
});

app.get('/productos/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    const prod = await productManager.getProductById(idProducto);
    res.send(prod);
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
