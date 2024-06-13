import validate from '../validation/validate.js'
import UserValidation from '../validation/user-validation.js'
import database from '../application/database.js'
import ErrorResponse from '../error/error-response.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class UserService {
  static async register (request) {
    const userRequest = validate(UserValidation.registerUserValidation, request)
    const findUniqueUsername = await database.user.count({
      where: {
        username: userRequest.username
      }
    })
    if (findUniqueUsername !== 0) throw new ErrorResponse(400, 'username already taken')
    userRequest.password = await bcrypt.hash(userRequest.password, 10)
    return database.user.create({
      data: userRequest,
      select: { username: true, name: true }
    })
  }

  static async login (request, response) {
    const userRequest = validate(UserValidation.loginUserValidation, request)
    const user = await database.user.findUnique({
      where: { username: userRequest.username }
    })
    if (!user) throw new ErrorResponse(401, 'wrong username or password')
    if (!await bcrypt.compare(userRequest.password, user.password)) throw new ErrorResponse(401, 'wrong username or password')

    const accessToken = jwt.sign({
      id: user.id,
      username: userRequest.username,
      name: user.name
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    const refreshToken = jwt.sign({
      id: user.id,
      username: userRequest.username,
      name: user.name
    }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

    await database.user.update({
      data: { refresh_token: refreshToken },
      where: { username: userRequest.username }
    })

    response.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    return { accessToken }
  }

  static async get (username) {
    const usernameRequest = validate(UserValidation.getUserValidation, username)
    const user = await database.user.findUnique({
      where: {
        username: usernameRequest
      },
      include: {
        _count: true,
        favoritedCultures: {
          include: {
            culture: {
              include: {
                category: true,
                district: true
              }
            }
          }
        },
        favoritedDestinations: {
          include: {
            destination: {
              include: {
                category: true,
                district: true
              }
            }
          }
        },
        ratedDestinations: true,
        favoritedStories: true,
        stories: true
      }
    })
    if (!user) throw new ErrorResponse(404, 'user not found')
    const exclude = (user, keys) => {
      return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
      )
    }
    return exclude(user, ['password', 'refresh_token', 'role'])
  }

  static async update (request, username) {
    const userRequest = validate(UserValidation.updateUserValidation, request)

    const user = await database.user.findUnique({
      where: {
        username
      }
    })

    if (!user) throw new ErrorResponse(404, 'user not found')

    return database.user.update({
      where: {
        username
      },
      data: userRequest,
      select: { username: true }
    })
  }

  static async logout (username) {
    const usernameRequest = validate(UserValidation.logoutUserValidation, username)
    const user = await database.user.findUnique({
      where: {
        username: usernameRequest
      }
    })
    if (!user) throw new ErrorResponse(404, 'user not found')
    return database.user.update({
      where: {
        username: usernameRequest
      },
      data: {
        refresh_token: null
      },
      select: {
        username: true
      }
    })
  }
}

export default UserService
