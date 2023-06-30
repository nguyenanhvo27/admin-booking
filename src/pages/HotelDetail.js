import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Typography } from '@mui/material';
import { ProductList } from '../sections/@dashboard/products';
import Room from '../components/hotel/Room';
import { getRoom } from '../api/room';

const RoomPage = () => {
  const query = useQuery({
    queryKey: ['room'],
    queryFn: getRoom,
    keepPreviousData: true,
  });
  return (
    <>
      <Helmet>
        <title>Dashboard: Rooms</title>
      </Helmet>
      <Container maxWidth>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Danh sách phòng của khách sạn <p>{query?.data?.hotel?.hotel_name}</p>
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
