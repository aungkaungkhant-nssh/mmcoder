import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Axioss from '../config/Axioss'
import { CartContext } from '../context/CartContext';
import Master from './layouts/Master'

function Home() {
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState({data:[]});
    const [category,setCategory]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [api,setapi]=useState("/product")
    const [currentPage,setCurrentPage]=useState(1);
    const {cart,setCart}=useContext(CartContext)
    useEffect(()=>{
        Axioss.get(api).then((res)=>{
            setLoading(false)
            setData(res.data.data);
        })
        Axioss.get("/category").then((res)=>{
            setLoading(false)
            setCategory(res.data.data)
        })
    },[api])
    const renderNextPage=()=>{
        const page=currentPage+1;
        setCurrentPage(page);
        
        if(selectedCategory===null){
            setapi(`/product?page=${page}`)
        }else{
            setapi(`/product?page=${page}&category_id=${selectedCategory}`)
        }   
    }
    const renderPrevPage=()=>{
        const page=currentPage-1;
        setCurrentPage(page);
        if(selectedCategory===null){
            setapi(`/product?page=${page}`)
        }else{
            setapi(`/product?page=${page}&category_id=${selectedCategory}`)
        } 
    }
    const renderProductByCategory=(id)=>{
        setSelectedCategory(id);
        setCurrentPage(1);
        setapi(`/product?category_id=${id}`)
    }
    const addToCart=(d)=>{
       let isValid=false;
       cart.forEach((c)=>{
           if(c.id==d.id){
               c.count++;
               isValid=true
           }
       })
       if(!isValid){
           setCart([...cart,{...d,count:1}])
       }
    }
    return (
        <Master>
            {
                loading?<Loader />:
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-3">
                                <div>
                                {
                                    category.map((c)=>(
                                        <span className={c.id==selectedCategory?"btn btn-sm btn-dark":"btn btn-sm btn-outline-dark"} 
                                        style={{marginRight:"5px"}} 
                                        onClick={()=>renderProductByCategory(c.id)}>
                                            {c.name}
                                        </span>  
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div>
                                <button className="btn btn-primary btn-sm" style={{marginRight:"10px"}} disabled={data.prev_page_url===null?true:false} onClick={renderPrevPage}>
                                    <i className="fas fa-arrow-left"></i>
                                </button>
                                <button className="btn btn-primary btn-sm" disabled={data.next_page_url===null?true:false} onClick={renderNextPage}>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        {
                            data.data.map((d)=>(
                            <div className="col-md-3">
                                <div className="card">
                                    <img src={`http://localhost:8000/images/${d.image}`} alt="" />
                                    <div className="card-body">
                                        <h4 className="text-center">{d.name}</h4>
                                        <div className="d-flex justify-content-between">
                                            <span className="btn btn-sm btn-outline-warning">{d.price}</span>
                                            <span className="btn btn-sm btn-danger" onClick={()=>addToCart(d)}>Add To Carts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        
                    </div>
                </div>
            }

            
        </Master>
    )
}

export default Home
