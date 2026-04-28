import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import './cssFolder/PosCustomer.css';
import { useContext } from 'react';
import { Context } from './Hooks/context';
import { useGetCategory } from './Hooks/CustomHooks';
import CustomerLoading from './Components/loadingcustomer';
function PosCustomer(){
    

    const {backcolor,Token}=useContext(Context);
    const {GetCustomer,Customers}=useGetCategory();
    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    const InputStyle={
        backgroundColor: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    console.log(Customers)
    async function delete_customer(id){
        try{
            let response = await fetch(`${import.meta.env.VITE_DELETE_CUSTOMER}/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${Token}`
                }
            })
            if(response.ok){
                await GetCustomer();
            }else{

            }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
          <div className="Poscustomermain">
            <div className='Poscustomerheader'>
                <h1 style={FontStyle}><PersonIcon style={{fontSize:'35px'}}/>Customers</h1>
                <div style={InputStyle}>
                    <input type="search" placeholder='Search...' style={{color: !backcolor ? 'white' : '#0D1B2A'}} />
                    <SearchIcon/>
                </div>
            </div>
            <div className="customertableContainer">
                <table className='customertable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Remark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(Customers.showCustomerData) && Customers.showCustomerData.length > 0 ?
                            Customers.showCustomerData.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>....</td>
                                        <td className='customerbuttoncontainer'>
                                            <button className='editbutton'>warning</button>
                                            <button className='deletebutton' onClick={()=>delete_customer(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                        }): (
                                [...Array(10)].map((_, index) => (
                                <CustomerLoading key={index} />
                                ))
                            ) 
                    }
                    </tbody>
                </table>
            </div>
          </div>
        </>
    )
}
export default PosCustomer;