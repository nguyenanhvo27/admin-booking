import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// @mui
import { Stack, Container, Typography, Button } from '@mui/material';
// components
import requireAuth from '../hocs/requireAuth';
import { getReservation } from '../api/reservation';
import RefundModal from '../components/modal/Refund';

const columns = [
  { id: 'note', label: 'Room No', maxWidth: 170 },
  { id: 'hotel_name', label: 'Khách sạn', minWidth: 100 },
  { id: 'location', label: 'Địa chỉ', minWidth: 100 },
  { id: 'guest_list', label: 'Số người', minWidth: 100 },
  { id: 'balance_amount', label: 'Số tiền', minWidth: 100 },
  { id: 'check_in', label: 'Check In', minWidth: 100 },
  {
    id: 'checkout',
    label: 'Checkout',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
  },
  {
    id: 'created_at',
    label: 'Ngày tạo',
    minWidth: 170,
  },
];

function ReservationPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const query = useQuery({
    queryKey: ['reservation'],
    queryFn: getReservation,
  });

  return (
    <>
      <Helmet>
        <title> Transaction | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={7}>
          <Typography variant="h4" gutterBottom>
            Danh sách đặt chỗ
          </Typography>
        </Stack>

        <Paper style={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ top: 57 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              {query?.isSuccess ? (
                query?.data.map((row) => {
                  return (
                    <TableBody key={row?.reservation_id}>
                      <TableCell>{row?.note}</TableCell>
                      <TableCell>{row?.__hotel__.hotel_name}</TableCell>
                      <TableCell>{row?.__hotel__.location}</TableCell>
                      <TableCell>{row?.guest_list}</TableCell>
                      <TableCell>
                        {Number(row?.balance_amount).toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </TableCell>

                      <TableCell>{`${new Date(row?.check_in).toLocaleDateString()} ${new Date(
                        row?.check_in
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>{`${new Date(row?.checkout).toLocaleDateString()} ${new Date(
                        row?.checkout
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>{`${new Date(row?.created_at).toLocaleDateString()} ${new Date(
                        row?.created_at
                      ).toLocaleTimeString()}`}</TableCell>
                      {/* <TableCell>
                        {row?.status === 'pending' && row?.____transactions____?.[0]?.status === 'paid' ? (
                          <RefundModal
                            transactionId={row?.____transactions____?.[0]?.transaction_id}
                            reservationId={row?.reservation_id}
                          />
                        ) : (
                          <></>
                        )}
                      </TableCell> */}
                      <TableCell key={row.reservation_id}>
                        <Link to={`/dashboard/ReservationDetail/${row.reservation_id}`}>
                          <Button variant="contained" color="secondary">
                            Chi tiết
                          </Button>
                        </Link>
                      </TableCell>
                    </TableBody>
                  );
                })
              ) : (
                <></>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}

export default requireAuth(ReservationPage);
