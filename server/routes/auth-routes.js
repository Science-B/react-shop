import express from 'express';
import { check } from 'express-validator';

import { signUp } from '../controllers/auth-controllers.js';

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
	check('email', 'Email введён некорректно').isEmail(),
	check('password', 'Минимальная длина пароля 8 символов').isLength({
		min: 8,
	}),
	signUp,
]);

export default router;
