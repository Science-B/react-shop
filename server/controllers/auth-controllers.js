import authService from '../services/auth-service.js';

export const signUp = async (req, res) => {
	try {
		const authData = await authService.registration(req.body);
		res.cookie('refreshToken', authData.refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		res.status(201).json(authData);
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка, попробуйте позже!',
		});
	}
};

export const signIn = async (req, res) => {
	try {
		// const { email, password } = req.body;
		// const existingUser = await User.findOne({ email });
		// if (!existingUser) {
		// 	return res.status(404).json({
		// 		error: {
		// 			message: 'EMAIL_NOT_FOUND',
		// 			code: 404,
		// 		},
		// 	});
		// }
		// const isPasswordEqual = bcryptjs.compareSync(
		// 	password,
		// 	existingUser.password,
		// );
		// if (!isPasswordEqual) {
		// 	return res.status(401).json({
		// 		error: {
		// 			message: 'INVALID_PASSWORD',
		// 			code: 401,
		// 		},
		// 	});
		// }
		// const tokens = tokenService.generate({ _id: existingUser._id });
		// await tokenService.save(existingUser._id, tokens.refreshToken);
		// res.status(200).send({ ...tokens, userId: existingUser._id });
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка, попробуйте позже',
		});
	}
};
