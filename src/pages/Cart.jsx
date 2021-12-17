import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import Master from './layouts/Master'

function Cart() {
    const {cart}=useContext(CartContext)
    return (
       <Master>
           <table className="table table-striped">
               <thead>
                   <tr>
                       <th>Image</th>
                       <th>Name</th>
                       <th>Price</th>
                       <th>Count</th>
                   </tr>
               </thead>
               <tbody>
                   {
                       cart.map((c)=>(
                           <tr>
                               <td><img src={`http://localhost:8000/images/${c.image}`} alt="" style={{width:"200px"}}/></td>
                               <td>{c.name}</td>
                               <td>{c.price}</td>
                               <td>{c.count}</td>
                           </tr>
                       ))
                   }
               </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" align="right">Total Price</td>
                        <td>{cart.reduce((a,c)=>a+c.price*c.count,0)}</td>
                    </tr>
                    <tr>
                       <td colSpan="3" align="right">
                             <Link to="/order" className="btn btn-primary">Order Now</Link >
                       </td>
                    </tr>
                </tfoot>
           </table>
       </Master>
    )
}

export default Cart
