import { NavLink, Outlet } from 'react-router-dom';
import './cssFolder/possetting.css';
import SettingsIcon from '@mui/icons-material/Settings';

function PosSetting(){
    return(
        <>
        <div className="possettingcontainer">
            <h2 className='possettingheader'><SettingsIcon /> Setting</h2>

            <div className='possettingnav'>
                <NavLink to='generalsetting'>General Setting</NavLink>
                <NavLink to='staffmanagement'>Staff Management</NavLink>
                <NavLink to='paymenttax'>Payment and Tax</NavLink>
                <NavLink to='apperance'>Appearance</NavLink>
            </div>
            <Outlet />
        </div>
        </>
    )
}
export default PosSetting;