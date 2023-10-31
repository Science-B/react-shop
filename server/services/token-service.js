import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/Token.js';
dotenv.config();

class TokenService {
	generate(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH);
		return { accessToken, refreshToken, expiresIn: 3600 };
	}

	async save(user, refreshToken) {
		const data = await Token.findOne({ user });
		if (data) {
			data.refreshToken = refreshToken;
			return data.save();
		}

		const token = await Token.create({ user, refreshToken });
		return token;
	}

	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, process.env.JWT_REFRESH);
		} catch (error) {
			return null;
		}
	}

	validateAccess(accessToken) {
		try {
			return jwt.verify(accessToken, process.env.JWT_SECRET);
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken) {
		try {
			return await Token.findOne({ refreshToken });
		} catch (error) {
			return null;
		}
	}
}

export default new TokenService();
