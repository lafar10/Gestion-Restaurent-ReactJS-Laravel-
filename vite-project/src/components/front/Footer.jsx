import React from 'react'
import { Link } from 'react-router-dom'
import imgf from '../../assets/img/logos.png'
import { BsFacebook, BsHeartFill, BsInstagram, BsTwitter, BsWhatsapp, BsYoutube } from "react-icons/bs";

const Footer = () => {

    var dates = new Date()

    return (
    <div align="center">
        <hr/>
        <br/>
        <br/>
        <div className='row g-3 col-lg-10' align="center">
            <div className='col-lg-4'>
                <img  src={imgf} style={{width:'250px',height:'120px'}} /><br />
                <br />
                <p>salam cava hanafa adrszc scsccsc scscscss scscsc scscsc scscsc scscscsc scscsclklfg dfghds qdqsdr dfsf</p>
            </div>
            <div className='col-lg-4 text-center'>

                    <ul className='list-unstyled mb-0 mt-3'>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#home'>Home</Link></li>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#offers'>Offers</Link></li>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#meals'>Meals</Link></li>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#reservation'>Reservation</Link></li>
                    </ul>

            </div>
            <div className='col-lg-4 text-center'>

                    <ul className='list-unstyled mb-0  mt-3'>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#contact'>Contact Us</Link></li>
                        <li className='nav-link '><Link className='text-secondary' style={{fontSize:19}} to='/#contact' > Services</Link></li>
                        <li className='nav-link text-secondary text-bold mt-5'><h4>Follow Us</h4></li>
                        <li className='nav-link text-secondary m-4'>
                            <Link to=''><BsInstagram color='pink' size={23}/></Link>&nbsp;&nbsp;
                            <Link to=''><BsFacebook color='blue' size={23}/></Link>&nbsp;&nbsp;
                            <Link to=''><BsTwitter  size={23} /></Link>&nbsp;&nbsp;
                            <Link to=''><BsWhatsapp color='green' size={23} /></Link>&nbsp;&nbsp;
                            <Link to=''><BsYoutube color='red' size={23} /></Link>
                        </li>
                    </ul>

            </div>
        </div>
        <br/>
        <br/>
        <h1 className='display-6' style={{ fontSize: '31px' }}>Created With <BsHeartFill color='red' /> By LA10 ^-^ ,© {dates.getFullYear()} All Rights Reserved .</h1>
        <br/>
    </div>
  )
}

export default Footer
