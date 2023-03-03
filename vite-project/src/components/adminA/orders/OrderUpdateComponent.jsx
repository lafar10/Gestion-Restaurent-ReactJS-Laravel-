import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../AxiosClient'
import swal from 'sweetalert'

const OrderUpdateComponent = () => {

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [ordersInput, setOrder] = useState({
        meal_name : '',
        meal_size : '',
        meal_quatity : '',
        meal_price : '',
        meal_name_order : '',
        meal_phone : '',
        meal_adresse : '',
        meal_drink : '',
        meal_status : '',
    })

    const handleInput = (e) => {
        e.persist()

        setOrder({ ...ordersInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        axiosClient.get('/order-edit/' + id).then(res => {

            if (res.data.status === 200) {
                setLoading(true)
                setOrder(res.data.order)

            }
            else if (res.data.status === 404) {
                swal({
                    title: "Error 404",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })

            }
            setLoading(false)

        }).catch((err) => {

            setLoading(false)

        })

    }, [])

    const orderSubmit = (e) => {

        e.preventDefault()

        const datas = ordersInput

        axiosClient.put('/order-update/' + id, datas).then(res => {

            if (res.data.status === 200) {
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })
                navigate('/orders')
            }
            else if (res.data.status === 500) {
                setErrors(res.data.errors_message)
            }
            else if (res.data.status === 404) {
                swal({
                    title: "Error 404",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })
            }


        })

    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='card col-lg-9 mt-5' >
                <div className='card-header text-center'>
                    <h4 className='display-7'>Update Order {ordersInput.meal_name_order}</h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={orderSubmit}>
                        <div className='row g-2'>
                            <div className='col-lg-6 text-left'>
                                <div className='form-group'>
                                    <label>Meal Name : </label>
                                    <input type='text' name='meal_name' onChange={handleInput} value={ordersInput.meal_name} className='form-control' />
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
                            <div className='col-lg-12'>
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
                                        <option >--- Select Table Number ---</option>
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.meal_size}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Meal Price :</label>
                                    <input type='text' name='meal_price' onChange={handleInput} value={ordersInput.meal_price} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.meal_price}</span>
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
                                    <div className='d-flex float-end'>
                                        <Link className='btn btn-danger float-end' to='/orders' >Cancel</Link>&nbsp;&nbsp;&nbsp;
                                        <button className='btn btn-success float-end' >Update</button>
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

export default OrderUpdateComponent
