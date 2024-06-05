import validate from '../validation/validate.js';
import DistrictValidation from '../validation/district-validation.js';
import database from '../application/database.js';
import ErrorResponse from '../error/error-response.js';

class DistrictService {
  static async get (slug) {
    const districtRequest = validate(DistrictValidation.getDistrictValidation, slug)
    const district = await database.district.findUnique({
      where: {
        slug: districtRequest
      },
      include: {
        _count: true,
        cultures: true,
        destinations: true
      }
    })
    if (!district) throw new ErrorResponse(404, 'district not found')
    return district
  }

  static async gets (query) {
    return database.district.findMany({
      where: {
        AND: [
          { name: { contains: query.name, mode: 'insensitive' } }
        ]
      },
      include: {
        _count: true,
        cultures: true,
        destinations: true
      }
    })
  }
}

export default DistrictService
