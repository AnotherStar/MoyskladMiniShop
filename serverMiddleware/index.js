import express from 'express';
import Resource from 'resourcejs';
import Mongoose from 'mongoose';

Mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.info('Database connected');
});

const app = express();

import { ProductModel } from '../api/product/model.js';

app.all('*', (req, res, next) => {
    console.log(req.url);
    next();
});

Resource(app, '', 'product', ProductModel).rest();

export default app;
