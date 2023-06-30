import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography } from '@mui/material';
import { ProductList } from '../sections/@dashboard/products';
import RoomCart from '../components/room/RoomCart';

const RoomPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard: Rooms</title>
      </Helmet>
      <Container maxWidth>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Danh sách phòng đợi duyệt hoặc bị ẩn
        </Typography>
        <ProductList products={[]} />
        <Box sx={{ flexGrow: 1 }}>
          <RoomCart />
        </Box>
      </Container>
    </>
  );
};

export default RoomPage;
