import { axiosInstance } from "@/lib/axios"

export const unFavoriteDestination = async (slug) => {
  const token = localStorage.getItem('token')
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_SERVER}/destinations/${slug}/unfavorite`, { headers: { 'Authorization': `bearer ${token}` }})
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
  }
}
