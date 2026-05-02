import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useRef, useState } from 'react';
import './cssFolder/posorder.css'
import { useGetCategory } from './Hooks/CustomHooks';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from './Hooks/context';
import { useUpdateFun } from './Hooks/UpdateFun';
import Swal from 'sweetalert2';
import TableLoading from './Components/tableloading';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import toast, { Toaster } from 'react-hot-toast';
import CustomerLoading from './Components/loadingcustomer';
import MobileOrder from './Routes/mobileorder';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';


function PosOrder(){
    const [show,setshow]=useState(false);
    const [img,setimg]=useState(null)

    const recepitimg = useRef();
    const nameref=useRef();
    const amountref=useRef();
    const paymentref=useRef();

    const navigate=useNavigate();

    const {Orders,GetOrders}=useGetCategory();
    const {UpdateOrder}=useUpdateFun();
    const {backcolor,Token}=useContext(Context);

    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    const ButtonStyle={
        color: Font_color ? '#0d1b2a': 'white',
        backgroundColor: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    

    let data=[
        {title:'Total Order',amount:'1200',lastorder:'1133'},
        {title:'Total Pending',amount:'95',lastorder:'83'},
        {title:'Total Completed',amount:'1200',lastorder:'1133'},
        {title:'Total Cancel',amount:'120',lastorder:'111'}
    ];


    //for img preview
    const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setimg(imageUrl);
    }
  };

  //for add order
  async function add_order(e){
    e.preventDefault();
    let formData= new FormData();
    formData.append('payment_image',recepitimg.current.files[0])
    formData.append('customer_name',nameref.current.value)
    formData.append('total_amount',amountref.current.value)
    formData.append('payment_method',paymentref.current.value)
    formData.append('payment_name','Delta_k')
    formData.append('phone','09923344564')
    try{
        const addorderloading=toast.loading('Adding Order');
        let response= await fetch(import.meta.env.VITE_ADD_ORDER,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${Token}`
            },
            body:formData
        })
        if(response.ok){
            await GetOrders();
            toast.success('Successfully Added',{id:addorderloading})
            setshow(false)
        }
        else{
            toast.error('failed adding',{id:addorderloading})
        }
    }catch(err){
        console.log(err)
        toast.error('failed adding',{id:addorderloading})
    }
  }
    
    
    return(
        <>
        <div className="ordermain">
            <Toaster />
            <div className='orderheader' style={FontStyle}>
                <h2><AssignmentIcon/>Orders</h2>
                <button className='addorderbutton' 
                onClick={()=>navigate('posaddorder')}
                style={ButtonStyle}
                ><NavLink to='posaddorder'>+ Add Order</NavLink></button>
            </div>
            <div className='orderbody'>
                {
                    data.map((item,index)=>{
                        return(
                            <div key={index} className='orderitem'>
                                <p>{item.title}</p>
                                <h4>{item.amount}</h4>
                                <p>Yesterday {item.lastorder}</p>
                        </div>
                        )
                    })
                }
            </div>
            <div className='Orderswitch'>
                <NavLink to='mobileorder'>Mobile Order</NavLink>
                <NavLink to='localorder'>Loacal Order</NavLink>
            </div>

            <div className='posfooter'>
                <Outlet />
            </div>

{/*for the popup_______________________________________________________________________________________________*/}
                {/* {
            show && (
                <div className="addorderpopupC">
                    <form className="addorderpopup" onSubmit={add_order}>
                                 
                        <div className="addorderpopupheader">
                            <h2>New Order</h2>
                            <span onClick={()=>setshow(false)}><CloseIcon/></span>
                        </div>
                    
                        <div className="addorderpopupbody">
                            <div className="left">
                                <div className="field">
                                    <h4>Customer Name</h4>
                                    <input type="text" ref={nameref}/>
                                </div>

                                
                    
                                <div className="field">
                                    <h4>Amount</h4>
                                    <input type="number" ref={amountref}/>
                                </div>

                                <div className="imageuploaddiv">
                                    <h4>Upload Image</h4>
                                    <div onClick={()=>recepitimg.current.click()}>
                                        {
                                            !(img) ?
                                        <>
                                        <UploadFileIcon/>
                                        <p>Upload</p>
                                        </>:
                                        <><img src={img} alt='recepit' 
                                        style={{width:'100%',height:'100%',borderRadius:'10px'}}/></>
                                        }
                                    </div>
                                    <input type='file'accept='image/*' 
                                    onChange={handleImageChange}
                                    ref={recepitimg} style={{display:'none'}}/>
                                </div>
                    
                            </div>
                    
                        <div className="right">
                            <div className="field">
                                <h4>Select Payment Method</h4>
                                    <select className="payment" ref={paymentref}>
                                        <option value="kpay">KBZ Pay</option>
                                        <option value="wave">Wave Pay</option>
                                        <option value="cash">Cash</option>
                                    </select>
                            </div>
                            <div className="paymentinfo">
                                <h4>Payment Info</h4>
                                <p>Kpay name: Admin Name</p>
                                <p>Kpay Number:09 xxx xxx xx</p>
                            </div>
                            <div className="addorderfooter">
                                <button type="submit" className="createbtn">
                                    Create
                                </button>
                                <button type="button" onClick={()=>setshow(false)} className="cancelbtn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
                )
            } */}
            
        </div>
        </>
    )
}
export default PosOrder;