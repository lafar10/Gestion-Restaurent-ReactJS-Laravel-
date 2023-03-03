import React, { useState } from 'react'
import logo from '../../../assets/img/logos.png'
import logoPHONE from '../../../assets/img/telephone.png'
import logoADRESS from '../../../assets/img/adress1.png'
import axiosClient from '../../../AxiosClient'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import jsPDF from 'jspdf'

const OrderFacture = () => {

    const [facture, setFacture] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useState(() => {

        setLoading(true)
        axiosClient.get('/order-facture/' + id).then(res => {

            if (res.data.status === 200) {
                setFacture(res.data.order)
                setLoading(false)
            } else if (res.data.status === 404) {
                swal({
                    title: "Error 404",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })
            }

        })

    })

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
        <div >

            <div id='content' >
                <table>
                    <tbody>
                        <tr>
                            <td><img src={logo} style={{ width: '210px', height: '180px' }} /></td>
                            <td>
                                <h1 style={{ fontSize: 17 }}>Facture N° : {facture.id}</h1> <br />
                                <h1 style={{ fontSize: 17 }}>Date : {facture.created_at}</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <br />
                <br />
                <div style={{ marginLeft: '50px' }}>
                    <h5 style={{ fontStyle: 'italic', fontSize: 21 }}>Meal Name  :  {facture.meal_name}</h5><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h5 style={{ fontStyle: 'italic', fontSize: 21 }}>Owner Name  :  {facture.meal_name_order}</h5><br />
                    <h5 style={{ fontStyle: 'italic', fontSize: 21 }}>Meal Size  :  {facture.meal_size} </h5><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h5 style={{ fontStyle: 'italic', fontSize: 21 }}>Meal Quantity  :  {facture.meal_quatity} </h5><br />
                    <h5 style={{ fontStyle: 'italic', fontSize: 21 }}>Meal Drink  :  {facture.meal_drink}</h5><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span><h2 style={{ fontStyle: 'italic' }}>Meal Price  :  {facture.meal_price} DH's </h2></span><br />
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <h6 style={{ fontSize: 18, marginBottom: '20px' }} align="left">
                    <img src={logoPHONE} style={{ width: '21px', height: '21px' }} /> + (212) 632658745
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={logoADRESS} style={{ width: '21px', height: '21px' }} />
                    Boulevard Mohammed V , N° 2151, Ouedzem
                </h6>
            </div>


          <button onClick={genePdf} className={loading ? 'btn btn-success disabled':'btn btn-success' }>Generate Facture PDF</button>

        </div>
    )
}

export default OrderFacture
