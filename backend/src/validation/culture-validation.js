import Joi from 'joi';

class CultureValidation {
  static getCultureValidation = Joi.string().required()
  static favoriteCultureValidation = Joi.object({
    username: Joi.string().min(1).required(),
    cultureSlug: Joi.string().min(1).required()
  })
  static unFavoriteCultureValidation = Joi.object({
    username: Joi.string().min(1).required(),
    cultureSlug: Joi.string().min(1).required()
  })
  static commentCultureValidation = Joi.object({
    parentId: Joi.string().min(1).optional(),
    username: Joi.string().min(1).required(),
    cultureSlug: Joi.string().min(1).required(),
    body: Joi.string().min(3).required()
  })
  static unCommentCultureValidation = Joi.object({
    id: Joi.string().min(1).required(),
    username: Joi.string().min(1).required(),
    cultureSlug: Joi.string().min(1).required()
  })
}

export default CultureValidation
