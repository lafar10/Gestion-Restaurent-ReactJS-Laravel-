import React from 'react'
import { Link } from 'react-router-dom'
import Tac from '../../assets/img/tacos.jpg'
import piza from '../../assets/img/piz.jpg'
import shawa from '../../assets/img/shawa.jpg'


const OOffers = () => {
    return (
        <div className='container'>
            <br />
            <br />
            <div align="center" id="contact">
                <h1 className='display-5 text-center'>Our Offers</h1>
                <hr className='text-center' style={{ width: '150px', height: '3px' }} align="center" />
                <br />
            </div>

            <div className='row g-3 col-lg-12' align='center'>
                <div className='col-lg-4'>
                    <Link to='/pass-order-tac' className='text-decoration-none'>
                        <div className='card shadow-sm animated fadeInDown'>
                            <div className='card-header bg-dark text-white'>
                                <h3 className='display-6' style={{ fontSize: '33px' }}>Tacos Poulet</h3>
                            </div>
                            <div className='card-body'>
                                <div className='text center'>
                                    <img src={Tac} style={{ height: '110px', width: '80%' }} />
                                    <br /><br />
                                    <h6 className='text-dark'>Poulet + Frit</h6>
                                    <h6 className='text-dark'>Frommage +Ketchup </h6>
                                    <h6 className='text-dark'>Fanta</h6>
                                </div>
                            </div>
                            <div className='card-footer bg-dark text-white d-flex '>
                                <h5 className='display-7 text-warning text-decoration-line-through'>50 DH's</h5>&nbsp;&nbsp;&nbsp;&nbsp;
                                <h3 className='display-6' style={{ fontSize: '31px' }}>30 DH's</h3>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-4'>
                    <Link to='/pass-order' className='text-decoration-none'>
                        <div className='card shadow-sm animated fadeInDown'>
                            <div className='card-header bg-dark text-white' >
                                <h3 className='display-6' style={{ fontSize: '33px' }}>Pizza 4 Season </h3>
                            </div>
                            <div className='card-body'>
                                <div className='text center'>
                                    <img src={piza} style={{ height: '110px', width: '80%' }} />
                                    <br /><br />
                                    <h6 className='text-dark'>Poulet + Frit</h6>
                                    <h6 className='text-dark'>Frommage +Ketchup </h6>
                                    <h6 className='text-dark'>Coca Cola</h6>
                                </div>
                            </div>
                            <div className='card-footer bg-dark text-white d-flex '>
                                <h5 className='display-7 text-warning  text-decoration-line-through'>100 DH's</h5>&nbsp;&nbsp;&nbsp;&nbsp;
                                <h3 className='display-6' style={{ fontSize: '31px' }}>30 DH's</h3>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-4'>
                    <Link to='/pass-order-sha' className='text-decoration-none'>

                        <div className='card shadow-sm animated fadeInDown'>
                            <div className='card-header bg-dark text-white'>
                                <h3 className='display-6' style={{ fontSize: '33px' }}>Shawarma Mix</h3>
                            </div>
                            <div className='card-body'>
                                <div className='text center'>
                                    <img src={shawa} style={{ height: '110px', width: '80%' }} />
                                    <br /><br />
                                    <h6 className='text-dark'>Poulet + Frit</h6>
                                    <h6 className='text-dark'>Frommage +Ketchup </h6>
                                    <h6 className='text-dark'>Pepsi</h6>
                                </div>
                            </div>
                            <div className='card-footer bg-dark text-white d-flex '>
                                <h5 className='display-7 text-warning  text-decoration-line-through'>35 DH's</h5> &nbsp;&nbsp;&nbsp;&nbsp;
                                <h3 className='display-6' style={{ fontSize: '31px' }}>30 DH's</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default OOffers
