import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../../../AxiosClient'
import {  BsFillPenFill, BsFillPlusCircleFill, BsHourglass, BsTrash } from 'react-icons/bs'

function Users() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([{
        id: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        type: '',
        adresse: ''
    }])

    useEffect(() => {

        getUsers()

    }, [])

    const getUsers = () => {

        setLoading(true)

        AxiosClient.get('/users').then(res => {

            if (res.data.status === 200) {
                setLoading(false)
                setData(res.data.users)

            }

        }).catch((err) => {
            setLoading(false)
        })

    }

    const deleteUser = (e, id) => {
        e.preventDefault()

        if (confirm('delete ?')) {


            const ClickedTR = e.currentTarget

            ClickedTR.innerText = 'Deleting ...'

            axiosClient.delete('/user-delete/' + id).then(res => {

                if (res.data.status === 200) {
                    ClickedTR.closest('tr').remove()
                    swal({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        button: "Ok",
                    })
                } else if (res.data.status === 404) {
                    ClickedTR.innerText = 'Delete'
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

    var load = <tr><th colSpan='7' className='text-lg-center'><h2><span>loading<BsHourglass /></span></h2></th></tr>;

    var tab = data.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.adresse}</td>
            <td>{item.phone}</td>
            <td>{item.type}</td>
            <td>
                <div className='d-flex'>
                    <Link className='btn btn-primary' to={'/edit-user/' + item.id}  ><BsFillPenFill/></Link>&nbsp;
                    <button className='btn btn-danger' onClick={(e) => deleteUser(e, item.id)}  ><BsTrash/></button>
                </div>
            </td>
        </tr>
    ))

    return (
        <div className='container'>
            <div className='card mt-5'>
                <div className='card-header'>
                    <h3>Users Table</h3>
                    <Link className='btn btn-success float-end' to='/add-user'><BsFillPlusCircleFill /> Add New User</Link>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table table-bordered  mt-4' id="myTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Adresse</th>
                                    <th>Phone</th>
                                    <th>User_Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? load : tab}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Users
