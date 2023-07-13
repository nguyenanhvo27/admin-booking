import React from 'react';
import {
  Box,
  Container,
  TableHead,
  Typography,
  TableCell,
  Table,
  TableContainer,
  TableBody,
  TableRow,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ProductList } from '../sections/@dashboard/products';
import Room from '../components/hotel/Room';

import { getRoom, getRoomsByHotelId } from '../api/room';

const RoomPage = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['room', id],
    queryFn: async () => getRoomsByHotelId(id),
    keepPreviousData: true,
  });
  return (
    <>
      <Helmet>
        <title>Dashboard: Rooms</title>
      </Helmet>
      <Container maxWidth>
        {/* <TableContainer>
          <Table>
            <TableHead>
              <TableCell>TÊN TÀI KHOẢN CHỦ</TableCell>
              <TableCell>ĐỊA CHỈ</TableCell>
              <TableCell>SỐ ĐIỆN THOẠI CHỦ</TableCell>
              <TableCell>TỔNG SỐ PHÒNG</TableCell>
            </TableHead>
            <TableBody>
              {query.data?.rooms[0]?.map((room) => (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>{room.__hotel__.location}</TableCell>
                  <TableCell>{room.__hotel__.__user__.phone_number}</TableCell>
                  <TableCell>{query.data?.rooms[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <Typography variant="h4" sx={{ mb: 4 }}>
          Danh sách phòng
        </Typography>

        <ProductList products={[]} />
        <Box sx={{ flexGrow: 1 }}>
          <Room />
        </Box>
      </Container>
    </>
  );
};

export default RoomPage;
