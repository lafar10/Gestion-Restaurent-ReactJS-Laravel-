import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import ContactUs from './ContactUs'
import Footer from './Footer'
import Fsection from './Fsection'
import HNavbar from './HNavbar'
import OMeals from './OMeals'
import OOffers from './OOffers'
import OurServices from './OurServices'
import Tablates from './Tablates'
import TReservation from './TReservation'


function Home() {


    return (
        <div>
            <HNavbar />
            <div className='container'>
                <br/>

                <Fsection />
                <br />
                <br />
                <br />

                <OMeals />

                <br />
                <br />
                <br />

                <OOffers />

                <br />
                <br />
                <br />

                <TReservation />

                <br />
                <br />
                <br />
                <br />

                <OurServices />

                <br />
                <br />
                <br />
                <br />

                <ContactUs />

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Footer />

            </div>

        </div>
    )
}

export default Home
