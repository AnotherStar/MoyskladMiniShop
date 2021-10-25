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
    article: {
        type: String,
    },
    id: {
        type: String,
    },
});

export const ProductModel = Mongoose.models.Product || Mongoose.model('Product', ProductSchema, 'product');

import { downloadList } from '../moysklad/index.js';

export const syncDown = () => {
    downloadList('/entity/product', {}, chunk => {
        ProductModel.bulkWrite(getBulkRows(chunk, 'id'));
    });
};

export const getBulkRows = (rows, uniqueKey) => {
    return rows.map(row => {
        const filter = {};

        if (Array.isArray(uniqueKey)) {
            uniqueKey.forEach(uniqueKey => {
                filter[uniqueKey] = row[uniqueKey];
            });
        } else {
            filter[uniqueKey] = row[uniqueKey];
        }
        return {
            updateOne: {
                filter,
                update: {
                    $set: {
                        ...row,
                    },
                },
                upsert: true,
            },
        };
    });
};

// setTimeout(() => {
// syncDown();
// }, 5000);
