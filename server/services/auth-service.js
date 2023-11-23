import tokenService from './token-service.js';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import UserDto from '../dtos/user-dto.js';

import { handleError } from '../utils/handleError.js';

async function generateTokensAndSave(user) {
	const userDto = new UserDto(user);
	const tokens = tokenService.generate({ ...userDto });
	await tokenService.save(userDto.id, tokens.refreshToken);
	return { ...tokens, user: userDto };
}

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
		return generateTokensAndSave(newUser);
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
		return generateTokensAndSave(existingUser);
	}

	async exit(payload) {
		const { refreshToken } = payload;
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}
	async refresh(payload) {
		const { refreshToken } = payload;
		if (!refreshToken) {
			return handleError(401, 'UNAUTHORIZED');
		}
		const token = tokenService.validateRefresh(refreshToken);
		const dbToken = tokenService.findToken(token);
		if (!token || !dbToken) {
			return handleError(401, 'UNAUTHORIZED');
		}
		const existingUser = await User.findById(token.id);
		return generateTokensAndSave(existingUser);
	}
}

export default new AuthService();
