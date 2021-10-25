import Mongoose from 'mongoose';

export const ProductSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    code: {
        type: String,
    },
});

export const ProductModel = Mongoose.models.Product || Mongoose.model('Product', ProductSchema);
