import express from 'express';
import { getProducts } from '../controllers/products-controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getProducts);

export default router;
