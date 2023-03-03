import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../../AxiosClient'

const AddReservation = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [reservationInput, setReservation] = useState({
        fullname: '',
        adresse: '',
        phone: '',
        email: '',
        numbers: '',
        table_number: '',
        reservation_type: '',
        status: ''
    })


    const handleInput = (e) => {

        e.persist()

        setReservation({ ...reservationInput, [e.target.name]: e.target.value })
    }

    const reservationSubmit = (e) => {

        e.preventDefault()
        const data = reservationInput

        axiosClient.post('/reservation-store/', data).then(res => {

            if (res.data.status === 200) {
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })
                navigate('/reservations')
            }
            else if (res.data.status === 500) {
                setErrors(res.data.validation_errors)
            }

        })
    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='card col-lg-9 mt-5' >
                <div className='card-header text-center'>
                    <h4 className='display-7'>Add Reservation</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={reservationSubmit}>
                        <div className='row g-2'>
                            <div className='col-lg-6 text-left'>
                                <div className='form-group'>
                                    <label>FullName : </label>
                                    <input type='text' name='fullname' onChange={handleInput} value={reservationInput.fullname} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.fullname}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Adresse : </label>
                                    <input type='text' name='adresse' onChange={handleInput} value={reservationInput.adresse} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.adresse}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Phone Number : </label>
                                    <input type='text' name='phone' onChange={handleInput} value={reservationInput.phone} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.phone}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Email : </label>
                                    <input type='email' name='email' onChange={handleInput} value={reservationInput.email} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.email}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Number of Persons :</label>
                                    <input type='number' name='numbers' onChange={handleInput} value={reservationInput.numbers} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.numbers}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Table Number :</label>
                                    <select name='table_number' onChange={handleInput} value={reservationInput.table_number} className='form-control'>
                                        <option >--- Select Table Number ---</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.table_number}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Type of Reservation :</label>
                                    <select name='reservation_type' onChange={handleInput} value={reservationInput.reservation_type} className='form-control'>
                                        <option >--- Select Reservation Type ---</option>
                                        <option>BreakFast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.reservation_type}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Status Of Reservation :</label>
                                    <select name='status' onChange={handleInput} value={reservationInput.status} className='form-control'>
                                        <option >--- Select status ---</option>
                                        <option>On</option>
                                        <option>Off</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.status}</span>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <div className='d-flex float-end'>
                                        <Link className='btn btn-danger float-end' to='/reservations' >Cancel</Link>&nbsp;&nbsp;&nbsp;
                                        <button className='btn btn-success float-end' >Create</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddReservation
