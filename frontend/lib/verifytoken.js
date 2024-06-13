'use client'
import jwt from 'jsonwebtoken'

export const verifytoken = () => {
  const token = localStorage.getItem("token");
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
  if (token === null) return false
  try {
    const decoded = jwt.verify(token, secretKey)
    return true
  } catch (err) {
    return false
  }
}
