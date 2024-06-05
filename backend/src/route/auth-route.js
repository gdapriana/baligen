import express from 'express'
import authMiddleware from '../middleware/auth-middleware.js'
import UserController from '../controller/user-controller.js'
import DestinationController from '../controller/destination-controller.js'
import CultureController from '../controller/culture-controller.js'

const authRoute = express.Router()
authRoute.use(authMiddleware)

// TODO: user
authRoute.get('/api/users/current', UserController.get)
authRoute.patch('/api/users/current', UserController.update)
authRoute.delete('/api/users/current', UserController.logout)

// TODO: destination
authRoute.post('/api/destinations/:slug/favorite', DestinationController.favorite)
authRoute.delete('/api/destinations/:slug/unfavorite', DestinationController.unfavorite)
authRoute.post('/api/destinations/:slug/comment', DestinationController.comment)
authRoute.delete('/api/destinations/:slug/uncomment', DestinationController.uncomment)

// TODO: culture
authRoute.post('/api/cultures/:slug/favorite', CultureController.favorite)
authRoute.delete('/api/cultures/:slug/unfavorite', CultureController.unfavorite)
authRoute.post('/api/cultures/:slug/comment', CultureController.comment)
authRoute.delete('/api/cultures/:slug/uncomment', CultureController.uncomment)

export default authRoute
