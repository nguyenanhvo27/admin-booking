import { axiosInstance } from '../utils/axios';

export const getHotel = async () => {
  try {
    const response = await axiosInstance.get('/hotel');
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
