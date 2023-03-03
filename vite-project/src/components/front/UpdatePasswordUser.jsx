import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import swal from 'sweetalert'
import axiosClient from '../../../AxiosClient'

const UpdatePasswordUser = () => {

    const [userInput, setUserInput] = useState({})
    const [errors, setErrors] = useState([])
    const [error, setError] = useState([])
    const navigate = useNavigate()

    const handleInput = (e) => {

        e.persist()

        setUserInput({ ...userInput, [e.target.name]: e.target.value })

    }

    const passwordUpdateSubmit = (e) => {

        e.preventDefault()

        const datas = userInput

        axiosClient.put('/user-change-password', datas).then(res => {

            if (res.data.status === 200) {
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })
                navigate('/home')
            }
            else if (res.data.status === 500) {
                setErrors(res.data.message_error)
            }
            else if (res.data.status === 501) {
                setError(res.data.message_err)
            }

        })
    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>

            <div className='card col-lg-10 mt-5' >
                <div className='card-header text-center'>
                    <h3 className='display-5'>Change Password</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={passwordUpdateSubmit}>
                        <div className='row g-2'>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Current Password :</label>
                                    <input type='password' name='cpassword' onChange={handleInput} value={userInput.cpassword} className='form-control' />
                                    <span className='text-danger'>{errors.cpassword}</span>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>New Password :</label>
                                    <input type='password' name='password' onChange={handleInput} value={userInput.password} className='form-control' />
                                    <span className='text-danger'>{errors.password}</span><br />
                                    <span className='text-danger'>{error}</span>
                                </div>
                            </div>
                            <div className='col-lg-12 mt-3'>
                                <div className='d-flex  float-end'>
                                    <Link className='btn btn-danger' to='/dashboard'>Cancel</Link>&nbsp;&nbsp;
                                    <button className='btn btn-success'>Update Password</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default UpdatePasswordUser
