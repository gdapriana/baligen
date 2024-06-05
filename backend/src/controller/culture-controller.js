import CultureService from '../service/culture-service.js'

class CultureController {
  static async get (req, res, next) {
    try {
      const result = await CultureService.get(req.params.slug)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async gets (req, res, next) {
    try {
      const result = await CultureService.gets(req.query)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async favorite (req, res, next) {
    try {
      const result = await CultureService.favorite(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async unfavorite (req, res, next) {
    try {
      const result = await CultureService.unfavorite(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async comment (req, res, next) {
    try {
      const result = await CultureService.comment(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async uncomment (req, res, next) {
    try {
      const result = await CultureService.uncomment(req)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }
}

export default CultureController
