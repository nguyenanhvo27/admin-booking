import { axiosInstance } from '../utils/axios';

export const getRoomId = async (id) => {
  if (!id) {
    throw new Error('Not Found Hotel ID');
  }
  try {
    const response = await axiosInstance.get(`/room/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
};
export const getRoom = async () => {
  try {
    const response = await axiosInstance.get('/room/admin/getRoom');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/room/updateStatus/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const hideRoom = async (id) => {
  try {
    const response = await axiosInstance.put(`/room/hideRoom/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getRoomsByHotelId = async (id) => {
  if (!id) {
    throw new Error('Not Found Hotel ID');
  }
  try {
    const response = await axiosInstance.get(`/room/byHotel/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
};
