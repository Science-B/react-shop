import express from 'express';
import {
	signUp,
	signIn,
	logOut,
	refresh,
} from '../controllers/auth-controller.js';

const router = express.Router({ mergeParams: true });

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/logOut', logOut);
router.post('/refresh', refresh);

export default router;
