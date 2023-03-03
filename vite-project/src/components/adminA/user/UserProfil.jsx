import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../AxiosClient'
import swal from 'sweetalert'
import { useStateContext } from '../../../ContextProvider'
import { BsHourglass } from 'react-icons/bs'

const UserProfil = () => {

    const navigate = useNavigate()
    const { user, token, setUser, setToken} = useStateContext()
    const { id } = useParams()
    const [loading , setLoading] = useState(false)
    const [userInput, setUserInput] = useState({
        name: '',
        adresse: '',
        phone: '',
        gender: '',
    })
    const [errors, setErrors] = useState([])

    const handleInput = (e) => {

        e.persist()

        setUserInput({ ...userInput, [e.target.name]: e.target.value })

    }

    var a = ''

    if (token != localStorage.getItem('ACCESS_TOKEN')) {
        a = 0
        swal({
            title: "Error Not Found 404",
            text: 'This is Not Your Account ID',
            icon: "error",
            button: "Ok",
        })
    }
    else {
        a = id
    }

    useEffect(() => {

        setLoading(true)
        axiosClient.get('/user-profile-data').then(res => {

            if (res.data.status === 200) {
                setUserInput(res.data.user_profile_data)
                setLoading(false)
            }
            else if (res.data.status === 404) {
                swal({
                    title: "Error Not Found 404",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })

                navigate('/dashboard')
            }

        }).catch((err) => {
            setLoading(false)
        })

    }, [])

    const profileSubmit = (e) => {

        e.preventDefault()

        const dataUser = userInput

        axiosClient.put('/user-profile-update/' + localStorage.getItem('user_id'), dataUser).then(res => {

            if (res.data.status === 200) {
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })
                history.go('/users')
            }
            else if (res.data.status === 500) {
                setErrors(res.data.messages_errors)
            }
            else if (res.data.status === 404) {
                swal({
                    title: "Error Not Found 404 !",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })
                history.go('/')
            }

        })
    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>

        <div className='card col-lg-10 mt-5'>
            <div className='card-header text-center'>
                <h3 className='display-5'>{loading ? <span>Loading <BsHourglass /></span> : 'My Profile'}</h3>
            </div>
            <div className='card-body'>
                <form onSubmit={profileSubmit}>
                    <div className='row g-2'>
                        <div className='col-lg-6'>
                            <div className='form-group'>
                                <label>FullName :</label>
                                <input type='text' name='name' onChange={handleInput} value={userInput.name} className='form-control' placeholder='Enter Your FullName' />
                                <span className='text-danger'>{errors.name}</span>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group'>
                                <label>Phone :</label>
                                <input type='text' name='phone' onChange={handleInput} value={userInput.phone} className='form-control' placeholder='Enter Your Number Phone' />
                                <span className='text-danger'>{errors.phone}</span>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group'>
                                <label>Gender :</label>
                                <select className='form-control' name='gender' onChange={handleInput} value={userInput.gender}>
                                    <option>--- Select Your Gender ---</option>
                                    <option>M</option>
                                    <option>F</option>
                                </select>
                                <span className='text-danger'>{errors.gender}</span>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group'>
                                <label>Adresse :</label>
                                <input type='text' name='adresse' onChange={handleInput} value={userInput.adresse} className='form-control' placeholder='Enter Your Adresse' />
                                <span className='text-danger'>{errors.adresse}</span>
                            </div>
                        </div>
                        <div className='col-lg-12 mt-3'>
                            <div className='d-flex  float-end'>
                                <Link className='btn btn-danger' to='/dashboard'>Cancel</Link>&nbsp;&nbsp;
                                <button className='btn btn-success'>Update</button>
                            </div>
                        </div>
                        <div className='col-lg-12 mt-5'>
                            <Link className='btn btn-info text-white' to='/change-password'>Change Password</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    )
}

export default UserProfil
