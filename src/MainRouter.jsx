import React from 'react'
import {
    Routes,
    Route
  } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart';
import Order from './pages/Order';
const MainRouter=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/order" element={<Order />}></Route>
        </Routes>
    )
}
export default MainRouter;