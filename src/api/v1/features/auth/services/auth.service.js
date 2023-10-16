import encryptPassword from '../../../../../helpers/encryptPassword.js';
import AuthModel from '../models/auth.model.js';
import Users from '../../../../../lib/localDB/users.js';
import decryptPassword from '../../../../../helpers/decryptPassword.js';
import { CustomError } from '../../../../common/middlewares/error.middleware.js';
import STATUS_CODE from '../../../../../constants/statusCode.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../../../helpers/token.js';

class AuthService {
  getUser = async (email) => {
    return Users.find((user) => user.email === email);
  };
  createUser = async (userInfo) => {
    // 1. extract all info
    const { name, email, password } = userInfo;

    // 2. check if user already exist with email id
    const prevUser = await this.getUser(email);
    // console.log("Prev User", user);

    if (prevUser) {
      throw new CustomError('User already exist', STATUS_CODE.CONFLICT);
    }

    // 3. hash the password
    const hashedPassword = await encryptPassword(password);

    // 4. create user object
    const user = new AuthModel(name, email, hashedPassword);
    console.log('new User', user);

    // 4. save user
    // if you want you can save user into any DB
    Users.push(user);

    // 5. return user
    const newUser = { ...user };
    delete newUser.password;
    return newUser;
  };

  loginUser = async (userInfo) => {
    const { email, password } = userInfo;

    // 1. check if user exist
    const user = await this.getUser(email);

    if (!user) {
      throw new CustomError('Invalid Credentials', STATUS_CODE.NOT_FOUND);
    }

    // 2. match the password
    const hashedPass = user.password;
    const isPassMatch = await decryptPassword(password, hashedPass);

    if (!isPassMatch) {
      throw new CustomError('Invalid Credentials', STATUS_CODE.NOT_FOUND);
    }

    // generate access and refresh token and return it
    const payload = {
      userId: user.id,
      email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // todo return token
    return { accessToken, refreshToken };
  };
}
const authService = new AuthService();

export default authService;
