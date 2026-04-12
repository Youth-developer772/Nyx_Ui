import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import './cssFolder/PosCustomer.css';
function PosCustomer(){
    let tabledata=[
        {id:1,name:"Mg Mg",adderss:'Yangon',phone:'09333455666',email:'mgmg@gmail.com',remark:'...'},
        {id:1,name:"Ma Ma",adderss:'Yangon',phone:'09593855666',email:'mama@gmail.com',remark:'...'},
    ];
    return(
        <>
          <div className="Poscustomermain">
            <div className='Poscustomerheader'>
                <h1><PersonIcon style={{fontSize:'larger'}}/>Customers</h1>
                <div><input type="search" placeholder='Search...' /><SearchIcon/></div>
            </div>
            <div className="customertableContainer">
                <table className='customertable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Remark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabledata.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.adderss}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.remark}</td>
                                    <td className='customerbuttoncontainer'>
                                        <button className='editbutton'>Edit</button>
                                        <button className='deletebutton'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
          </div>
        </>
    )
}
export default PosCustomer;