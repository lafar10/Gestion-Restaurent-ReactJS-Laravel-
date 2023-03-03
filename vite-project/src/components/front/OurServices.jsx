import React from 'react'
import phoneA from '../../assets/img/telephone.png'
import cashA from '../../assets/img/ccc.png'
import cashB from '../../assets/img/cash.png'
import imgG from '../../assets/img/truck.png'


const OurServices = () => {
    return (
        <div>
            <br />
            <br />
            <div align="center">
                <h1 className='display-5 text-center'>Our Services</h1>
                <hr style={{ width: '150px', height: '3px' }} />
            </div>
            <br />
            <br />
            <div className='row g-4 col-lg-12' align="center" >
                <div className='col-lg-3 shadow-sm mt-5 asosa '>
                    <br />
                    <br />
                    <img src={imgG} style={{ width: '80px', height: '70px' }} /><br /><br /><br />
                    <h1 className='display-6'>Fast Delivery Free</h1>
                </div>
                <div className='col-lg-3 shadow-sm mb-5 asosa'>
                    <br />
                    <br />
                    <img src={phoneA} style={{ width: '80px', height: '70px' }} /><br /><br /><br />
                    <h1 className='display-6'>Open 24/24h 7/7d </h1>
                </div>
                <div className='col-lg-3 shadow-sm mt-5 asosa'>
                    <br />
                    <br />
                    <img src={cashB} style={{ width: '80px', height: '70px' }} /><br /><br /><br />
                    <h1 className='display-6'>Cash On Delivery </h1>
                </div>
                <div className='col-lg-3 shadow-sm mb-5 asosa'>
                    <br />
                    <br />
                    <img src={cashA} style={{ width: '80px', height: '70px' }} /><br /><br /><br />
                    <h1 className='display-6'>Contact Team 24/24h 7/7d </h1>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}

export default OurServices
