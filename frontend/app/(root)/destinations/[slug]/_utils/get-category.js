import {axiosInstance} from '@/lib/axios';

export const getCategories = async (setLoading, setCategories) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER}/categories`)
    setCategories(response.data.data)
    setLoading(false)
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
    setLoading(false)
  }
}
