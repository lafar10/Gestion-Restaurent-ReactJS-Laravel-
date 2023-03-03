import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../../AxiosClient'
import swal from 'sweetalert'
import { BsFilePdf, BsFillPenFill, BsFillPlusCircleFill, BsHourglass, BsTrash } from 'react-icons/bs'

const GetOffOrders = () => {

    const [loading, setLoading] = useState(false)
    const [ordersInput, setOrders] = useState([{}])

    const getOrders = () => {

        setLoading(true)
        axiosClient.get('/order-off').then(res => {

            if (res.data.status === 200) {
                setOrders(res.data.orders)
                setLoading(false)
            }

        }).catch((err) => {

            setLoading(false)

        })
    }

    useEffect(() => {

        getOrders()

    }, [])

    const load = <tr><td colSpan={11} className='text-lg-center'><h2><span>loading<BsHourglass /></span></h2></td></tr>

    var loadData = ordersInput.map((item, idx) => (
        <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.meal_name}</td>
            <td>{item.meal_size}</td>
            <td>{item.meal_quatity}</td>
            <td>{item.meal_price}</td>
            <td>{item.meal_name_order}</td>
            <td>{item.meal_phone}</td>
            <td>{item.meal_adresse}</td>
            <td>{item.meal_drink}</td>
            <td>{item.meal_status === 'On' ? <sapn className='badge bg-success'>{item.meal_status}</sapn> : <sapn className='badge bg-danger'>{item.meal_status}</sapn>}</td>
            <td>{item.created_at}</td>
            <td>
                <div className='d-flex'>
                    <Link className='btn btn-outline-primary' to={'/edit-order/' + item.id}><BsFillPenFill /></Link>&nbsp;
                    <button className='btn btn-outline-danger' onClick={(e) => deleteOrder(e, item.id)}><BsTrash /> </button>&nbsp;
                    <Link className='btn btn-outline-dark' to={'/facture-order/' + item.id}><BsFilePdf /></Link>

                </div>
            </td>
        </tr>
    ))

    return (
        <div className='container'>
            <div className='card mt-5'>
                <div className='card-header'>
                    <h3 className='display-6'>Orders Table</h3>
                    <Link className='btn btn-success float-end' to='/add-order'><BsFillPlusCircleFill /> New Order</Link>
                </div>
                <div className='card-body'>
                    {/* <div className='d-flex'>
                        <input type='search' className='form-control' onChange={(e) => search(e.target.value)} placeholder='Input Something to Search...' />

                    </div> */}
                    <br />

                    <div className='table-responsive'>
                        <table className='table  table-bordered ' width="100%" id="myTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Meal_Name</th>
                                    <th>Meal_Size</th>
                                    <th>Meal_Quantity</th>
                                    <th>Meal_Price</th>
                                    <th>Meal_Owner</th>
                                    <th>Meal_Phone</th>
                                    <th>Meal_Adress</th>
                                    <th>Meal_Drink</th>
                                    <th>Meal_status</th>
                                    <th>Created_At</th>
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

export default GetOffOrders
