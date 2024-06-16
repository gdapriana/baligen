import {axiosInstance} from '@/lib/axios';

export const getDestination = async (setLoading, slug, setDestination) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER}/destinations/${slug}`)
    setDestination(response.data.data)
    setLoading(false)
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
    setLoading(false)
  }
}
