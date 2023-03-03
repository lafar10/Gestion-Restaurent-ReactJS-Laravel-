import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../../AxiosClient'
import swal from 'sweetalert'
import { BsFillPenFill, BsFillPlusCircleFill, BsHourglass, BsTrash } from 'react-icons/bs'

const Reservations = () => {

    const [loading, setLoading] = useState(false)
    const [reservationInput, setReservation] = useState([{}])

    const getReservation = () => {

        setLoading(true)
        axiosClient.get('/reservations').then(res => {

            if (res.data.status === 200) {
                setReservation(res.data.reservations)
                setLoading(false)
            }

        }).catch((err) => {

            setLoading(false)

        })
    }

    useEffect(() => {

        getReservation()

    }, [])

    const deleteReservation = (e, id) => {

        e.preventDefault()

        if (confirm('Are you Sure ?')) {
            const clickedBtn = e.currentTarget
            clickedBtn.innerText = 'Deleting ...'

            axiosClient.delete('/reservation-delete/' + id).then(res => {

                if (res.data.status === 200) {
                    clickedBtn.closest('tr').remove()
                    swal({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        button: "Ok",
                    })
                }
                else if (res.data.status === 404) {
                    clickedBtn.innerText = 'Delete'
                    swal({
                        title: "Error 404",
                        text: res.data.message,
                        icon: "error",
                        button: "Ok",
                    })
                }
            })
        }
    }

    const load = <tr><td colSpan={11} className='text-lg-center'><h2><span>loading<BsHourglass /></span></h2></td></tr>

    var loadData = reservationInput.map((item, idx) => (
        <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.fullname}</td>
            <td>{item.adresse}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.numbers}</td>
            <td>{item.table_number}</td>
            <td>{item.reservation_type}</td>
            <td>{item.status === 'On' ? <sapn className='badge bg-success'>{item.status}</sapn> : <sapn className='badge bg-danger'>{item.status}</sapn>}</td>
            <td>{item.created_at}</td>
            <td>
                <div className='d-flex'>
                    <Link className='btn btn-outline-primary' to={'/edit-reservation/' + item.id}><BsFillPenFill /></Link>&nbsp;
                    <button className='btn btn-outline-danger' onClick={(e) => deleteReservation(e, item.id)}><BsTrash /> </button>
                </div>
            </td>
        </tr>
    ))

    return (
        <div className='container'>
            <div className='card mt-5'>
                <div className='card-header'>
                    <h3 className='display-6'>Reservations Table</h3>
                    <Link className='btn btn-success float-end' to='/add-reservation'><BsFillPlusCircleFill /> New Reservation</Link>
                </div>
                <div className='card-body'>
                    <div class="table-responsive">
                        <table className='table  table-bordered ' id="myTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FullName</th>
                                    <th>Adresse</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Numbers_Persons</th>
                                    <th>Table_Number</th>
                                    <th>Reservation_Type</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? load : loadData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservations
