import { memo } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HotelPage from './pages/HotelPage';
import DashboardAppPage from './pages/DashboardAppPage';
import TransactionPage from './pages/TransactionPage';
import ReservationPage from './pages/ReservationPage';
import RoomPage from './pages/RoomPage';
import RoomDetail from './pages/RoomDetail';
import HotelDetail from './pages/HotelDetail';
import ReservationDetail from './pages/ReservationDetail';

// ----------------------------------------------------------------------

function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: 'app',
          element: <DashboardAppPage />,
        },
        {
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'hotel',
          element: <HotelPage />,
        },
        {
          path: 'blog',
          element: <BlogPage />,
        },
        {
          path: 'transaction',
          element: <TransactionPage />,
        },
        {
          path: 'reservation',
          element: <ReservationPage />,
        },
        {
          path: 'room',
          element: <RoomPage />,
        },
        {
          path: 'detail/:id',
          element: <RoomDetail />,
        },
        {
          path: 'hotel/:id',
          element: <HotelDetail />,
        },
        {
          path: 'reservationDetail/:id',
          element: <ReservationDetail />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export default memo(Router);
