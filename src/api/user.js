import { axiosInstance } from '../utils/axios';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
