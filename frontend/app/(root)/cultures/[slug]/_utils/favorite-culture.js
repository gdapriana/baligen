import { axiosInstance } from "@/lib/axios"

export const favoriteCulture = async (slug) => {
  const token = localStorage.getItem('token')
  try {
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER}/cultures/${slug}/favorite`, {}, { headers: { 'Authorization': `bearer ${token}` }})
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
  }
}
