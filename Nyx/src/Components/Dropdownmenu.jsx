import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from 'react';
import './dropdownmenu.css';
import { Context } from '../Hooks/context';
import { useGetCategory } from '../Hooks/CustomHooks';

function Dropdownmenu({data,refresh}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {childdata,setchilddata,Token}=useContext(Context);
//   const {UpdateOrder}=useUpdateFun();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  async function UpdateOrder(item) {
        
        let id=item.OrderNo;
        try {
            let reponse= await fetch(`${import.meta.env.VITE_UPDATE_ORDER}/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${Token}`
                },
                body: JSON.stringify({action:item.action.toLowerCase()})
            })
            if(reponse.ok){
              await refresh();
            }
        } catch (error) {
            console.log(error);
        }
        
    }

   
  function handleUpdate(e){
    let action=e.currentTarget.innerText
    UpdateOrder({...data,action:action})
    handleClose()
  }
  
  return (
    <div>
      <Button 
      className='dropbutton1'
      onClick={handleClick}>Action</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleUpdate} className='dropbuttonchild'>Pending</MenuItem>
        <MenuItem onClick={handleUpdate} className='dropbuttonchild'>Completed</MenuItem>
        <MenuItem onClick={handleUpdate} sx={{ color: 'red' }} className='dropbuttonchild'>Cancel</MenuItem>
      </Menu>
    </div>
  );
}
export default Dropdownmenu;