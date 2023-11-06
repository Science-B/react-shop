import tokenService from './token-service.js';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

import { handleError } from '../utils/handleError.js';

class AuthService {
	async registration(payload) {
		const { username, email, password } = payload;
		const existingEmail = await User.findOne({ email });
		const existingUserName = await User.findOne({ username });
		if (existingEmail) {
			return handleError(400, 'EMAIL_EXISTS');
		}
		if (existingUserName) {
			return handleError(400, 'USERNAME_EXISTS');
		}
		const hashedPassword = bcryptjs.hashSync(password, 10);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		const tokens = tokenService.generate({ _id: newUser._id });
		await tokenService.save(newUser._id, tokens.refreshToken);
		return { ...tokens, userId: newUser._id };
	}

	async login(payload) {
		const { email, password } = payload;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return handleError(404, 'EMAIL_NOT_FOUND');
		}
		const isPasswordEqual = bcryptjs.compareSync(
			password,
			existingUser.password,
		);
		if (!isPasswordEqual) {
			return handleError(401, 'INVALID_PASSWORD');
		}
		const tokens = tokenService.generate({ _id: existingUser._id });
		await tokenService.save(existingUser._id, tokens.refreshToken);
		return { ...tokens, userId: existingUser._id };
	}
}

export default new AuthService();
