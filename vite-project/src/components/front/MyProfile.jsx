import React, { useEffect, useState } from 'react'
import HNavbar from './HNavbar'
import Footer from './Footer'
import axiosClient from '../../AxiosClient'
import swal from 'sweetalert'
import { Link, useNavigate } from 'react-router-dom'
import { BsHourglass } from 'react-icons/bs'

const MyProfile = () => {

    const [loading, setLoading] = useState(false)
    const [usersInput, setUserInput] = useState({
        name: '',
        adresse: '',
        phone: '',
        gender: ''
    })

    const [errors, setErrors] = useState([])
    const [errora, setErrorA] = useState([])

    const handleInput = (e) => {
        e.persist()

        setUserInput({ ...usersInput, [e.target.name]: e.target.value })
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

                history.go('/dashboard')
            }

        }).catch((err) => {
            setLoading(false)
        })


    }, [])

    const ProfSubmit = (e) => {

        e.preventDefault()

        var dats = usersInput

        axiosClient.put('/user-profile-update/' + localStorage.getItem('user_id'), dats).then(res => {

            if (res.data.status === 200) {

                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })

            }
            else if (res.data.status === 500) {
                setErrors(res.data.messages_errors)
            } else if (res.data.status === 404) {
                swal({
                    title: "Error Not Found 404 !",
                    text: res.data.message,
                    icon: "error",
                    button: "Ok",
                })
                history.go('/home')
            }

        })
    }

    var load = <span>Loading <BsHourglass /></span>

    return (
        <div>
            <HNavbar />
            <br />
            <br />
            <br />
            <br />
            <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>

                <div className='card mt-5'>

                    <div className='card-header text-center'>
                        <h4 className='display-6'> {loading ? load : 'Update User '+usersInput.name}</h4>
                    </div>
                    <div className='card-body'>


                        <form onSubmit={ProfSubmit}>
                            <div className='row g-2 mt-4'>

                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>FullName : </label>
                                        <input type='text' name='name' onChange={handleInput} value={usersInput.name} className='form-control' />
                                        <span style={{ color: 'red' }}> {errors.name} </span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Adresse : </label>
                                        <input type='text' name='adresse' onChange={handleInput} value={usersInput.adresse} className='form-control' />
                                        <span style={{ color: 'red' }}> {errors.adresse} </span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Phone Number : </label>
                                        <input type='text' name='phone' onChange={handleInput} value={usersInput.phone} className='form-control' />
                                        <span style={{ color: 'red' }}> {errors.phone} </span>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label>Gender : </label>
                                        <select name='gender' onChange={handleInput} value={usersInput.gender} className='form-control' >
                                            <option>--- Select Your Gender ---</option>
                                            <option>M</option>
                                            <option>F</option>
                                        </select>
                                        <span style={{ color: 'red' }}> {errors.gender} </span>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='d-flex float-end'>
                                        <Link className='btn btn-danger' to='/home' >Cancel</Link>&nbsp;&nbsp;&nbsp;
                                        <button className='btn btn-success' >Update</button>
                                    </div>

                                </div>

                                <div className='col-lg-12 mt-5'>
                                    <Link className='btn btn-info text-white' to='/change-password-user'>Change Password</Link>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />

            <Footer />
        </div>
    )
}

export default MyProfile
