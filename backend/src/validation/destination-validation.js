import Joi from 'joi';

class DestinationValidation {
  static getDestinationValidation = Joi.string().min(1).max(200).required()
  static favoriteDestinationValidation = Joi.object({
    username: Joi.string().min(1).required(),
    destinationSlug: Joi.string().min(1).required()
  })
  static unFavoriteDestinationValidation = Joi.object({
    username: Joi.string().min(1).required(),
    destinationSlug: Joi.string().min(1).required()
  })
  static commentDestinationValidation = Joi.object({
    parentId: Joi.string().min(1).optional(),
    username: Joi.string().min(1).required(),
    destinationSlug: Joi.string().min(1).required(),
    body: Joi.string().min(3).required()
  })
  static unCommentDestinationValidation = Joi.object({
    id: Joi.string().min(1).required(),
    username: Joi.string().min(1).required(),
    destinationSlug: Joi.string().min(1).required()
  })
}

export default DestinationValidation;
