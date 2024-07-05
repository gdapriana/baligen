import { Dispatch, SetStateAction } from "react";
import { userProps } from "./types";
import axios from "axios";

export const getUser = async (setLoading: boolean, setUser: Dispatch<SetStateAction<userProps>>) => {
  try {
    const response = await axios.get('http://localhost:3000/api/profile')
    return response.data;
  } catch (error) {
    console.log(error)
  }
}