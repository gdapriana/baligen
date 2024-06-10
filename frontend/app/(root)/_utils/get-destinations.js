import {axiosInstance} from '@/lib/axios';

export const getDestinations = async (setLoading, setDestinations) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER}/destinations`)
    setDestinations(response.data.data)
    setLoading(false)
  } catch (error) {
    if (error.response) {
      return error.response.data.errors
    }
    console.log(error)
    setLoading(false)
  }
}
