import { AxiosResponse } from 'axios';

import httpService from './httpService';

import { Product } from '../api/interfaces';

const productsService = {
	getAll: async (): Promise<AxiosResponse<Product[]>> => {
		return httpService.get<Product[]>('/products')

	},
	getById: async (productId: string): Promise<AxiosResponse<Product>> => {
		return httpService.get<Product>(`/products/${productId}`)
	},
};

export default productsService;