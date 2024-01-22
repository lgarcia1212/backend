class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya está en uso.');
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);

        return newProduct.id;
    }

    getProducts() {
        return [...this.products];
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error('Not Found');
        }

        return product;
    }
}

const productManager = new ProductManager();
const productId = productManager.addProduct("Nombre del producto", "Descripción del producto", 29.99, "imagen.jpg", "ABC123", 100);
const allProducts = productManager.getProducts();
console.log(allProducts);

try {
    const productById = productManager.getProductById(productId);
    console.log(productById);
} catch (error) {
    console.error(error.message);
}
