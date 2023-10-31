import tokenService from './token-service.js';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

class AuthService {
	async registration(payload) {
		const { username, email, password } = payload;
		const existingEmail = await User.findOne({ email });
		const existingUserName = await User.findOne({ username });
		if (existingEmail) {
			return {
				error: {
					message: 'EMAIL_EXISTS',
					code: 400,
				},
			};
		}
		if (existingUserName) {
			return {
				error: {
					message: 'USERNAME_EXISTS',
					code: 400,
				},
			};
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
}

export default new AuthService();
