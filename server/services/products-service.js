import Product from '../models/Product.js';

class ProductsService {
	async getAll() {
		const prdocuts = await Product.find();
		return prdocuts;
	}

	async getById(payload) {
		const { productId } = payload;
		const product = await Product.findById(productId);
		return product;
	}
}
export default new ProductsService();
