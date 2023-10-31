import express from 'express';
import { signUp, signIn } from '../controllers/auth-controllers.js';

const router = express.Router({ mergeParams: true });

router.post('/signUp', signUp);
router.post('/signIn', signIn);

export default router;
