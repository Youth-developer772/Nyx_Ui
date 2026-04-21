import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './cssFolder/nav.css';
import Logo from './images/logo.png';
import { useContext, useState } from 'react';
import { Context } from './Hooks/context';

function Nav(){

  const ContextData=useContext(Context);
  const {color,setcolor,backcolor,setbackcolor}=ContextData;
  const nagivate=useNavigate();
    
    return(
        <>
        <div className='navcontainer'>
            <div className='nav' style={{background:color}}>
              <div className='navheader'>
                    <img src={Logo} alt='Logo'/>
                    <h2>POS SYSTEM</h2>
              </div>
              <div className='buttoncontainer'>
                <NavLink  to='posoverview' >Pos Overview</NavLink>
                <NavLink  to='posorder' >Order</NavLink>
                <NavLink  to='poscategory'>Category</NavLink>
                <NavLink  to='posproduct'>Product</NavLink>
                <NavLink  to='poscustomer'>Customer</NavLink>
                <NavLink  to='posinventory'>Inventory</NavLink>
                <NavLink  to='posreport'>Report</NavLink>
                <NavLink  to='possetting'>Setting</NavLink>
              </div>
            </div>
            <div className='dashboard' style={{background:backcolor}}>
               <Outlet/>
            </div>
        </div>
        </>
    )
}
export default Nav;