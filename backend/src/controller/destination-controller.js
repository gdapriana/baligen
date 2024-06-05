import DestinationService from '../service/destination-service.js'

class DestinationController {
  static async get (req, res, next) {
    try {
      const result = await DestinationService.get(req.params.slug)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async gets (req, res, next) {
    try {
      const result = await DestinationService.gets(req.query)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async favorite (req, res, next) {
    try {
      const result = await DestinationService.favorite(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async unfavorite (req, res, next) {
    try {
      const result = await DestinationService.unfavorite(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async comment (req, res, next) {
    try {
      const result = await DestinationService.comment(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async uncomment (req, res, next) {
    try {
      const result = await DestinationService.uncomment(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }
}

export default DestinationController
