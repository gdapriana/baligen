import Joi from 'joi';

class DistrictValidation {
  static getDistrictValidation = Joi.string().required()
}

export default DistrictValidation
