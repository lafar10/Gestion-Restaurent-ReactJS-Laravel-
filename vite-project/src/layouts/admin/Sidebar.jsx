import React from 'react'
import {Link, NavLink, Route } from 'react-router-dom'
import { BsBox, BsFillArrowLeftCircleFill, BsFillCalendar2DateFill, BsFillHouseDoorFill, BsFillPersonBadgeFill, BsFillPersonCheckFill, BsFillPersonDashFill, BsFillPersonFill, BsFillPersonXFill, BsSliders } from "react-icons/bs";

function Sidebar() {
    return (

            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <NavLink className="nav-link acive" to="/dashboard">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           <BsFillHouseDoorFill/> &nbsp;&nbsp; Dashboard
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            <BsFillPersonBadgeFill/> &nbsp;&nbsp; Users
                        </NavLink>
                        <NavLink className="nav-link" to="/reservations">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            <BsFillCalendar2DateFill /> &nbsp;&nbsp; Reservations
                        </NavLink>
                        <NavLink className="nav-link" to="/orders">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            <BsBox /> &nbsp;&nbsp; Orders
                        </NavLink>
                        <NavLink className="nav-link" to="/home">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            <BsFillArrowLeftCircleFill /> &nbsp;&nbsp; Back Home
                        </NavLink>
                    </div>
                </div>
                <div className="sb-sidenav-footer">

                </div>
            </nav>


    )
}

export default Sidebar
