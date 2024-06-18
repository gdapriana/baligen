import { axiosInstance } from "@/lib/axios"

export const commentDestination = async (body, slug) => {
  const token = localStorage.getItem('token')
  try {
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER}/destinations/${slug}/comment`, body, { headers: { 'Authorization': `bearer ${token}` }})
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
  }
}
