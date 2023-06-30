import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getRoomsByHotelId, hideRoom, updateStatus } from '../../api/room';

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
export default function Rooms() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const query = useQuery({
    queryKey: ['room-hotel', id],
    queryFn: async () => getRoomsByHotelId(id),
    keepPreviousData: true,
  });

  const updateStatusRoom = useMutation({
    mutationFn: (id) => updateStatus(id),
    onSuccess: (_, id) => {
      window.location.reload(true);
      toast.success('update thanh cong');
      queryClient.invalidateQueries({ queryKey: ['room'] });
    },
  });

  const hideRooms = useMutation({
    mutationFn: (id) => hideRoom(id),
    onSuccess: (_, id) => {
      window.location.reload(true);
      toast.success('Ẩn thành công');
      queryClient.invalidateQueries({ queryKey: ['room'] });
    },
  });

  const handleUpdateStatus = (id) => {
    updateStatusRoom.mutate(id);
  };
  const handleHideRoom = (id) => {
    hideRooms.mutate(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell>No</TableCell>
          <TableCell>TÊN PHÒNG</TableCell>
          <TableCell>HÌNH ẢNH</TableCell>
          <TableCell>SỨC CHỨA</TableCell>
          <TableCell>GIÁ</TableCell>
          <TableCell>LOẠI PHÒNG</TableCell>
          <TableCell>TRẠNG THÁI</TableCell>
          <TableCell>DUYỆT</TableCell>
          <TableCell>XEM CHI TIẾT</TableCell>
        </TableHead>
        <TableBody>
          {query.data?.rooms[0]?.map((room) => (
            <TableRow>
              <TableCell>{room.room_id}</TableCell>
              <TableCell>{room.room_name}</TableCell>
              <TableCell align="center">
                <Img
                  sx={{ width: 300, height: 200 }}
                  src={`${process.env.REACT_APP_ENDPOINT}/${room.imgPath}`}
                  key={room.room_id}
                />
              </TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.prize}</TableCell>
              <TableCell>{room.facilities}</TableCell>
              <TableCell color="success">{room.status}</TableCell>
              <TableCell key={room.room_id}>
                {room.status === 'concealed' ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      if (window.confirm('Hiển thị phòng này lên trang web?')) {
                        handleUpdateStatus(room.room_id);
                      }
                    }}
                  >
                    Hiển thị
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      if (window.confirm('Ẩn phòng này ở trang web?')) {
                        handleHideRoom(room.room_id);
                      }
                    }}
                  >
                    Ẩn phòng
                  </Button>
                )}
              </TableCell>
              <TableCell key={room.room_id}>
                <Link to={`/dashboard/detail/${room.room_id}`}>
                  <Button variant="contained" color="secondary">
                    Xem chi tiết
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
