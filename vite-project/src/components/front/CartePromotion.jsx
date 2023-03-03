import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/logos.png'
import logoPHONE from '../../assets/img/telephone.png'
import logoEMAIL from '../../assets/img/gmail.png'
import logoADRESS from '../../assets/img/adress1.png'
import swal from 'sweetalert'
import axiosClient from '../../AxiosClient'
import jsPDF from 'jspdf';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { useStateContext } from '../../ContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillFilePdfFill } from 'react-icons/bs'

const CartePromotion = () => {

    const [promotionInput, setPromotions] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        axiosClient.get('/get_promotion_carte').then(res => {

            if (res.data.status === 200) {
                setPromotions(res.data.promo)
                setLoading(false)
            }
            else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }

        })

    }, [])

    const genePdf = (e) => {

        e.preventDefault()

        var doc = new jsPDF("p", "pt", "a4")

        doc.html(document.querySelector("#content"), {
            callback: function (pdf) {

                pdf.save("carte-promotion.pdf")
            }
        })

    }

    return (
        <div align="center">
            <div id='content'  style={{ width: '420px', height: '230px', backgroundColor: 'black' }}>
                <table style={{ width: '370px' }}>
                    <thead>
                        <tr>
                            <th>
                                <img src={logo} style={{ width: '135px', height: '120px', marginTop: '29px', marginLeft: '20px' }} />
                            </th>
                            <th >
                                <div align='center' style={{marginTop:'22px' }}>
                                    <h5 style={{marginLeft: '25px',color:'yellow' }}>N° : <span style={{color:'white'}}>{promotionInput.id}</span></h5>
                                    <h6 style={{ marginLeft: '15px',color:'white' }}> {promotionInput.name}</h6>
                                    <h6 style={{ marginLeft: '15px',color:'white' }}><img src={logoPHONE} style={{width:'15px',height:'15px'}} /> 0{promotionInput.phone}</h6>
                                    <h6 style={{ marginLeft: '15px',color:'white' }}><img src={logoEMAIL} style={{width:'15px',height:'15px'}} />  {promotionInput.email}</h6>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={2}><h6 style={{color:'white',marginTop:'10px'}} align='center'>Benefit -15% At First Use</h6></th>
                        </tr>
                        <tr>
                            <th>
                                <h6 style={{ fontSize: 14,color:'yellow',marginBottom:'20px'  }}  align="center"><img src={logoPHONE} style={{width:'15px',height:'15px'}} /> + (212) 632658745</h6></th>
                            <th>
                                <h6 style={{ fontSize: 14,color:'yellow' }} align="center"><img src={logoADRESS} style={{width:'15px',height:'15px'}} /> Boulevard Mohammed V , N° 2151, Ouedzem</h6>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Link className='btn btn-danger' to='/home'>Cancel</Link> &nbsp;&nbsp;&nbsp;
            <button onClick={genePdf} className={loading ? 'btn btn-success disabled':'btn btn-success' }><BsFillFilePdfFill /> Get Carte Promotion</button>

        </div>
    )
}

export default CartePromotion
