import { promises as fsPromises } from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(newProduct) {
        try {
            const prods = JSON.parse(await fsPromises.readFile(this.path, 'utf-8'));

            if (
                newProduct.code &&
                newProduct.id &&
                newProduct.title &&
                newProduct.description &&
                newProduct.price &&
                newProduct.thumbnail &&
                newProduct.stock
            ) {
                const indice = prods.findIndex(prod => prod.code === newProduct.code);

                if (indice === -1) {
                    prods.push(newProduct);
                    await fsPromises.writeFile(this.path, JSON.stringify(prods, null, 2));
                    return 'Producto creado correctamente';
                } else {
                    return 'El producto ya existe';
                }
            } else {
                return 'Ingrese el producto con todos los datos';
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            return 'Error al agregar el producto';
        }
    }

    async getProducts() {
        try {
            const prods = JSON.parse(await fsPromises.readFile(this.path, 'utf-8'));
            return prods;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return 'Error al obtener los productos';
        }
    }

    async getProductById(id) {
        try {
            const prods = JSON.parse(await fsPromises.readFile(this.path, 'utf-8'));
            const prod = prods.find(product => product.id === id);

            if (prod) {
                return prod;
            } else {
                return 'Not Found';
            }
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            return 'Error al obtener el producto por ID';
        }
    }

    async updateProduct(id, newProduct) {
        try {
            const prods = JSON.parse(await fsPromises.readFile(this.path, 'utf-8'));
            const indice = prods.findIndex(product => product.id === id);

            if (indice !== -1) {
                prods[indice].stock = newProduct.stock;
                prods[indice].price = newProduct.price;
                prods[indice].title = newProduct.title;
                prods[indice].thumbnail = newProduct.thumbnail;
                prods[indice].description = newProduct.description;
                prods[indice].code = newProduct.code;

                await fsPromises.writeFile(this.path, JSON.stringify(prods, null, 2));
                return 'Producto actualizado correctamente';
            } else {
                return 'Not Found';
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return 'Error al actualizar el producto';
        }
    }

    async deleteProduct(id) {
        try {
            const prods = JSON.parse(await fsPromises.readFile(this.path, 'utf-8'));
            const indice = prods.findIndex(product => product.id === id);

            if (indice !== -1) {
                const prodsFilter = prods.filter(prod => prod.id !== id);
                await fsPromises.writeFile(this.path, JSON.stringify(prodsFilter, null, 2));
                return 'Producto eliminado correctamente';
            } else {
                return 'Not Found';
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return 'Error al eliminar el producto';
        }
    }
}
