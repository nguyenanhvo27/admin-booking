import { axiosInstance } from '../utils/axios';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const blockUser = async (id) => {
  try {
    const response = await axiosInstance.put(`/user/blockUser/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const unBlockUser = async (id) => {
  try {
    const response = await axiosInstance.put(`/user/unBlockUser/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
