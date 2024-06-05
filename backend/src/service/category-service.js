import validate from '../validation/validate.js'
import CategoryValidation from '../validation/category-validation.js'
import database from '../application/database.js';
import ErrorResponse from '../error/error-response.js';

class CategoryService {
  static async get (slug) {
    const categoryRequest = validate(CategoryValidation.getCategoryValidation, slug)
    const category = await database.category.findUnique({
      where: {
        slug: categoryRequest
      },
      include: {
        _count: true,
        cultures: true,
        destinations: true
      }
    })
    if (!category) throw new ErrorResponse(404, 'category not found')
    return category
  }

  static async gets (query) {
    return database.category.findMany({
      where: {
        AND: [
          { name: { contains: query.name, mode: 'insensitive' } }
        ]
      },
      include: {
        _count: true,
        destinations: true,
        cultures: true
      }
    })
  }
}

export default CategoryService
