import { BrowserRouter,Routes,Route, Outlet, Navigate} from 'react-router-dom';
import Nav from './nav';
import './App.css'
import PosOverview from './posoverview';
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
import Login from './Account/login';
import PosLogin from './Account/poslogin';
import AcademicLogin from './Account/academiclogin';
import PosProtectedRoute from './Hooks/PosProtectedRoute';
import ClassNav from './Class/classnav';
import ClassOverview from './Class/classoverview';
import ClassSchedule from './Class/classschedule';
import ClassList from './Class/classlist';
import ClassStudent from './Class/classstudent';
import ClassCourt from './Class/classcourt';
import ClassMember from './Class/classmember';
import ClassEquipment from './Class/classequipment';
import ClassOrder from './Class/classorder';
import ClassProduct from './Class/classproduct';
import ClassCustomer from './Class/classcustomer';
import ClassReport from './Class/classreport';
import ClassInventory from './Class/classinventory';
import ClassSetting from './Class/classsetting';
import MobileOrder from './Routes/mobileorder';
import LocalOrder from './Routes/localorder';
import AddOrder from './Routes/AddOrder';

function App(){
  const [childData,SetchildData]=useState({});
  const [NavColor,setNavColor]=useState(localStorage.getItem('navcolor') || '#0D1B2A')
  const [BackColor,setBackColor]=useState(localStorage.getItem('background') || '#F0F0F0')
  const [token,settoken]=useState(localStorage.getItem('JWTToken') || false);

  const Token=localStorage.getItem('JWTToken');
 
  return(
    <>
    <Context.Provider value={{
      color:NavColor,setcolor:setNavColor,
      backcolor:BackColor,setbackcolor:setBackColor,
      Token:token,setToken:settoken,
      childdata:childData,setchilddata:SetchildData,
      Token
      }}>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={
           <PosProtectedRoute><Nav/></PosProtectedRoute>
          }>

        <Route index  element={< Navigate to='/posoverview' replace/>}/>

        <Route path='posoverview' element={ <PosOverview/> }/>

        <Route path='posorder' element={<PosOrder/>}>
        <Route index element={< Navigate to='mobileorder' replace />} />
        <Route path='mobileorder' element={<MobileOrder />}/>
        <Route path='localorder' element={<LocalOrder />} />
        <Route path='posaddorder' element={<AddOrder />}/>
        </Route>

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

        <Route path='/class' element={<ClassNav/>}>
          <Route index  element={< Navigate to='classoverview' replace />} />
          <Route path='classoverview'element={<ClassOverview />} />
          <Route path='classschedule' element={<ClassSchedule/>} />
          <Route path='classlist' element={<ClassList/>} />
          <Route path='classstudent' element={<ClassStudent />} />
          <Route path='classcourt' element={<ClassCourt/>} />
          <Route path='classmembers' element={<ClassMember />} />
          <Route path='classequipment' element={<ClassEquipment />} />
          <Route path='classorder' element={<ClassOrder />} />
          <Route path='classproduct' element={<ClassProduct />} />
          <Route path='classcustomer' element={<ClassCustomer />} />
          <Route path='classinventory' element={<ClassInventory />} />
          <Route path='classreport' element={<ClassReport />} />
          <Route path='classsetting' element={<ClassSetting />} />
        </Route>

      <Route path='login' element={<Login/>}>
        <Route index element={< Navigate to='poslogin' replace />}/>
        <Route path='poslogin' element={<PosLogin/>}/>
        <Route path='academiclogin' element={<AcademicLogin/>}/>
      </Route>

      </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  )
}
export default App;