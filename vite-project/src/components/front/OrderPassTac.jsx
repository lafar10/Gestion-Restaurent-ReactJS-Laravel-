import React, { useState } from 'react'
import HNavbar from './HNavbar'
import axiosClient from '../../AxiosClient'
import { Link, useNavigate } from 'react-router-dom'


const OrderPassTac = () => {

    const navigate = useNavigate()
    const [ordersInput, setOrder] = useState({
        meal_name: '',
        meal_size: '',
        meal_quatity: '',
        meal_price: '',
        meal_name_order: '',
        meal_phone: '',
        meal_adresse: '',
        meal_drink: '',
        meal_status: '',
    })
    const [errors, setErrors] = useState([])

    const handleInput = (e) => {

        e.persist()
        setOrder({ ...ordersInput, [e.target.name]: e.target.value })

    }

    const orderSubmit = (e) => {

        e.preventDefault()

        if(ordersInput.meal_size === 'Small')
        {
            if(ordersInput.meal_drink === 'None')
            {
                ordersInput.meal_price = 25 * ordersInput.meal_quatity;
            }
            else
            {
                ordersInput.meal_price = (25 * ordersInput.meal_quatity)+5;
            }
        }
        else if(ordersInput.meal_size === 'Medium')
        {
            if(ordersInput.meal_drink === 'None')
            {
                ordersInput.meal_price = 40 * ordersInput.meal_quatity;
            }
            else
            {
                ordersInput.meal_price = (40 * ordersInput.meal_quatity)+5;
            }
        }
        else if(ordersInput.meal_size === 'Large')
        {
            if(ordersInput.meal_drink === 'None')
            {
                ordersInput.meal_price = 60 * ordersInput.meal_quatity;
            }
            else
            {
                ordersInput.meal_price = (60 * ordersInput.meal_quatity)+5;
            }
        }
        const datas = ordersInput

        axiosClient.post('/order-store/', datas).then(res => {

            if (res.data.status === 200) {

                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })
                navigate('/home')

            } else if (res.data.status === 500) {
                setErrors(res.data.errors_message)
            }

        })
    }

    return (
        <div>
            <HNavbar />

            <div className='container mt-5 '>
                <br />

                <div className='card mt-5'>
                    <div className='card-header text-white bg-dark'>
                        <h1 className='display-6 text-center' style={{ fontSize: 29 }}>Pass An Pizza Order</h1>
                    </div>
                    <div className='card-body'>
                        <h1 className='display-6 text-center' style={{ fontSize: 29 }}>Small : 25 DH's  |  Medium : 40 DH's  |  Large : 60 DH's</h1>

                        <form onSubmit={orderSubmit}>
                            <div className='row g-2 mt-3'>
                                <div className='col-lg-6 text-left'>
                                    <div className='form-group'>
                                        <label>Meal Name : </label>
                                        <select name='meal_name' onChange={handleInput} value={ordersInput.meal_name} className='form-control'>
                                            <option >--- Select Your Tacos ---</option>
                                            <option>Tacos Poullet</option>
                                            <option>Tacos Kefta</option>
                                            <option>Tacos Ton</option>
                                        </select>
                                        <span style={{ color: 'red' }}>{errors.meal_name}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Name Buyer : </label>
                                        <input type='text' name='meal_name_order' onChange={handleInput} value={ordersInput.meal_name_order} className='form-control' />
                                        <span style={{ color: 'red' }}>{errors.meal_name_order}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Order Adress : </label>
                                        <input type='text' name='meal_adresse' onChange={handleInput} value={ordersInput.meal_adresse} className='form-control' />
                                        <span style={{ color: 'red' }}>{errors.meal_adresse}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Order Phone : </label>
                                        <input type='text' name='meal_phone' onChange={handleInput} value={ordersInput.meal_phone} className='form-control' />
                                        <span style={{ color: 'red' }}>{errors.meal_phone}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label >Quantity :</label>
                                        <input type='number' name='meal_quatity' onChange={handleInput} value={ordersInput.meal_quatity} className='form-control' />
                                        <span style={{ color: 'red' }}>{errors.meal_quatity}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label >Meal Size :</label>
                                        <select name='meal_size' onChange={handleInput} value={ordersInput.meal_size} className='form-control'>
                                            <option >--- Select Pizza Size ---</option>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                        <span style={{ color: 'red' }}>{errors.meal_size}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label >Meal Drink :</label>
                                        <select name='meal_drink' onChange={handleInput} value={ordersInput.meal_drink} className='form-control'>
                                            <option >--- Select Your Drink ---</option>
                                            <option>Pepsi</option>
                                            <option>Cola</option>
                                            <option>Fanta</option>
                                            <option>None</option>
                                        </select>
                                        <span style={{ color: 'red' }}>{errors.meal_drink}</span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label >Status Of Meal :</label>
                                        <select name='meal_status' onChange={handleInput} value={ordersInput.meal_status} className='form-control'>
                                            <option >--- Select status ---</option>
                                            <option>On</option>
                                            <option>Off</option>
                                        </select>
                                        <span style={{ color: 'red' }}>{errors.meal_status}</span>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <div className='d-flex float-end mt-4'>
                                            <Link className='btn btn-danger float-end' to='/home' >Cancel</Link>&nbsp;&nbsp;&nbsp;
                                            <button className='btn btn-success float-end' >Create</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default OrderPassTac
