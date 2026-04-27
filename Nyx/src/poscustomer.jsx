import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import './cssFolder/PosCustomer.css';
import { useContext } from 'react';
import { Context } from './Hooks/context';
import { useGetCategory } from './Hooks/CustomHooks';
function PosCustomer(){
    

    const {backcolor}=useContext(Context);
    const {GetCustomer,Customers}=useGetCategory();
    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    const InputStyle={
        backgroundColor: Font_color ? '#E1E1E1' : '#0D1B2A'
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
                                        <td>{item.adderss}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>....</td>
                                        <td className='customerbuttoncontainer'>
                                            <button className='editbutton'>Edit</button>
                                            <button className='deletebutton'>Delete</button>
                                        </td>
                                    </tr>
                                )
                        }): <tr><td>Loading..</td></tr>
                    }
                    </tbody>
                </table>
            </div>
          </div>
        </>
    )
}
export default PosCustomer;