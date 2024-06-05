import validate from '../validation/validate.js'
import CultureValidation from '../validation/culture-validation.js'
import database from '../application/database.js'
import ErrorResponse from '../error/error-response.js'

class CultureService {
  static async get (slug) {
    const cultureRequest = validate(CultureValidation.getCultureValidation, slug)
    const culture = await database.culture.findUnique({
      where: {
        slug: cultureRequest
      },
      include: {
        _count: true,
        category: true,
        commentedByUsers: true,
        district: true,
        images: true,
        favoritedByUsers: true
      }
    })
    if (!culture) throw new ErrorResponse(404, 'culture not found')
    return culture
  }

  static async gets (query) {
    return database.culture.findMany({
      where: {
        AND: [
          { name: { contains: query.name, mode: 'insensitive' } },
          { address: { contains: query.address, mode: 'insensitive' } },
          { categorySlug: { contains: query.category, mode: 'insensitive' } },
          { districtSlug: { contains: query.district, mode: 'insensitive' } }
        ]
      },
      include: {
        district: true,
        _count: true,
        category: true,
        commentedByUsers: true,
        favoritedByUsers: true
      }
    })
  }

  static async favorite (req) {
    const cultureRequest = validate(CultureValidation.favoriteCultureValidation, { username: req.username, cultureSlug: req.params.slug })
    const culture = await database.culture.findUnique({
      where: {
        slug: cultureRequest.cultureSlug
      }
    })
    if (!culture) throw new ErrorResponse(404, 'culture not found')
    return database.usersFavoriteCultures.create({
      data: {
        cultureSlug: cultureRequest.cultureSlug,
        username: cultureRequest.username
      },
      select: {
        culture: true
      }
    })
  }

  static async unfavorite (req) {
    const favoriteRequest = validate(CultureValidation.unFavoriteCultureValidation, { username: req.username, cultureSlug: req.params.slug })
    const isFavorited = await database.usersFavoriteCultures.findUnique({
      where: {
        username_cultureSlug: {
          username: favoriteRequest.username,
          cultureSlug: favoriteRequest.cultureSlug
        }
      }
    })
    if (!isFavorited) throw new ErrorResponse(404, 'you are not favorited yet')
    return database.usersFavoriteCultures.delete({
      where: {
        username_cultureSlug: {
          username: favoriteRequest.username,
          cultureSlug: favoriteRequest.cultureSlug
        }
      },
      select: {
        culture: true
      }
    })
  }

  static async comment (req) {
    const commentRequest = validate(CultureValidation.commentCultureValidation,
      { parentId: req.body.parentId, username: req.username, cultureSlug: req.params.slug, body: req.body.body })
    const culture = await database.culture.findUnique({
      where: {
        slug: commentRequest.cultureSlug
      }
    })
    if (!culture) throw new ErrorResponse(404, 'culture not found')
    if (commentRequest.parentId) {
      const comment = await database.usersCommentCultures.findUnique({
        where: {
          id: commentRequest.parentId
        }
      })
      if (!comment) throw new ErrorResponse(404, 'comment not found')
    }
    return database.usersCommentCultures.create({
      data: {
        parentId: commentRequest.parentId,
        body: commentRequest.body,
        username: commentRequest.username,
        cultureSlug: commentRequest.cultureSlug
      },
      select: {
        id: true
      }
    })
  }

  static async uncomment (req) {
    const commentRequest = validate(
      CultureValidation.unCommentCultureValidation,
      { id: req.body.id, username: req.username, cultureSlug: req.params.slug }
    )
    const culture = await database.culture.findUnique({
      where: {
        slug: commentRequest.cultureSlug
      }
    })
    if (!culture) throw new ErrorResponse(404, 'culture not found')
    const comment = await database.usersCommentCultures.findUnique({
      where: {
        id: commentRequest.id
      },
      include: {
        user: true
      }
    })
    if (!comment) throw new ErrorResponse(404, 'comment not found')
    if (comment.user.username !== commentRequest.username) throw new ErrorResponse(401, 'unauthenticated')
    return database.usersCommentCultures.delete({
      where: {
        id: commentRequest.id
      },
      select: {
        id: true
      }
    })
  }
}

export default CultureService
