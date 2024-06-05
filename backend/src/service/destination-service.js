import validate from '../validation/validate.js'
import DestinationValidation from '../validation/destination-validation.js'
import database from '../application/database.js'
import ErrorResponse from '../error/error-response.js'

class DestinationService {
  static async get (slug) {
    const slugRequest = validate(DestinationValidation.getDestinationValidation, slug)
    const destination = await database.destination.findUnique({
      where: {
        slug: slugRequest
      },
      include: {
        commentedByUsers: {
          include: {
            user: {
              select: {
                username: true,
                profilePicture: true
              }
            },
            childs: true
          }
        },
        category: true,
        district: true,
        favoritedByUsers: true,
        images: true,
        _count: true,
        ratedByUsers: true
      }
    })
    if (!destination) throw new ErrorResponse(404, 'destination not found')
    return destination
  }

  static async gets (query) {
    return database.destination.findMany({
      where: {
        AND: [
          { name: { contains: query.name, mode: 'insensitive' } },
          { categorySlug: { contains: query.category, mode: 'insensitive' } },
          { districtSlug: { contains: query.district, mode: 'insensitive' } }
        ]
      },
      include: {
        category: true,
        district: true
      }
    })
  }

  static async favorite (req) {
    const favoriteRequest = validate(DestinationValidation.favoriteDestinationValidation, { username: req.username, destinationSlug: req.params.slug })
    const destination = await database.destination.findUnique({
      where: {
        slug: favoriteRequest.destinationSlug
      }
    })
    if (!destination) throw new ErrorResponse(404, 'destination not found')
    return database.usersFavoriteDestinations.create({
      data: {
        destinationSlug: favoriteRequest.destinationSlug,
        username: favoriteRequest.username
      },
      select: {
        destination: true
      }
    })
  }

  static async unfavorite (req) {
    const favoriteRequest = validate(DestinationValidation.unFavoriteDestinationValidation, { username: req.username, destinationSlug: req.params.slug })
    const isFavorited = await database.usersFavoriteDestinations.findUnique({
      where: {
        username_destinationSlug: {
          username: favoriteRequest.username,
          destinationSlug: favoriteRequest.destinationSlug
        }
      }
    })
    if (!isFavorited) throw new ErrorResponse(404, 'you are not favorited yet')
    return database.usersFavoriteDestinations.delete({
      where: {
        username_destinationSlug: {
          username: favoriteRequest.username,
          destinationSlug: favoriteRequest.destinationSlug
        }
      },
      select: {
        destination: true
      }
    })
  }

  static async comment (req) {
    const commentRequest = validate(DestinationValidation.commentDestinationValidation,
      { parentId: req.body.parentId, username: req.username, destinationSlug: req.params.slug, body: req.body.body })

    const destination = await database.destination.findUnique({
      where: {
        slug: commentRequest.destinationSlug
      }
    })
    if (!destination) throw new ErrorResponse(404, 'destination not found')

    if (commentRequest.parentId) {
      const comment = await database.usersCommentDestinations.findUnique({
        where: {
          id: commentRequest.parentId
        }
      })
      if (!comment) throw new ErrorResponse(404, 'comment not found')
    }

    return database.usersCommentDestinations.create({
      data: {
        parentId: commentRequest.parentId,
        body: commentRequest.body,
        username: commentRequest.username,
        destinationSlug: commentRequest.destinationSlug
      },
      select: {
        id: true
      }
    })
  }

  static async uncomment (req) {
    const commentRequest = validate(
      DestinationValidation.unCommentDestinationValidation,
      { id: req.body.id, username: req.username, destinationSlug: req.params.slug }
    )
    const destination = await database.destination.findUnique({
      where: {
        slug: commentRequest.destinationSlug
      }
    })
    if (!destination) throw new ErrorResponse(404, 'destination not found')
    const comment = await database.usersCommentDestinations.findUnique({
      where: {
        id: commentRequest.id
      },
      include: {
        user: true
      }
    })
    if (!comment) throw new ErrorResponse(404, 'comment not found')
    if (comment.user.username !== commentRequest.username) throw new ErrorResponse(401, 'unauthenticated')
    return database.usersCommentDestinations.delete({
      where: {
        id: commentRequest.id
      },
      select: {
        id: true
      }
    })
  }
}

export default DestinationService
