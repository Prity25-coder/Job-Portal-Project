import { body, validationResult } from 'express-validator';

const loginValidator = async (req, res, next) => {
  const rules = [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),

    body('password').trim().notEmpty().withMessage('Password is required'),
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

export default loginValidator;
