import express from 'express'
import authMiddleware from '../middleware/auth-middleware.js'
import UserController from '../controller/user-controller.js'
import DestinationController from '../controller/destination-controller.js'
import CultureController from '../controller/culture-controller.js'

const authRoute = express.Router()
authRoute.use(authMiddleware)

// TODO: user
authRoute.get('/users/current', UserController.get)
authRoute.patch('/users/current', UserController.update)
authRoute.delete('/users/current', UserController.logout)

// TODO: destination
authRoute.post('/destinations/:slug/favorite', DestinationController.favorite)
authRoute.delete('/destinations/:slug/unfavorite', DestinationController.unfavorite)
authRoute.post('/destinations/:slug/comment', DestinationController.comment)
authRoute.delete('/destinations/:slug/uncomment', DestinationController.uncomment)

// TODO: culture
authRoute.post('/cultures/:slug/favorite', CultureController.favorite)
authRoute.delete('/cultures/:slug/unfavorite', CultureController.unfavorite)
authRoute.post('/cultures/:slug/comment', CultureController.comment)
authRoute.delete('/cultures/:slug/uncomment', CultureController.uncomment)

export default authRoute
