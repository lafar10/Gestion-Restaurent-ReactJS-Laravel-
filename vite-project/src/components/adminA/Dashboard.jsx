import React, { useEffect, useState } from 'react'
import { BsHourglass } from 'react-icons/bs'
import axiosClient from '../../AxiosClient'

function Dashboard() {

    const [userCount, setUserCount] = useState()
    const [reservationCount, setReservationCount] = useState()
    const [totalearn, setTotalEarn] = useState()
    const [loading, setLoading] = useState(false)


    const usersCount = () => {

        setLoading(true)

        axiosClient.get('/orders-count').then(res => {

            if (res.data.status === 200) {

                setUserCount(res.data.orders)
            }
            setLoading(false)

        })

    }

    const total_Earn = () => {

        setLoading(true)

        axiosClient.get('/orders-earns').then(res => {

            if (res.data.status === 200) {

                setTotalEarn(res.data.sums)
            }
            setLoading(false)

        })

    }

    const reservationsCount = () => {

        setLoading(true)

        axiosClient.get('/reservations-count').then(res => {

            if (res.data.status === 200) {
                setReservationCount(res.data.reservation)
            }
            setLoading(false)

        })

    }

    useEffect(() => {

        reservationsCount()
        usersCount()
        total_Earn()
    }, [])

    return (
        <div className='container my-5'>
            <br />

            <div className='row g-3 col-md-12 mt-5 text-center' style={{ textAlign: "center", justifyContent: 'center' }}>
                <div className='col-lg-4'>
                    <div className='card  border-light'>
                        <div className='card-header bg-dark text-light border-light'>
                            <h5 className='display-6'>Today Reservations</h5>
                        </div>
                        <div className='card-body bg-dark text-warning'>
                            <br />
                            <h3 className='display-6'>{loading ? <span>loading<BsHourglass /></span> : reservationCount}</h3>
                            <br />
                        </div>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='card  border-light'>
                        <div className='card-header bg-dark text-light  border-light'>
                            <h5 className='display-6'>New Orders</h5>
                        </div>
                        <div className='card-body bg-dark text-warning'>
                            <br />
                            <h3 className='display-6'>{loading ? <span>loading<BsHourglass /></span> : userCount}</h3>
                            <br />
                        </div>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='card  border-light'>
                        <div className='card-header bg-dark text-light  border-light'>
                            <h5 className='display-6'>Total Earns DH's</h5>
                        </div>
                        <div className='card-body bg-dark text-warning'>
                            <br />
                            <h3 className='display-6'>{loading ? <span>loading<BsHourglass /></span> : totalearn} DH's</h3>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
