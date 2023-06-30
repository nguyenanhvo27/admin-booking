import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Box, Container, Typography, styled } from '@mui/material';
import Paper from '@mui/material/Paper';

// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import requireAuth from '../hocs/requireAuth';
import HotelCard from '../components/hotel/Card';

// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Hotels </title>
      </Helmet>

      <Container maxWidth>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Danh sách khách sạn
        </Typography>

        <ProductList products={[]} />
        <Box sx={{ flexGrow: 1 }}>
          <HotelCard />
        </Box>
      </Container>
    </>
  );
}

export default requireAuth(ProductsPage);
