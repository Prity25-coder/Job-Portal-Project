import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
// import {loginValidator} from '../validators/login.validator.js';
import { loginValidator, registerValidator } from "../validators/index.js";


const authRouter = Router();

// /api/v1/auth
authRouter.get(['/', '/login'], authController.getLogin);

authRouter.get('/register', authController.getRegister);

authRouter.post('/login',loginValidator, authController.postLogin);

authRouter.post('/register',registerValidator, authController.postRegister);

export default authRouter;
