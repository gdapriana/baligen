import Joi from 'joi';

class CategoryValidation {
  static getCategoryValidation = Joi.string().required()
}

export default CategoryValidation
