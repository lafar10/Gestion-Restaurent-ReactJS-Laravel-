import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import { useStateContext } from '../../ContextProvider'
import swal from 'sweetalert'
import axiosClient from '../../AxiosClient'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'
import '../../assets/admin/js/datatables-simple-demo.js'



const MasterAdminPage = () => {

    const { user, token, setUser, setToken, role_as} = useStateContext()
    const navigate = useNavigate()

    if(!token)
    {
        swal({
            title: "Error",
            text: 'Login First !',
            icon: "error",
            button: "Ok",
        })
        return <Navigate to='/login' />
    }else
    {
        if(token && role_as === 'user')
        {
            swal({
                title: "Error",
                text: 'Your Not Admin ^-^ !',
                icon: "error",
                button: "Ok",
            })
            return <Navigate to='/home' />
        }
    }




    return (
        <div className='sb-nav-fixed'>
            <Navbar />

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">

                    <main>
                        <Outlet />
                    </main>

                    <Footer />
                </div>

            </div>

        </div>
    )
}

export default MasterAdminPage
