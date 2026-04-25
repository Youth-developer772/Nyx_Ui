import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useState } from 'react';
import './cssFolder/posorder.css'
import { useGetCategory } from './Hooks/CustomHooks';
import CloseIcon from '@mui/icons-material/Close';
import Dropdownmenu from './Components/Dropdownmenu';
import { Context } from './Hooks/context';
import { useUpdateFun } from './Hooks/UpdateFun';
import Swal from 'sweetalert2';

function PosOrder(){
    const [show,setshow]=useState(false);

    const {Orders,GetOrders}=useGetCategory();
    const {UpdateOrder}=useUpdateFun();
    const {backcolor}=useContext(Context);

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


    async function DeleteOrder(OrderID){
        try{
            let reponse=await fetch(`${import.meta.env.VITE_DELETE_ORDER}/${OrderID}`,{
                method:'DELETE'
            })
            if(reponse.ok){
                GetOrders();
            }
        }catch(err){
            console.log(err)
        }
    }

    //for img preview
    const showImagePreview = (imageUrl) => {
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: 'Payment Proof',
            showConfirmButton: false, 
            showCloseButton: false,
            background: 'transparent', 
            customClass: {
                image: 'preview-image-style'
            }
        });
    };
    
    return(
        <>
        <div className="ordermain">
            <div className='orderheader' style={FontStyle}>
                <h2><AssignmentIcon/>Orders</h2>
                <button className='addorderbutton' 
                onClick={()=>setshow(true)}
                style={ButtonStyle}
                >+ Add Order</button>
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

            {
            show && (
                <div className="addorderpopupC">
                    <form className="addorderpopup">
                                 
                        <div className="addorderpopupheader">
                            <h2>New Order</h2>
                            <CloseIcon />
                        </div>
                    
                        <div className="addorderpopupbody">
                            <div className="left">
                                <div className="field">
                                    <h4>Customer Name</h4>
                                    <input type="text" />
                                </div>
                    
                                <div className="field">
                                    <h4>Amount</h4>
                                    <input type="number" />
                                </div>
                    
                                <div className="field">
                                    <h4>Upload Image</h4>
                                    <input type="file" />
                                </div>
                        </div>
                    
                        <div className="right">
                            <div className="field">
                                <h4>Select Payment Method</h4>
                                    <select className="payment">
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
                                <button type=":submit" className="cancelbtn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
                )
            }

            <div className='posfooter'>
                <div className='ordertableheader'>
                    <h2>Today's Order</h2>
                    <div className='ordersearch'>
                        <input type="search" placeholder='Search...' name='ordersearch'/>
                        <SearchIcon />
                    </div>
                </div>
                <table className='posordertable'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                            <th>Payment Proof</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        Array.isArray(Orders.data) && Orders.data.length > 0 ?
                        Orders.data.map((item, index) => {
                            return (
                                <tr key={index} className='ordertablerow'>
                                    <td>{item.OrderNo}</td>
                                    <td>{item.Customer}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Date}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.Payment}</td>
                                    <td className='imgcontainer'>
                                        <img src={item.PaymentProof} className='posorderimg'
                                        onClick={() => showImagePreview(item.PaymentProof)}
                                        />
                                    </td>
                                    <td className={`${item.OrderStatus.toLowerCase()}action`}><p>{item.OrderStatus}</p></td>
                                    <td className='actioncolumn'>
                                        <Dropdownmenu data={item} refresh={GetOrders}/>
                                        <button className='orderdeleteIcon'
                                        onClick={()=>{DeleteOrder(item.OrderNo)}}
                                        ><DeleteIcon/></button>
                                    </td>
                                </tr>
                            );
                        }): <tr><td>Loading....</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default PosOrder;