import {axiosInstance} from '@/lib/axios';

export const getUser = async () => {
  const token = localStorage.getItem('token')
  const user = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER}/users/current`, { headers: { Authorization: `bearer ${token}` } })
  return user.data.data
}
