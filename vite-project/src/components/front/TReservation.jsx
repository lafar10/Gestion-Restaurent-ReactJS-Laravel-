import React, { useState } from 'react'
import swal from 'sweetalert'
import IMG3 from '../../assets/img/a0.jpg'
import axiosClient from '../../AxiosClient'
import { Navigate, useNavigate } from 'react-router-dom'
import ReservationPdf from './ReservationPdf'

const TReservation = () => {

    const [errors, setErrors] = useState([])
    const [reservation, setReservation] = useState({
        id: '',
        fullname: '',
        email: '',
        phone: '',
        adresse: '',
        numbers: '',
        reservation_type: ''
    })

    const handleInput = (e) => {

        e.persist()

        setReservation({ ...reservation, [e.target.name]: e.target.value })

    }

    const reservationSubmit = (e) => {

        e.preventDefault()

        const adata = reservation

        axiosClient.post('/reservation-save', adata).then(res => {

            if (res.data.status === 200) {

                /* navigate('/reservation-pdf/') */
                setErrors([])
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })

            }
            else if (res.data.status === 500) {
                setErrors(res.data.validation_errors)
            }

        })
    }

    return (
        <div className='container '>


            <br />
            <br />
            <div align="center">
                <h1 className='display-5 text-center'>Reservations</h1>
                <hr style={{ width: '150px', height: '3px' }} />

            </div>
            <br />
            <div className='row g-2 col-12'>
                <div className='col-lg-6'>
                    <div className='card'>
                        <div className='card-header text-center text-white bg-dark'>
                            <h4 className='display-6'>Table Reservation</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={reservationSubmit}>
                                <div className='row g-2'>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Full Name :</label>
                                            <input type='text' name='fullname' onChange={handleInput} value={reservation.fullname} className='form-control' />
                                            <span style={{ color: 'red' }}>{errors.fullname}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Adresse : </label>
                                            <input type='text' name='adresse' onChange={handleInput} value={reservation.adresse} className='form-control' />
                                            <span style={{ color: 'red' }}>{errors.adresse}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Phone Number :</label>
                                            <input type='text' name='phone' onChange={handleInput} value={reservation.phone} className='form-control' />
                                            <span style={{ color: 'red' }}>{errors.phone}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Email : </label>
                                            <input type='email' name='email' onChange={handleInput} value={reservation.email} className='form-control' />
                                            <span style={{ color: 'red' }}>{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Number Of Persons :</label>
                                            <input type='number' name='numbers' onChange={handleInput} value={reservation.numbers} className='form-control' />
                                            <span style={{ color: 'red' }}>{errors.numbers}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='form-group'>
                                            <label>Table Number : </label>
                                            <select className='form-control' name='reservation_type' onChange={handleInput} value={reservation.reservation_type}>
                                                <option>--- Select Reservation Type ---</option>
                                                <option>Breakfast</option>
                                                <option>Lunch</option>
                                                <option>Dinner</option>
                                            </select>
                                            <span style={{ color: 'red' }}>{errors.reservation_type}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-12 text-center'>
                                        <div className='form-group'>
                                            <br />
                                            <button className='btn btn-warning text-white'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <img src={IMG3} style={{ width: '100%', height: '98%' }} />
                </div>
            </div>
        </div>
    )
}

export default TReservation
