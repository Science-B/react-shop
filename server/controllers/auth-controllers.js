import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import tokenService from '../services/token-service.js';

import User from '../models/User.js';

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
		const tokens = tokenService.generate({ _id: newUser._id });
		await newUser.save();
		await tokenService.save(newUser._id, tokens.refreshToken);
		res.status(201).send({ ...tokens, userId: newUser._id });
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка, попробуйте позже!',
		});
	}
};

export const signIn = async (req, res) => {
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

		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({
				error: {
					message: 'EMAIL_NOT_FOUND',
					code: 404,
				},
			});
		}

		const isPasswordEqual = bcryptjs.compareSync(
			password,
			existingUser.password,
		);

		if (!isPasswordEqual) {
			return res.status(401).json({
				error: {
					message: 'INVALID_PASSWORD',
					code: 401,
				},
			});
		}

		const tokens = tokenService.generate({ _id: existingUser._id });
		await tokenService.save(existingUser._id, tokens.refreshToken);

		res.status(200).send({ ...tokens, userId: existingUser._id });
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка, попробуйте позже',
		});
	}
};
