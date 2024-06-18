import {axiosInstance} from '@/lib/axios';

export const getCulture = async (setLoading, slug, setCulture) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER}/cultures/${slug}`)
    setCulture(response.data.data)
    setLoading(false)
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
    setLoading(false)
  }
}
