import React, { useState,useContext} from 'react'
import Axioss from '../config/Axioss';
import Master from './layouts/Master'
import { useNavigate } from "react-router-dom";
import {CartContext} from '../context/CartContext'
function Order() {
    let navigate = useNavigate();
    const {cart}=useContext(CartContext);
    const [shipping,setShipping]=useState({name:"",address:"",phone:"",delivery:false,cart});
  
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
             let res=await Axioss.post("/order",shipping)
            console.log(res)
             navigate("/");
        }catch(error){
            console.log(error);
        }
    }
    const handleChange=e=>{
        setShipping({
            ...shipping,
            [e.target.name]:e.target.checked||e.target.value
        })
    }
    return (
        <Master>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0 text-center">Shipping Address</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={shipping.name} name="name" onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea className="form-control" name="address" onChange={handleChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="number" className="form-control" value={shipping.phone}  name="phone" onChange={handleChange}/>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input"  checked={shipping.delivery} name="delivery" onChange={handleChange}/>
                                    <label class="form-check-label" for="exampleCheck1">Delivery</label>
                                </div>
                                <input type="submit" className="btn btn-primary mt-3"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default Order
