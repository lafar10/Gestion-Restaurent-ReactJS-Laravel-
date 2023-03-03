import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import { useStateContext } from '../../ContextProvider'
import swal from 'sweetalert'
import { BsFillHouseFill, BsFillPersonBadgeFill, BsFillPersonLinesFill, BsPersonCircle, BsPower } from 'react-icons/bs'
import logo from '../../assets/img/logos.png'

function HNavbar() {

    const { user, setUser, token, setToken } = useStateContext()

    const navigate = useNavigate()

  /*   if(!token)
    {
        navigate('/home')
    } */

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

    return (
        <nav className="navbar navbar-expand-lg bg-dark shadow-sm fixed-top">
            <div className="container">
                <button className="navbar-toggler border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white">Menu</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className="nav-item">
                        <Link to='/home' className='text-white text-decoration-none mt-4 ms-5'><img src={logo} style={{width:'160px',height:'85px'}} align="center" /></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mr-5">

                        <li className="nav-item">
                            <Link className="nav-link text-white tjhis" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white tjhis" to="/home/#doc">Our Meals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white tjhis" to="/#serv">Our Offers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white tjhis" to="/#about">Reservation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white tjhis" to="/#cont">Contact Us</Link>
                        </li>
                    </ul>
                    &nbsp;&nbsp;&nbsp;
                    {token ? <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <BsPersonCircle style={{ marginBottom: '4px' }} />  {localStorage.getItem('user_name')}</Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                               {localStorage.getItem('Role_As') === 'admin' ? <li><Link className="dropdown-item" to='/'><BsFillHouseFill style={{ marginBottom: '4px', color: 'GrayText' }} /> Dashboard</Link></li>: ''}
                                <li><Link className="dropdown-item" to='/my-profile'><BsFillPersonLinesFill style={{ marginBottom: '4px', color: 'GrayText' }} /> My Profile</Link></li>
                                <li><Link className="dropdown-item" to='/carte-promotion'><BsFillPersonBadgeFill style={{ marginBottom: '4px', color: 'GrayText' }} /> Promotion Carte</Link></li>
                                <li><button className="dropdown-item" onClick={logBtn}><BsPower style={{ marginBottom: '4px', color: 'red', marginRight: '5px' }} /> Logout</button></li>
                            </ul>
                        </li>
                    </ul> :
                        <form className="d-flex" >
                            <Link to="/login" className="btn btn-outline-warning">Login</Link>&nbsp;
                            <Link className="btn btn-outline-secondary text-white" to="/register">Register</Link>
                        </form>
                    }
                </div>

            </div>
        </nav>
    )
}

export default HNavbar
