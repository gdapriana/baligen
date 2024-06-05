import Joi from 'joi';

class UserValidation {
  static registerUserValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).max(100).required(),
    name: Joi.string().max(100).required()
  });
  static loginUserValidation = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().max(100).required()
  });
  static getUserValidation = Joi.string().max(30).required()
  static updateUserValidation = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    profilePicture: Joi.string().uri().optional(),
    address: Joi.string().optional(),
  })
  static logoutUserValidation = Joi.string().max(30).required()
}

export default UserValidation;
