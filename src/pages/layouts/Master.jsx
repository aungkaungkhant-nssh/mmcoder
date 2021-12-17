import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
function Master({children}) {
    const {cart}=useContext(CartContext)
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Smart Watch</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart
                                 <span className="badge badge-danger ml-1">{
                                   cart.length
                                 }</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
            </nav>
            <div className="container p-5">
                {children}
            </div>
        </React.Fragment>
    )
}

export default Master
