import Comment from '../models/Comment.js';
import { handleError } from '../utils/handleError.js';

class CommentsService {
	async get(payload) {
		const { orderBy, equalTo } = payload;
		const comments = await Comment.find({ [orderBy]: equalTo });
		return { comments };
	}

	async create(payload) {
		const { body, product } = payload;
		const newComment = await Comment.create({
			...body,
			productId: product._id,
		});
		return newComment;
	}

	async delete(payload) {
		const { commentId, product } = payload;
		const removedComment = await Comment.findById(commentId);
		if (removedComment.productId.toString() === product._id) {
			await removedComment.remove();
			return 'SUCCESS';
		} else {
			handleError(401, 'UNAUTHORIZED');
		}
	}
}
export default new CommentsService();
