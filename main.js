import { Product } from "./Product.js";
import { ProductManager } from "./ProductsManager.js";

const producto1 = new Product("Vino", "Tinto", 2000, 12, "VT001");

const productManager = new ProductManager('./Products.json');
productManager.addProduct(producto1)
    .then(result => console.log(result))
    .catch(error => console.error('Error al agregar el producto:', error));
