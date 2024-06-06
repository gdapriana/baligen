import express from 'express'
import UserController from '../controller/user-controller.js'
import DestinationController from '../controller/destination-controller.js'
import CultureController from '../controller/culture-controller.js'
import CategoryController from '../controller/category-controller.js';
import DistrictController from '../controller/district-controller.js';

const publicRoute = express.Router()

publicRoute.get('/', (req, res) => {
  res.status(200).json({ data: 'hello from baligen server', documentation: 'https://github.com/gdapriana/baligen/blob/main/backend/README.md' })
})

publicRoute.post('/users/register', UserController.register)
publicRoute.post('/users/login', UserController.login)

publicRoute.get('/destinations/:slug', DestinationController.get)
publicRoute.get('/destinations', DestinationController.gets)

publicRoute.get('/cultures/:slug', CultureController.get)
publicRoute.get('/cultures', CultureController.gets)

publicRoute.get('/categories/:slug', CategoryController.get)
publicRoute.get('/categories', CategoryController.gets)

publicRoute.get('/districts/:slug', DistrictController.get)
publicRoute.get('/districts', DistrictController.gets)

export default publicRoute
