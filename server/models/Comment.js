import { Schema, model } from 'mongoose';

const commentSchema = Schema(
	{
		content: {
			type: String,
			required: true,
		},
		pageId: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

const Comment = model('Comment', commentSchema);

export default Comment;
