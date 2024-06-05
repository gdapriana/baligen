import express from 'express'
import UserController from '../controller/user-controller.js'
import DestinationController from '../controller/destination-controller.js'
import CultureController from '../controller/culture-controller.js'

const publicRoute = express.Router()

publicRoute.get('/', (req, res) => {
  res.status(200).json({ data: 'hello from baligen ' })
})

// TODO: user
publicRoute.post('/users/register', UserController.register)
publicRoute.post('/users/login', UserController.login)

// TODO: destination
publicRoute.get('/destinations/:slug', DestinationController.get)
publicRoute.get('/destinations', DestinationController.gets)

// TODO: culture
publicRoute.get('/cultures/:slug', CultureController.get)
publicRoute.get('/cultures', CultureController.gets)

export default publicRoute
