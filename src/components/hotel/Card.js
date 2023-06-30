import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import { GrView } from 'react-icons/gr';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getHotel } from '../../api/hotel';
import { getUser } from '../../api/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
export default function HotelCard() {
  const query = useQuery({
    queryKey: ['hotel'],
    queryFn: getHotel,
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell>No</TableCell>
          <TableCell>Hotelier</TableCell>
          <TableCell>Hotel Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Province</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Action</TableCell>
        </TableHead>
        <TableBody>
          {query.data?.map((hotel) => (
            <TableRow key={hotel.hotel_id}>
              <TableCell>{hotel.hotel_id}</TableCell>
              <TableCell>
                {hotel.__user__.first_name} {hotel.__user__.last_name}
              </TableCell>
              <TableCell>{hotel.hotel_name}</TableCell>
              <TableCell>
                <Img
                  sx={{ width: 300, height: 200 }}
                  src={`${process.env.REACT_APP_ENDPOINT}/${hotel.imgPath}`}
                  // key={hotel.hotel_id}
                  // onclick={async () => await handleOnClickHotel(hotel.hotel_id)}
                />
              </TableCell>
              <TableCell>{hotel.province}</TableCell>
              <TableCell>{hotel.location}</TableCell>
              <TableCell key={hotel.hotel_id}>
                <Link to={`/dashboard/hotel/${hotel.hotel_id}`}>
                  <IconButton aria-label="detail" size="large">
                    <GrView />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
