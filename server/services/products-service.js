import Product from '../models/Product.js';

class ProductsService {
	async getAll() {
		const prdocuts = await Product.find();
		return prdocuts;
	}
}
export default new ProductsService();
