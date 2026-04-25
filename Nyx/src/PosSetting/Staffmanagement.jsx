import { useContext } from 'react';
import '../PosSettingCss/staffmanagement.css';
import { Context } from '../Hooks/context';

function StaffManagement(){

    const {backcolor}=useContext(Context);
    const Font_Color= Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_Color ? 'white': '#0D1B2A',
    }
    const ButtonStyle={
        color: Font_Color && '#0D1B2A',
        background: Font_Color && 'white'
    }

    let staffData=[
        {id:1,name:'Mg Mg',email:'mgmg@example.com',role:'Admin',status:'active'},
        {id:2,name:'Aye Aye',email:'ayeaye@example.com',role:'Manager',status:'active'},
        {id:3,name:'Zaw Zaw',email:'zawzaw@example.com',role:'Cashier',status:'active'},
    ]
    return(
        <div className="staffmanagementmain">
            <div className="SMB1">
                <h3 style={FontStyle}>Staff Management</h3>
                <button style={ButtonStyle}>+ Add New Staff</button>
            </div>
            <div className='stafftablecontainer'>
                <table className='stafftable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffData.map((staff) => (
                            <tr key={staff.id}>
                                <td>{staff.id}</td>
                                <td>{staff.name}</td>
                                <td>{staff.email}</td>
                                <td>{staff.role}</td>
                                <td style={{color:'#16F90E'}}>{staff.status}</td>
                                <td >
                                    <button style={{background:'#16f90ea6'}}>Edit</button>
                                    <button style={{background:'#D12C2C'}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='SMF'>
                <h3 className='SMB2' style={FontStyle}>Role & Permission Overview</h3>
                <div className='SMB3' style={{background: backcolor ? '#E1E1E1':'#0d1b2a4d'}}>
                    <ul>
                        <li className='taskheader'>Admin</li>
                        <li>All Access Granted</li>
                        <li>Management staff & roles</li>
                        <li>Edit store settings</li>
                        <li>View Detailed Reports</li>
                        <li>Delete/Refund Transactions</li>
                    </ul>
                <ul>
                        <li className='taskheader'>Manager</li>
                        <li>View sales Analytics</li>
                        <li>Manage inventory</li>
                        <li>Update order status</li>
                        <li>View customer data</li>
                        <li>Restricion</li>
                </ul>
                <ul>
                        <li className='taskheader'>Cashier</li>
                        <li>View Sales Analytics</li>
                        <li>Manage inventory</li>
                        <li>Update order status</li>
                        <li>View customer data</li>
                        <li>Restricion</li>
                </ul>
                </div>
            </div>
        </div>
    )
}
export default StaffManagement;