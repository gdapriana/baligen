import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import publicRoute from '../route/public-route.js'
import authRoute from '../route/auth-route.js'
import errorMiddleware from '../middleware/error-middleware.js'

const corsOptions = {
  origin: ['http://baligen.vercel.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200 // For legacy browser support
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(publicRoute)
app.use(authRoute)
app.use(errorMiddleware)

export default app
