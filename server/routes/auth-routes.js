import express from 'express';

import { signUp } from '../controllers/auth-controllers.js';

const router = express.Router({ mergeParams: true });

router.post('/signUp', signUp);

export default router;
