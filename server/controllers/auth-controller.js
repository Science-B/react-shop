import authService from '../services/auth-service.js';

export const signUp = async (req, res) => {
	try {
		const authData = await authService.registration(req.body);
		res.cookie('refreshToken', authData.refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
			.status(201)
			.json(authData);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const signIn = async (req, res) => {
	try {
		const authData = await authService.login(req.body);
		res.cookie('refreshToken', authData.refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
			.status(201)
			.json(authData);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const logOut = async (req, res) => {
	try {
		const token = await authService.exit(req.cookies);
		res.clearCookie('refreshToken');
		return res.json(token);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};

export const refresh = async (req, res) => {
	try {
		const authData = await authService.refresh(req.cookies);
		res.cookie('refreshToken', authData.refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
			.status(201)
			.json(authData);
	} catch (error) {
		handleError(500, 'SERVER_ERROR');
	}
};
