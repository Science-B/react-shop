import express from 'express';
import { check } from 'express-validator';

import { signUp, signIn } from '../controllers/auth-controllers.js';

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
	check('email', 'Email введён некорректно').isEmail(),
	check('password', 'Минимальная длина пароля 8 символов').isLength({
		min: 8,
	}),
	signUp,
]);

router.post('/signIn', [
	check('email', 'Email введён некорректно').normalizeEmail().isEmail(),
	check('password', 'Пароль не может быть пустым').exists(),
	signIn,
]);

export default router;
