import React from 'react'
import { Link } from 'react-router-dom'
import not404 from '../../assets/not404.png'

function NotFound() {
    return (
        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <img className="mb-4 img-error" src={not404} />
                                    <p className="lead">This requested URL was not found on this server.</p>
                                    <Link to="/">
                                        <i className="fas fa-arrow-left me-1"></i>
                                        Return to Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default NotFound
