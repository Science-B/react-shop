import express from 'express';
import {
	getProducts,
	getProductById,
} from '../controllers/products-controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getProducts);
router.get('/:productId', getProductById);

export default router;
