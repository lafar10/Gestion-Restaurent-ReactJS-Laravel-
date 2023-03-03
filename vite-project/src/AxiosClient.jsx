import {React, useEffect} from 'react'
import axios from "axios"
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const axiosClient = axios.create({

    baseURL: 'http://localhost:8000/api'

})

axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN')

    config.headers.Authorization = 'Bearer '+ token;

    return config;

})

axiosClient.interceptors.response.use(undefined,function axiosRetryInterceptor(err){

    if(err.response.data.status === 401)
    {
        const navigate = useNavigate()
        swal("Error",err.response.data.message,"error")
        localStorage.removeItem('ACCESS_TOKEN')
        navigate('/login');
    }
    return Promise.reject(err);
});

axiosClient.interceptors.response.use(function (response){

    return response;
},function (error){

    if(error.response.data.status === 403)
    {
        const navigate = useNavigate()
        swal("Unauthorized",error.response.data.message,"warning")
        localStorage.removeItem('ACCESS_TOKEN')
        navigate('/Unauthorized');
    }
    return Promise.reject(error);
});
/*
axiosClient.interceptors.response.use((response) => {

    return response;

}, (error) => {

    try {

        const { response } = error;

        if (response.status === 401) {

            localStorage.removeItem('ACCESS_TOKEN')

        }

    } catch (error) {
        console.error(error)
    }


    throw error;

}) */

export default axiosClient
