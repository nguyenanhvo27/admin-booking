import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { toast } from 'react-toastify';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, blockUser, unBlockUser } from '../api/user';
// components
import Label from '../components/label';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import requireAuth from '../hocs/requireAuth';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user_id', label: 'ID', alignRight: false },
  { id: 'first_name', label: 'First Name', alignRight: false },
  { id: 'last_name', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone_number', label: 'Phone', alignRight: false },
  { id: 'location', label: 'location', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '', label: 'Action' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(data, comparator, query) {
//   const stabilizedThis = query.data?.map((user) => [user.last_name]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   console.log(query);
//   if (query) {
//     return filter(data, (user) => user.last_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('last_name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (id) => blockUser(id),
    onSuccess: (_, id) => {
      toast.success('Chặn thành công');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError(error) {
      toast.error(`${error}`);
    },
  });

  const unlockUser = useMutation({
    mutationFn: (id) => unBlockUser(id),
    onSuccess: (_, id) => {
      toast.success('Bỏ chặn thành công');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError(error) {
      toast.error(`${error}`);
    },
  });
  const handleBlock = (id) => {
    mutate.mutate(id);
  };
  const handleUnblock = (id) => {
    unlockUser.mutate(id);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = getUser.map((n) => n.last_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getUser.length) : 0;
  // const filteredUsers = applySortFilter(getUser, getComparator(order, orderBy), filterName);

  // const isNotFound = !filteredUsers.length && !!filterName;
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  console.log(query);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          {/* numSelected={selected.length} */}
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={getUser.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {query.data?.map((user) => {
                    // const { user_id, first_name, last_name, email, phone_number, location, role } = user;
                    // const selectedUser = selected.indexOf(last_name) !== -1;

                    return (
                      <TableRow hover key={user.user_id}>
                        {/* <TableCell>
                          <CheckBox />
                        </TableCell> */}
                        <TableCell align="left">
                          <Avatar src={`${process.env.REACT_APP_ENDPOINT}/${user.imgPath}`} />
                        </TableCell>
                        <TableCell align="left">{user.user_id}</TableCell>
                        <TableCell align="left">{user.first_name}</TableCell>

                        <TableCell align="left">{user.last_name}</TableCell>

                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.phone_number}</TableCell>
                        <TableCell align="left">{user.location}</TableCell>
                        <TableCell align="left">{user.role}</TableCell>
                        <TableCell>
                          {user.role === 'user' ? (
                            <TableCell align="right" key={user.user_id}>
                              <Button variant="outlined" color="error" onClick={() => handleBlock(user.user_id)}>
                                Chặn
                              </Button>
                            </TableCell>
                          ) : (
                            <></>
                          )}
                          {user.status === 'block' ? (
                            <TableCell align="right" key={user.user_id}>
                              <Button variant="outlined" color="success" onClick={() => handleUnblock(user.user_id)}>
                                gỡ chặn
                              </Button>
                            </TableCell>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={getUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

export default requireAuth(UserPage);
