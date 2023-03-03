import React from 'react'
import phones from '../../assets/img/ccc.png'
import gmails from '../../assets/img/gmail.png'
import mapss from '../../assets/img/adress1.png'

const ContactUs = () => {
    return (

        <div >
            <br />
            <br />
            <div align="center" id="contact">
                <h1 className='display-5 text-center'>Contact US</h1>
                <hr className='text-center' style={{ width: '150px', height: '3px' }} align="center" />
                <br />
            </div>

            <div className='row g-2 col-lg-12 text-center' style={{ justifyContent: 'center' }} >

                <div className='col-lg-4 mb-5 asosa'>
                    <br />
                    <img src={phones} style={{ width: '65px', height: '65px' }} /><br /><br />
                    <h4 className='display-6' style={{ fontSize: '28px' }}>+(212) 6 23458741</h4>
                </div>
                <div className='col-lg-4 mt-5 asosa'>
                    <br />
                    <img src={mapss} style={{ width: '65px', height: '65px' }} /><br /><br />
                    <h5 className='display-6' style={{ fontSize: '28px' }}>Boulevard Mohammed V , N° 200 , Ouedzem</h5>
                </div>
                <div className='col-lg-4 mb-5  asosa'>
                    <br />
                    <img src={gmails} style={{ width: '65px', height: '65px' }} /><br /><br />
                    <h1 className='display-6' style={{ fontSize: '28px' }}>Ayoub_lafar@homail.com</h1>
                </div>

                <br />
            </div>
        </div>
    )
}

export default ContactUs
