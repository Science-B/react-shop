import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const signUp = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: {
					message: 'INVALID_DATA',
					code: 400,
				},
			});
		}
		const { username, email, password } = req.body;
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({
				error: {
					message: 'EMAIL_EXISTS',
					code: 400,
				},
			});
		}
		const existingUserName = await User.findOne({ username });
		if (existingUserName) {
			return res.status(400).json({
				error: {
					message: 'USERNAME_EXISTS',
					code: 400,
				},
			});
		}
		const hashedPassword = bcryptjs.hashSync(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json('Пользователь создан!');
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка, попробуйте позже!',
		});
	}
};
