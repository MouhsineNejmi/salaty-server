import { Router } from 'express';
import { authController } from './controller';
import { loginSchema, registerSchema } from './schema';

import { validate } from '@/middlewares/validate.middleware';
import authenticateUser from '@/middlewares/authenticate-user.middleware';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.use(authenticateUser);
router.get('/me', authController.getMe);

export default router;
