import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getReservationById } from '../api/reservation';

const RoomDetail = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['reservation', id],
    queryFn: async () => getReservationById(id),
  });

  return (
    <>
      <Helmet>
        <title> DetailPage | Minimal UI </title>
      </Helmet>
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 sm:px-6 lg:gap-x-8 lg:px-8 w-9/12 h-[calc(40rem)]">
          <img
            src={`${process.env.REACT_APP_ENDPOINT}/${query.data?.__room__?.imgPath}`}
            alt={`${process.env.NEXT_PUBLIC_ENDPOINT}/${query.data?.imgPath}`}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tên khách sạn: <span className="text-blue-500">{query.data?.__hotel__?.hotel_name}</span>
            </h1>
          </div>
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
              Số phòng: <span className="text-blue-500">{query.data?.__room__?.room_name}</span>
            </h1>
          </div>
        </div>
        <div className=" flex py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div className="flex">
            <h4 className="my-2">
              <span className="font-normal">Địa chỉ</span> : {query?.data?.__hotel__?.location}
            </h4>
            <h4 className="my-2">
              <span className="font-normal">Tỉnh</span> : {query?.data?.__hotel__?.province}
            </h4>
            <h4 className="my-2">
              <span className="font-normal">Số người ở</span> : {query?.data?.guest_list}
            </h4>
            <h4 className="my-2">
              <span className="font-normal">Loại phòng</span> : {query?.data?.__room__?.facilities}
            </h4>
            <h4 className="my-2">
              <span className="font-normal">Giá</span> :{' '}
              {query?.data?.balance_amount &&
                Number(query?.data?.balance_amount).toLocaleString('IT', {
                  style: 'currency',
                  currency: 'VND',
                })}{' '}
            </h4>
            <h4 className=" flex my-2">
              <span className="font-normal">Trạng thái đặt phòng</span> :{' '}
              {query?.data?.status === 'pending' ? <p>Đợi duyệt</p> : <></>}
              {query?.data?.status === 'confirmed' ? <p>Đẫ duyệt</p> : <></>}
              {query?.data?.status === 'cancelled' ? <p>Đẫ hủy</p> : <></>}
              {query?.data?.status === 'completed' ? <p>Hoàn thành</p> : <></>}
            </h4>
          </div>
          <div className="flex">
            <h4 className="my-4 font-semibold text-xl">Thông tin người đặt phòng:</h4>
            <ul className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400">
                <div className="text-gray-600 flex justify-start items-center gap-2">
                  <p className="font-semibold">Email :</p>
                  <p>{query.data?.__user__?.email}</p>
                </div>
              </li>
              <li className="text-gray-400">
                <div className="text-gray-600 flex justify-start items-center gap-2">
                  <p className="font-semibold">Họ tên :</p>
                  <p>
                    {query.data?.__user__?.first_name} {query.data?.__user__?.last_name}
                  </p>
                </div>
              </li>
              <li className="text-gray-400">
                <div className="text-gray-600 flex justify-start items-center gap-2">
                  <p className="font-semibold">Số điện thoại :</p>
                  <p>{query.data?.__user__?.phone_number}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
