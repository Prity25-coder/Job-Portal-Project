import { v4 as uuidv4 } from 'uuid';
class AuthModel {
  constructor(userName, email, password) {
    this.id = uuidv4();
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.lastLoggedInAt = new Date().toISOString();
  }
}
export default AuthModel;
