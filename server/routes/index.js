import express from 'express';
import authRoutes from './auth-routes.js';
import commentsRoutes from './comments-routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/comments', commentsRoutes);

export default router;
