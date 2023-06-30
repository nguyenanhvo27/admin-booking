import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRoomId } from '../api/room';

const RoomDetail = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['room', id],
    queryFn: async () => getRoomId(id),
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
            src={`${process.env.REACT_APP_ENDPOINT}/${query.data?.imgPath}`}
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
              Số phòng: <span className="text-blue-500">{query.data?.room_name}</span>
            </h1>
          </div>
        </div>
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <h4 className="my-2">
            <span className="font-semibold">Địa chỉ</span> : {query?.data?.__hotel__?.location}
          </h4>
          <h4 className="my-2">
            <span className="font-semibold">Tỉnh</span> : {query?.data?.__hotel__?.province}
          </h4>
          <h4 className="my-2">
            <span className="font-semibold">Giới hạn người</span> : {query?.data?.capacity}
          </h4>
          <h4 className="my-2">
            <span className="font-semibold">Loại phòng</span> : {query?.data?.facilities}
          </h4>
          <h4 className="my-2">
            <span className="font-semibold">Giá</span> : {query?.data?.prize} VNĐ
          </h4>
          <div className="mt-10">
            <h3 className="text-xl font-medium text-gray-900">Tiện ích cơ bản:</h3>

            <div className="my-4">
              {query?.isSuccess && (
                <ul className="list-disc space-y-2 pl-4 text-sm">
                  {query.data?.__roomType__?.AC && (
                    <li className="text-gray-400">
                      <div className="text-gray-600 flex justify-start items-center gap-3">Máy lạnh:</div>
                    </li>
                  )}

                  {query.data?.__roomType__?.heater && (
                    <li className="text-gray-400">
                      <div className="text-gray-600 flex justify-start items-center gap-3">Máy sửi:</div>
                    </li>
                  )}

                  {query.data?.__roomType__?.wifi && (
                    <li className="text-gray-400">
                      <div className="text-gray-600 flex justify-start items-center gap-3">Wifi:</div>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <p>
            <span className="font-semibold text-xl">Các tiện ích khác :</span>{' '}
            {query.data?.__roomType__?.other_facilities}
          </p>
          <h4 className="my-4 font-semibold text-xl">Thông tin chủ khách sạn:</h4>
          <ul className="list-disc space-y-2 pl-4 text-sm">
            <li className="text-gray-400">
              <div className="text-gray-600 flex justify-start items-center gap-2">
                <p className="font-semibold">Email :</p>
                <p>{query.data?.__hotel__?.__user__?.email}</p>
              </div>
            </li>
            <li className="text-gray-400">
              <div className="text-gray-600 flex justify-start items-center gap-2">
                <p className="font-semibold">Họ tên :</p>
                <p>
                  {query.data?.__hotel__?.__user__?.first_name} {query.data?.__hotel__?.__user__?.last_name}
                </p>
              </div>
            </li>
            <li className="text-gray-400">
              <div className="text-gray-600 flex justify-start items-center gap-2">
                <p className="font-semibold">Số điện thoại :</p>
                <p>{query.data?.__hotel__?.__user__?.phone_number}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
