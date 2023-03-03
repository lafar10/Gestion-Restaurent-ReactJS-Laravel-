import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import swal from 'sweetalert'
import { BsAlarmFill, BsBell, BsClock, BsFillCalendar2Fill, BsFillCalendar2DateFill, BsFillPersonLinesFill, BsPersonCircle, BsPower, BsFillRecord2Fill, BsBox } from 'react-icons/bs'

function Navbar() {

    const [notifi, setNoti] = useState()

    const [userCount, setUserCount] = useState()
    const [reservationCount, setReservationCount] = useState()
    const [totalearn, setTotalEarn] = useState()
    const [loading, setLoading] = useState(false)


    const usersCount = () => {

        setLoading(true)

        axiosClient.get('/orders-count').then(res => {

            if (res.data.status === 200) {

                setUserCount(res.data.orders)
            }
            setLoading(false)

        })

    }

    const total_Earn = () => {

        setLoading(true)

        axiosClient.get('/orders-earns').then(res => {

            if (res.data.status === 200) {

                setTotalEarn(res.data.sums)
            }
            setLoading(false)

        })

    }

    const reservationsCount = () => {

        setLoading(true)

        axiosClient.get('/reservations-count').then(res => {

            if (res.data.status === 200) {
                setReservationCount(res.data.reservation)
            }
            setLoading(false)

        })

    }

    const all_noti = () => {

        axiosClient.get('/all-notification').then(res => {

            if (res.data.status === 200) {
                setNoti(res.data.noti)
            }

        })

    }

    useEffect(() => {

        reservationsCount()
        usersCount()
        total_Earn()
        all_noti()
    }, [])

    const logBtn = () => {

        /* axiosClient.get('/sanctum/csrf-cookie').then(res => {}) */
        axiosClient.post('/user-logout').then(res => {

            if (res.data.status === 200) {

                localStorage.removeItem('ACCESS_TOKEN')
                localStorage.removeItem('user_name')
                localStorage.removeItem('user_id')
                localStorage.removeItem('Role_As')
                history.go('/login')
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })


            }

        })

    }

    const a = localStorage.getItem('user_name')

    return (

        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

            <Link className="navbar-brand ps-3" to="/">LA10-Restaurent</Link>

            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></button>

            <ul className="navbar-nav ms-auto me-4">
                <li className='nav-item dropdown mt-2'><Link className=' text-white text-decoration-none' to='/user-profile'><BsPersonCircle style={{ marginBottom: '4px' }} color={'white'} /> {a}</Link> &nbsp;&nbsp;&nbsp;</li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">  <span className='badge bg-danger'>{notifi}</span> <BsBell /></Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to='/order-off'><BsBox style={{ marginBottom: '4px', color: 'GrayText' }} /> New Orders <span className='badge bg-danger'>{userCount}</span></Link></li>
                        <li><Link className="dropdown-item" to='/reservation-off'><BsFillCalendar2DateFill style={{ marginBottom: '4px', color: 'GrayText' }} /> New Reservations <span className='badge bg-danger'>{reservationCount}</span></Link></li>
                        <li><Link className="dropdown-item" to='/user-profile'><BsFillPersonLinesFill style={{ marginBottom: '4px', color: 'GrayText' }} /> My Profile</Link></li>
                        <li><button className="dropdown-item" onClick={logBtn}><BsPower style={{ marginBottom: '4px', color: 'red' }} /> Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar
