import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import { useStateContext } from '../../ContextProvider'
import swal from 'sweetalert'
import '../../assets/front/front.css'
import logo from '../../assets/img/logos.png'

function Register() {

    const navigate = useNavigate()
    const { token, setToken, setUser } = useStateContext()
    const [errors, setErrors] = useState([])
    const [errora, setError] = useState([])
    const [userInput, setUserInput] = useState({

        name : '',
        email : '',
        password : '',
        con_password : ''

    })

    const con_passRef = useRef()

    if (token) {
        navigate('/home')
    }

    const handleInput = (e) => {

        e.persist()

        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    const registerSubmit = (e) => {
        e.preventDefault()

        const data = userInput

      /*   axiosClient.get('/sanctum/csrf-cookie').then(res => {}) */

            axiosClient.post('/user-register', data).then(res => {

                if (res.data.status === 200) {
                    setToken(res.data.token)
                    setUser(res.data.user)
                    localStorage.setItem('user_name',res.data.user.name)
                    localStorage.setItem('user_id',res.data.user.id)
                    localStorage.setItem('Role_As',res.data.user.type)
                    swal({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        button: "Ok",
                    })
                    navigate('/home')

                }else if (res.data.status === 401) {
                    setError(res.data.message_con)
                }
                else if (res.data.status === 500) {
                    setErrors(res.data.message_errors)
                }

            }).catch(err => {

            })

    }

    return (

        <div  id='bgi'>
            <div id="layoutAuthentication">
            <Link to='/home' className='text-white text-decoration-none mt-5 ms-5'><img src={logo} style={{width:'160px',height:'100px'}} align="center" /></Link>
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center ">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-3  shadow-lg animatedA fadeInDownA ">
                                        <div className="card-header bg-white"><h3 className="display-6 text-center text-dark ">Create Account</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={registerSubmit}>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" name='name' onChange={handleInput} value={userInput.name} id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                            <label >FullName</label>
                                                        </div>
                                                        <span style={{ color: 'red' }}>{errors.name}</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input className="form-control" name='email' onChange={handleInput} value={userInput.email} id="inputEmail" type="email" placeholder="name@example.com" />
                                                            <label >Email address</label>
                                                        </div>
                                                        <span style={{ color: 'red' }}>{errors.email}</span>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" name='password' onChange={handleInput} value={userInput.password} id="inputPassword" type="password" placeholder="Create a password" />
                                                            <label >Password</label>
                                                        </div>
                                                        <span style={{ color: 'red' }}>{errors.password}</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" name='con_password' onChange={handleInput} value={userInput.con_password}  id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                            <label >Confirm Password</label>
                                                        </div>
                                                        <span style={{ color: 'red' }}>{errors.con_password}</span>
                                                        <span style={{ color: 'red' }}>{errora}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 mb-0">
                                                    <div className="d-grid"><button className="btn btn-outline-secondary btn-block" >Create Account</button></div>
                                                </div>
                                            </form>
                                            <br/>
                                            <div className="small text-center"><Link to="/login" className='text-primary'>Have an account? Go to login</Link></div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </div>
        </div>
    )
}

export default Register
