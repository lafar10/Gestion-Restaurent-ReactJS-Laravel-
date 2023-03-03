import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import swal from 'sweetalert'

function AddUser() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [userInput, setUsers] = useState({
        name: '',
        email: '',
        password: '',
        adresse: '',
        phone: '',
        gender: '',
        type: '',
    })

    const handleInput = (e) => {

        e.persist()
        setUsers({ ...userInput, [e.target.name]: e.target.value })

    }


    const userSubmit = (e) => {

        e.preventDefault()

        const userData = userInput

        axiosClient.post('/user-store', userData).then(res => {

            if (res.data.status === 200) {
                swal({
                    title: "Success",
                    text: "User " + userData.name + " Created Successfully ^-^",
                    icon: "success",
                    button: "Ok",
                })
                navigate('/users')

            }
            else if (res.data.status === 500) {
                setErrors(res.data.message_errors)
            }

        }).catch(err => {

        })
    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='card col-10 mt-5'>
                <div className='card-header text-center'>
                    <h4 className='display-7'>Add New User</h4>
                </div>

                <div className='card-body'>

                    <form onSubmit={userSubmit}>
                        <div className='row g-2'>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>FullName</label>
                                    <input type='text' name='name' onChange={handleInput} value={userInput.name} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.name}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='email' name='email' onChange={handleInput} value={userInput.email} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.email}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>password</label>
                                    <input type='password' name='password' onChange={handleInput} value={userInput.password} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.password}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Phone</label>
                                    <input type='text' name='phone' onChange={handleInput} value={userInput.phone} className='form-control' />
                                    <span style={{ color: 'red' }}>{errors.phone}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label >Gender</label>
                                    <select name='gender' onChange={handleInput} value={userInput.gender} className='form-control'>
                                        <option >--- Select Your Gender ---</option>
                                        <option>M</option>
                                        <option>F</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.gender}</span>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>User Type</label>
                                    <select name='type' onChange={handleInput} value={userInput.type} className='form-control'>
                                        <option >--- Select User Type ---</option>
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.type}</span>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Adresse</label>
                                    <input type='text' name='adresse' onChange={handleInput} value={userInput.adresse} className='form-control' />
                                </div>
                                <span style={{ color: 'red' }}>{errors.adresse}</span>
                            </div>
                            <div className='col-lg-12 mt-3'>
                                <div className='d-flex float-end'>
                                    <Link className='btn btn-danger float-end' to='/users' >Cancel</Link>
                                    &nbsp;&nbsp;&nbsp;<button className='btn btn-success float-end' >Create</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
