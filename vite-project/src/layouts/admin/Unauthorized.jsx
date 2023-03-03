import React from 'react'
import not401 from '../../assets/401.svg'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <img className="mb-4 img-error" src={not401} />
                                    <p className="lead">You are Unauthorized As Your Are an Admin.</p>
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

export default Unauthorized
