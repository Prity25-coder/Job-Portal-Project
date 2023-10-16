import config from "../../../config/config.js";
import STATUS_CODE from "../../../constants/statusCode.js";


export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = async (error, req, res, next) => {
    const statusCode = error.statusCode || STATUS_CODE.SERVER_ERROR;
    const errResponse = {
      title: "",
      message: error.message,
    };
  
    switch (statusCode) {
      case STATUS_CODE.BAD_REQUEST:
        errResponse.title = "Bad Request";
        break;
      case STATUS_CODE.NOT_FOUND:
        errResponse.title = "Not Found";
        break;
      case STATUS_CODE.UNAUTHORIZED:
        errResponse.title = "Unauthorized";
        break;
      case STATUS_CODE.FORBIDDEN:
        errResponse.title = "Permission Denied";
      case STATUS_CODE.CONFLICT:
        errResponse.title = "Resource already exist with this info.";
        break;
      default:
        errResponse.title = "Internal Server Error";
        break;
    }
  
    // Check if the environment is "development" then include the stackTrace
    if (!config.production) {
      errResponse.stackTrace = error.stack;
    }
  
    // todo  error logger
  
    return res.status(statusCode).json(errResponse);
  };
  
  export default errorHandler;
  