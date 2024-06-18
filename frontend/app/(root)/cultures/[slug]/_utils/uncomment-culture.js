import { axiosInstance } from "@/lib/axios"

export const unCommentCulture = async (id, slug) => {
  const token = localStorage.getItem('token')
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_SERVER}/cultures/${slug}/uncomment`, { headers: { 'Authorization': `bearer ${token}` }, data: { id }})
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
  }
}
