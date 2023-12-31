import { body, validationResult } from "express-validator";

const registerValidator = async (req, res, next) => {
  const rules = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLowercase()
      .withMessage("Name must be in lowercase")
      .isLength({ min: 5 })
      .withMessage("User name must be at least 5 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least length of 6"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  // console.log(validationErrors.array());

  // if error is there then isEmpty will give false
  // todo
  if (!validationErrors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, error: validationErrors.array() });
  }

  return next();
};

export default registerValidator;
