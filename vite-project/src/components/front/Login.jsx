import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../AxiosClient'
import { useStateContext } from '../../ContextProvider'
import swal from 'sweetalert'
import '../../assets/front/front.css'
import logo from '../../assets/img/logos.png'

function Login() {

    const navigate = useNavigate()
    const { user, token, setToken, setUser, role_as } = useStateContext()
    const [loginInput, setLogin] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const [errora, setErrorA] = useState([])

    if (token) {
        return <Navigate to='/dashboard' />
    }

    const handleInput = (e) => {
        e.persist()

        setLogin({ ...loginInput, [e.target.name]: e.target.value })
    }

    const loginSubmit = (e) => {

        e.preventDefault()

        const data = loginInput

        /* axiosClient.get('/sanctum/csrf-cookie').then(res => {}) */

        axiosClient.post('/user-login', data).then(res => {

            if (res.data.status === 200) {
                setToken(res.data.token)
                setUser(res.data.user)
                localStorage.setItem('user_name', res.data.user.name)
                localStorage.setItem('user_id', res.data.user.id)
                localStorage.setItem('Role_As', res.data.user.type)
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                })

                if (res.data.user.type === 'admin') {
                    navigate('/dashboard')
                }
                else if (res.data.user.type === 'user') {
                    navigate('/home')
                }


            } else if (res.data.status === 405) {
                swal("Warning", res.data.message, "warning");

            } else if (res.data.status === 500) {
                setErrors(res.data.message_errors)
            }
        })
    }

    return (
        <div id='bgi' >
            <div id="layoutAuthentication" >
                <Link to='/home' className='text-white text-decoration-none mt-4 ms-5'><img src={logo} style={{ width: '160px', height: '100px' }} align="center" /></Link>
                <div id="layoutAuthentication_content" >
                    <main >
                        <div className="container" >
                            <div className="row justify-content-center ">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0  rounded-lg mt-3  shadow-lg animatedA fadeInDownA" >
                                        <div className="card-header bg-white"><h3 className="display-6 text-center text-dark">Login</h3></div>
                                        <br />

                                        <h5 className='text-danger text-center'>{errora}</h5>
                                        <div className="card-body">
                                            <form onSubmit={loginSubmit}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" name='email' onChange={handleInput} value={loginInput.email} id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                    <span style={{ color: 'red' }}>{errors.email}</span>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" name='password' onChange={handleInput} value={loginInput.password} id="inputPassword" type="password" placeholder="Password" />
                                                    <label htmlFor="inputPassword">Password</label>
                                                    <span style={{ color: 'red' }}>{errors.password}</span>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Link className="small" to="password.html">Forgot Password?</Link>
                                                    <button className="btn btn-secondary" >Login</button>
                                                </div>
                                                <br />
                                                <div className="small text-center"><Link to="/register" className='text-primary text-center'>Need an account? Sign up!</Link></div>

                                            </form>
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

export default Login
