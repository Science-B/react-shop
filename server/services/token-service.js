import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/Token.js';
dotenv.config();

class TokenService {
	generate(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '15d',
		});
		return { accessToken, refreshToken };
	}

	async save(userId, refreshToken) {
		const tokenData = await Token.findOne({ userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await Token.create({ userId, refreshToken });
		return token;
	}

	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		} catch (error) {
			return null;
		}
	}

	validateAccess(accessToken) {
		try {
			return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
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
