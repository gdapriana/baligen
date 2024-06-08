import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import publicRoute from '../route/public-route.js'
import authRoute from '../route/auth-route.js'
import errorMiddleware from '../middleware/error-middleware.js'

const whitelist = ['https://baligen.vercel.app', 'https://baligen-server.vercel.app', 'http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(publicRoute)
app.use(authRoute)
app.use(errorMiddleware)

export default app
