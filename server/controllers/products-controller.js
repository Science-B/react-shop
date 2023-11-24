import productsService from '../services/products-service.js';

import { handleError } from '../utils/handleError.js';

export const getProducts = async (req, res) => {
	try {
		const list = await productsService.getAll();
		res.status(201).json(list);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const getProductById = async (req, res) => {
	try {
		const product = await productsService.getById(req.params);
		res.status(201).json(product);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};
