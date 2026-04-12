import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
function PosOrder(){
    let data=[
        {title:'Total Order',amount:'1200',lastorder:'1133'},
        {title:'Total Pending',amount:'95',lastorder:'83'},
        {title:'Total Completed',amount:'1200',lastorder:'1133'},
        {title:'Total Cancel',amount:'120',lastorder:'111'}
    ];
    let tabledata=[
        {id:'1',customer:'John',product:'Golf Bag',amount:"20,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Pending'},
        {id:'2',customer:'Msh',product:'Badminton',amount:"8,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Complete'},
        {id:'3',customer:'Feddy',product:'Adidas',amount:"250,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Cancel'}
    ];
    return(
        <>
        <div className="ordermain">
            <div className='orderheader'>
                <h2><AssignmentIcon/>Orders</h2>
                <div><input type="search" placeholder='Search...' /><SearchIcon/></div>
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
            <div className='posfooter'>
                <h2>Today's Order</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabledata.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.product}</td>
                                    <td>{item.amount}</td>
                                    <td style={{ color: '#6a7d95' }}>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}
export default PosOrder;