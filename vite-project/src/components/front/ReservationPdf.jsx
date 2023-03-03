/* import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import logos from '../../assets/img/logos.png'
import jsPDF from 'jspdf'

const ReservationPdf = ({brand}) => {

    const {id} = useParams()

    const [reservation , setReservation] = useState({})

    useEffect(() => {

        axiosClient.get('/reservation-facture/'+id).then(res => {

            if(res.data.status === 200)
            { }
            else if(res.data.status === 404)
            {
                swal({
                    title: "Error",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })
            }

        })


    })

    const pdfClick = (e) => {

        var doc = new jsPDF("p", "pt", "a4")

        doc.html(document.querySelector('#content'), {
            callback: function (pdf) {

                pdf.save("reservation-facture.pdf")
            }
        })

    }

    return (
        <div >
            <div id='content'>
                <img src={logos} style={{ width: '160px', height: '160px' }} align="center" />
                <br />
                <h3>Reservation N° : </h3>

                <table>
                    <tr>
                        <th>FullName</th>
                        <th>Phone</th>
                        <th>Adresse</th>
                        <th>Numbers_Persons</th>
                        <th>Reservation_Type</th>
                    </tr>
                    <tr>
                        <td>{brand.fullname}</td>
                        <td>{brand.phone}</td>
                        <td>{brand.adresse}</td>
                        <td>{brand.numbers}</td>
                        <td>{brand.reservation_type}</td>
                    </tr>
                </table>
            </div>
            <button onClick={pdfClick} >Get Reservation Facture</button>
        </div>
    )
}
 */

const ReservationPdf = () =>{

}
export default ReservationPdf

