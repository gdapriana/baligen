import express from 'express'
import UserController from '../controller/user-controller.js'
import DestinationController from '../controller/destination-controller.js'
import CultureController from '../controller/culture-controller.js'

const publicRoute = express.Router()

publicRoute.get('/api', (req, res) => {
  res.status(200).sendFile(import.meta.dirname + '/view/index.html')
})

// TODO: user
publicRoute.post('/api/users/register', UserController.register)
publicRoute.post('/api/users/login', UserController.login)

// TODO: destination
publicRoute.get('/api/destinations/:slug', DestinationController.get)
publicRoute.get('/api/destinations', DestinationController.gets)

// TODO: culture
publicRoute.get('/api/cultures/:slug', CultureController.get)
publicRoute.get('/api/cultures', CultureController.gets)

export default publicRoute
