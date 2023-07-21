import { axiosInstance } from '../utils/axios';

export const getHotelierTransaction = async () => {
  try {
    const response = await axiosInstance.get('/hotelier_transaction/getHotelierTransaction');

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
