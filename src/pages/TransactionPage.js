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

// @mui
import { Stack, Button, Popover, MenuItem, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

import requireAuth from '../hocs/requireAuth';
import { getHotelierTransaction } from '../api/hotelierTransaction';

const columns = [
  { id: 'transaction_id', label: 'Mã', minWidth: 170 },
  {
    id: 'hotelier',
    label: 'TÊN KHÁCH SẠN',
    minWidth: 170,
  },
  { id: 'amount', label: 'SỐ TIỀN', minWidth: 100 },
  {
    id: 'status',
    label: 'TRẠNG THÁI',
    minWidth: 170,
  },
  {
    id: 'created_at',
    label: 'NGÀY THANH TOÁN ',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'XEM CHI TIẾT',
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

function TransactionPage() {
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
    queryKey: ['hotelierTransaction'],
    queryFn: getHotelierTransaction,
  });
  console.log(query.data?.[0]?.hotelier_transaction_id, 'qua');

  return (
    <>
      <Helmet>
        <title> Transaction | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách thanh toán
          </Typography>
        </Stack>

        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableBody key={query.data?.[0]?.hotelier_transaction_id}>
                <TableCell>{query.data?.[0]?.hotelier_transaction_id}</TableCell>
                <TableCell>{query.data?.[0]?.__hotel__.hotel_name} </TableCell>
                <TableCell>
                  {!Number.isNaN(query.data?.[0]?.total) &&
                    Number(query.data?.[0]?.total).toLocaleString('IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                </TableCell>
                {query.data?.[0]?.status === 'unpaid' ? (
                  <TableCell>Chưa thanh toán</TableCell>
                ) : (
                  <TableCell>ĐÃ thanh toán</TableCell>
                )}
                <TableCell>{`${new Date(query.data?.[0]?.created_at).toLocaleDateString()} ${new Date(
                  query.data?.[0]?.created_at
                ).toLocaleTimeString()}`}</TableCell>
                <TableCell>Xem chi tiết</TableCell>
              </TableBody>
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

export default requireAuth(TransactionPage);
