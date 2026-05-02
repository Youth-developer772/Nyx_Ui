import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useGetCategory } from '../Hooks/CustomHooks';
import CustomerLoading from '../Components/loadingcustomer';
import Dropdownmenu from '../Components/Dropdownmenu';
import Swal from 'sweetalert2';

function LocalOrder(){


    const{LOrders,GetLocalOrders,GetOrders}=useGetCategory();
    console.log(LOrders)
    
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
        <div style={{padding:'10px',paddingTop:'0'}}>
        <div className='ordertableheader' >
            <h2>Today's Order</h2>
            <div className='ordersearch'>
                <input type="search" placeholder='Search...' name='ordersearch'/>
                    <SearchIcon />
            </div>
        </div>
        <table className='posordertable'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Receipt</th>
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
                Array.isArray(LOrders.data) && LOrders.data.length > 0 ?
                LOrders.data.map((item, index) => {
                    return (
                        <tr key={index} className='ordertablerow'>
                            <td>{item.order_id}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.Total}</td>
                            <td>{item.Date}</td>
                            <td>{item.Time}</td>
                            <td>{item.payment_method}</td>
                            <td className='imgcontainer'>
                                <img src={item.payment_proof} className='posorderimg'
                                onClick={() => showImagePreview(item.payment_proof)}
                                />
                            </td>
                            <td className={`${item.order_status.toLowerCase()}action`}><p>{item.order_status}</p></td>
                            <td className='actioncolumn'>
                                <Dropdownmenu data={item} refresh={GetOrders}/>
                            </td>
                        </tr>
                    );
                }): [...Array(12)].map((_, index) => (
                    <CustomerLoading key={index} times={9} />
                    ))
            }
            </tbody>
        </table>
        </div>
    )
}
export default LocalOrder;