import {} from 'mongoose'

const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        unique: true
    },
    code: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },  
    thumbnail: {
        default: []
    }
})

const productModel = model("products", productSchema)

export default productModel