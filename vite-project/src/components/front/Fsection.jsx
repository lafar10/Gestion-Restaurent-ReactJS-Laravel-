import React from 'react'
import { Link } from 'react-router-dom'
import IMGH from '../../assets/img/res.jpg'


const Fsection = () => {
    return (
        <div className='container mt-5'>
            <br />
            <br />
            <div className='row g-2 mt-5'>
                <div className='col-lg-6 mt-5'>
                    <h1 className='display-6 text-bold'>Welcome In LR10-Restaurent ,</h1><br/>
                    <h6>My Soul Is Deep | Ethereal Deep House</h6>
                    <h6> | By Grau DJ - Eclecticism</h6>
                    <h6>adfdf House df dsf Soul</h6>
                    <h6>Deep sdfsdf dfs  dsf Eclecticism</h6>
                    <br/><br/>
                    <Link className='btn btn-outline-secondary btn-lg' to='/carte-promotion'>Get Promotion-Card</Link>

                </div>
                <div className='col-lg-6'>

                    <img src={IMGH} style={{width:'100%',height:'100%'}} />
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Fsection
