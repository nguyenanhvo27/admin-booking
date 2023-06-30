import { axiosInstance } from '../utils/axios';

export const getReservation = async () => {
  try {
    const response = await axiosInstance.get('/reservation/admin');

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateReservation = async (reservationId) => {
  try {
    const response = await axiosInstance.patch(`/reservation/${reservationId}`);

    return response.data;
  } catch (error) {
    throw new Error('Update reservation fail!');
  }
};
export const getReservationById = async (id) => {
  try {
    const response = await axiosInstance.get(`/reservation/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Update reservation fail!');
  }
};
