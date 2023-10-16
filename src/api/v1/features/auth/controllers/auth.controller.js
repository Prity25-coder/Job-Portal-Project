import authService from '../services/auth.service.js';
import decryptPassword from '../../../../../helpers/decryptPassword.js';
import STATUS_CODE from '../../../../../constants/statusCode.js';
import asyncHandler from 'express-async-handler';

class AuthController {
  getLogin = async (req, res) => {
    res.status(STATUS_CODE.OK).render('login');
  };

  getRegister = async (req, res) => {
    res.status(STATUS_CODE.OK).render('register');
  };

  postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.loginUser({ email, password });

     // set access token and refresh token in session
     const { accessToken, refreshToken } = token;
     req.session.accessToken = accessToken;
     req.session.refreshToken = refreshToken;

    return res
      .status(STATUS_CODE.OK)
      .json({ message: ' User Successfully Logged In', token });
  });

  postRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await authService.createUser({ name, email, password });

    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: 'User created', user: newUser });
  });
}

const authController = new AuthController();

export default authController;
