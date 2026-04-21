import { BrowserRouter,Routes,Route, Outlet, Navigate} from 'react-router-dom';
import Nav from './nav';
import './App.css'
import PosOverview from './posoverview';
import Classnav from './classnav';
import PosOrder from './posorder';
import PosCategory from './poscategory';
import PosProduct from './posproduct';
import PosCustomer from './poscustomer';
import PosInventory from './posinventory';
import PosReport from './posreport';
import PosSetting from './possetting';
import AddProduct from './posproductadd';
import PosGeneralSetting from './PosSetting/Generalsetting';
import StaffManagement from './PosSetting/Staffmanagement';
import PosPaymentTax from './PosSetting/PaymentTax';
import PosApperance from './PosSetting/Appernace';
import { Context } from './Hooks/context';
import { useState } from 'react';

function App(){
 
  const [NavColor,setNavColor]=useState(localStorage.getItem('navcolor') || '#0D1B2A')
  const [BackColor,setBackColor]=useState(localStorage.getItem('background') || '#F0F0F0')
 
  return(
    <>
    <Context.Provider value={{color:NavColor,setcolor:setNavColor,backcolor:BackColor,setbackcolor:setBackColor}}>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Nav/>}>

        <Route index  element={< Navigate to='/posoverview' replace/>}/>

        <Route path='posoverview' element={<PosOverview/>}/>

        <Route path='posorder' element={<PosOrder/>}/>

        <Route path='poscategory' element={<PosCategory/>}/>

        <Route path='posproduct' element={<PosProduct/>}>
          <Route path='posaddproduct' element={<AddProduct/>}/>
        </Route>

        <Route path='poscustomer' element={<PosCustomer/>}/>

        <Route path='posinventory' element={<PosInventory/>}/>

        <Route path='posreport' element={<PosReport/>}/>

        <Route path='possetting' element={<PosSetting/>}>
          <Route index  element={< Navigate to='generalsetting' replace/>}/>
          <Route path='generalsetting' element={<PosGeneralSetting/>}/>
          <Route path='staffmanagement' element={<StaffManagement/>}/>
          <Route path='paymenttax' element={<PosPaymentTax/>}/>
          <Route path='apperance' element={<PosApperance/>}/>
        </Route>

        </Route>


        <Route path='/classnav' element={<div><h1>Hello world2</h1><Outlet/></div>}>
        <Route index element={<Classnav/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  )
}
export default App;