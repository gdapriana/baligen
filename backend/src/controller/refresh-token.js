import jwt from 'jsonwebtoken'
import database from '../application/database.js';
import ErrorResponse from '../error/error-response.js';
import dotenv from 'dotenv'

dotenv.config()

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) throw new ErrorResponse(401, 'untauthorized')
    const user = await database.user.findUnique({
      where: {
        refresh_token: refreshToken
      }
    })

    if (!user) throw new ErrorResponse(403, 'forbiden')
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return ErrorResponse(403, 'forbiden')
      const id = user.id
      const username = user.username
      const name = user.name
      const accessToken = jwt.sign({ id, username, name }, process.env.JWT_SECRET, { expiresIn: '1d' })
      res.status(200).json({ accessToken })
    })
  } catch (error) {
    console.log(error)
  }
}

export default refreshToken
