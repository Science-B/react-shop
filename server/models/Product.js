import { Schema, model } from 'mongoose';

const productSchema = Schema(
	{
		picture: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
		},
	},
	{ timestamps: true },
);

const Product = model('Product', productSchema);

export default Product;
