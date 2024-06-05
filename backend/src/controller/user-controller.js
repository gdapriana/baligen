import UserService from '../service/user-service.js'

class UserController {
  static async register (req, res, next) {
    try {
      const result = await UserService.register(req.body)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async login (req, res, next) {
    try {
      const result = await UserService.login(req.body, res)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async get (req, res, next) {
    try {
      const result = await UserService.get(req.username)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async update (req, res, next) {
    try {
      const result = await UserService.update(req.body, req.username)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }

  static async logout (req, res, next) {
    try {
      const result = await UserService.logout(req.username)
      res.status(200).json({ data: result })
    } catch (error) { next(error) }
  }
}

export default UserController
