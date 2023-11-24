import commentsService from '../services/comments-service.js';

import { handleError } from '../utils/handleError.js';

export const getComments = async (req, res) => {
	try {
		const list = await commentsService.get(req.query);
		res.status(201).json(list);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const createComment = async (req, res) => {
	try {
		const newComment = await commentsService.create(req);
		res.status(201).json(newComment);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const deleteComment = async (req, res) => {
	try {
		const deleteData = await commentsService.delete(req.params);
		res.status(201).json(deleteData);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};
