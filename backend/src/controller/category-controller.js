import CategoryService from '../service/category-service.js';

class CategoryController {
  static async get (req, res, next) {
    try {
      const result = await CategoryService.get(req.params.slug)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async gets (req, res, next) {
    try {
      const result = await CategoryService.gets(req.query)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }
}

export default CategoryController
