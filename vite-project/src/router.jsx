import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from './components/adminA/Dashboard.jsx'
import Users from "./components/adminA/user/Users.jsx";
import Reservations from "./components/adminA/reservation/Reservations.jsx";
import MasterAdminPage from "./layouts/admin/MasterAdminPage";
import NotFound from "./layouts/admin/NotFound.jsx";
import Login from "./components/front/Login.jsx";
import Register from "./components/front/Register.jsx";
import Unauthorized from "./layouts/admin/Unauthorized.jsx";
import Home from "./components/front/Home";
import AddUser from "./components/adminA/AddUser.jsx";
import UpdateUser from "./components/adminA/UpdateUser.jsx";
import AddReservation from "./components/adminA/reservation/AddReservation.jsx";
import UpdateReservation from "./components/adminA/reservation/UpdateReservation.jsx";
import UserProfil from "./components/adminA/user/UserProfil.jsx";
import ChangePassword from "./components/adminA/user/ChangePassword.jsx";
import MyProfile from "./components/front/MyProfile.jsx";
import Orders from "./components/adminA/orders/Orders.jsx";
import AddOrder from "./components/adminA/orders/AddOrder.jsx";
import OrderUpdateComponent from "./components/adminA/orders/OrderUpdateComponent.jsx";
import ExampleTest from "./components/adminA/user/ExampleTest.jsx";
import CartePromotion from "./components/front/CartePromotion.jsx";
import OrderPassTac from "./components/front/OrderPassTac.jsx";
import OrderPass from "./components/front/OrderPass.jsx";
import OrderPassSha from "./components/front/OrderPassSha.jsx";
import OrderFacture from "./components/adminA/orders/OrderFacture.jsx";
import GetOffOrders from "./components/adminA/orders/GetOffOrders.jsx";
import GetOffReservation from "./components/adminA/reservation/GetOffReservation.jsx";


const router = createBrowserRouter([

    {
        path: '/',
        element: <MasterAdminPage />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                /* Users Routes */

                path: '/users',
                element: <Users />,
            },
            {
                path: '/add-user',
                element: <AddUser />,
            },
            {
                path: '/edit-user/:id',
                element: <UpdateUser />,
            },
            {
                /* Reservations Routes */

                path: '/reservations',
                element: <Reservations />,
            },
            {
                path: '/add-reservation',
                element: <AddReservation />,
            },
            {
                path: '/edit-reservation/:id',
                element: <UpdateReservation />,
            },
            {
                path: '/reservation-off',
                element: <GetOffReservation />,
            },
            {
                /* User Profile Routes */

                path: '/user-profile',
                element: <UserProfil />,
            },
            {
                path: '/change-password',
                element: <ChangePassword />,
            },
            {
                /* Orders Routes */

                path: '/orders',
                element: <Orders/>,
            },
            {
                path: '/add-order',
                element: <AddOrder />,
            },
            {
                path: '/edit-order/:id',
                element: <OrderUpdateComponent />,
            },
            {
                path: '/order-off',
                element: <GetOffOrders />,
            },
        ]
    },
    {
        /* ----- Auth Routes ------ */
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },

    {
        /* ------ Home Session Routes ------ */
        path: '/home',
        element: <Home />,
    },
    {
        path: '/my-profile/',
        element: <MyProfile />,
    },
    {
        path: '/change-password-user',
        element: <ChangePassword />,
    },
    {
        path: '/carte-promotion',
        element: <CartePromotion />,
    },
    {
        path:'/pass-order',
        element: <OrderPass/>
    },
    {
        path:'/pass-order-sha',
        element: <OrderPassSha />
    },
    {
        path:'/pass-order-tac',
        element: <OrderPassTac />
    },
    {
        path:'/facture-order/:id',
        element: <OrderFacture />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />
    }

]);


export default router;
