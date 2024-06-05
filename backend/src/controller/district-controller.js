import DistrictService from '../service/district-service.js'

class DistrictController {
  static async get (req, res, next) {
    try {
      const result = await DistrictService.get(req.params.slug)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async gets (req, res, next) {
    try {
      const result = await DistrictService.gets(req.query)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }
}

export default DistrictController
