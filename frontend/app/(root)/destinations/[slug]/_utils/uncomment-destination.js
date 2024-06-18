import { axiosInstance } from "@/lib/axios"

export const unCommentDestination = async (id, slug) => {
  const token = localStorage.getItem('token')
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_SERVER}/destinations/${slug}/uncomment`, { headers: { 'Authorization': `bearer ${token}` }, data: { id }})
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
  }
}
