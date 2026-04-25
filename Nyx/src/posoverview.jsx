import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  ResponsiveContainer,} from "recharts";
import DollarIcon from '@mui/icons-material/Paid';
import ProductIcon from '@mui/icons-material/Widgets';
import CustomerIcon from '@mui/icons-material/Groups';
import Shoe from './images/shoe.png';
import { useContext } from "react";
import { Context } from "./Hooks/context";
function PosOverview(){

    const {backcolor}=useContext(Context);
    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }

    let data = [
            { name: "Jan", sales: 3000 },
            { name: "Feb", sales: 4000 },
            { name: "Mar", sales: 5000 },
            { name: "Apr", sales: 6000 },
            { name: "May", sales: 7000 },
            { name: "Jun", sales: 8000 },
        ];
    let tabledata=[
        {id:'1',customer:'John',product:'Golf Bag',amount:"20,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Pending'},
        {id:'2',customer:'Msh',product:'Badminton',amount:"8,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Complete'},
        {id:'3',customer:'Feddy',product:'Adidas',amount:"250,000ks",date:'17-03-2026',time:'02:45:37 AM', status:'Cancel'}
    ];
    let headerdata=[
        {title:'Total Revenue',amount:'60000ks',increasement:'11%',compare:'from yesterday'},
        {title:'Total Order',amount:'1200',increasement:'-3%',compare:'from yesterday'},
        {title:'Total Product',amount:'55',increasement:'+5',compare:'New Products'},
        {title:'Total Customers',amount:'245',increasement:'+12',compare:'New Customers'}
    ]
    return(
        <>
        <div className="posoverviewmain">
            <div className="posheader">
                <h1 style={FontStyle}>Point of Sale Overview Dashboard</h1>
                <p  style={FontStyle}>Welcome back.Here's today's shop overview</p>
            </div>
            <div className="posbody">
                {headerdata.map((item,index)=>{
                    return(
                        <div className="posbodyheader" key={index}>
                            <p>{item.title}</p>
                            <h3>{item.amount}</h3>
                            <h5><span>{item.increasement}</span>{item.compare}</h5>
                        </div>
                    )
                })}
            
            </div>
            <div className="posbody2">
                <div className="poschart">
                    <h2>Sale Statistics</h2>
                    <div style={{width:'100%',height:'270px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ccc"/>
                        <XAxis datakey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="red" />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="top">
                    <div className="topProduct" style={{background: Font_color && '#E1E1E1'}}>
                        <h2>Popular Product</h2>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',marginLeft:'1em'}}>
                            <img src={Shoe} alt="Product" />
                            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                                <p>Adidas Shoe</p>
                                <p>25000ks</p>
                            </div>
                        </div>
                    </div>
                     <div className="topProduct" style={{background: Font_color && '#E1E1E1'}}>
                        <h2>Popular Product</h2>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',marginLeft:'1em'}}>
                            <img src={Shoe} alt="Product" />
                            <div style={{display:'flex',flexDirection:'column',gap:'10px'}} >
                                <p>Adidas Shoe</p>
                                <p>25000ks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posfooter">
                <h2>Recent Order</h2>
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
export default PosOverview;