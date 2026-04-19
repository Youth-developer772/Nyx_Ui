import './cssFolder/posreport.css';
import ReportIcon from '@mui/icons-material/AssessmentOutlined';
import DollarIcon from '@mui/icons-material/Paid';
import ProductIcon from '@mui/icons-material/Widgets';
import CustomerIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/SearchSharp';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  ResponsiveContainer,} from "recharts";
import TriangleIcon from '@mui/icons-material/EjectSharp';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useRef } from 'react';

function PosReport(){

const chartsref =useRef(null);
const tableref =useRef(null);

let data = [
            { name: "Jan", sales: 3000 },
            { name: "Feb", sales: 4000 },
            { name: "Mar", sales: 5000 },
            { name: "Apr", sales: 6000 },
            { name: "May", sales: 7000 },
            { name: "Jun", sales: 8000 },
        ];

let tabledata=[
    {orderId:'ORD1',customer:'John Doe',product:'Badminton',amount:'5000ks',date:'2024-01-01',time:'10:00 AM',payment:'KBZ Pay',orderStatus:'Completed'},
    {orderId:'ORD2',customer:'Jane Smith',product:'Football',amount:'3000ks',date:'2024-01-02',time:'11:30 AM',payment:'KBZ Pay',orderStatus:'Pending'},
    {orderId:'ORD3',customer:'Alice Johnson',product:'Tennis Racket',amount:'7000ks',date:'2024-01-03',time:'02:15 PM',payment:'Cash',orderStatus:'Completed'},
    {orderId:'ORD4',customer:'Bob Brown',product:'Basketball',amount:'4000ks',date:'2024-01-04',time:'04:45 PM',payment:'Wave Pay',orderStatus:'Cancelled'},
    {orderId:'ORD5',customer:'Charlie Davis',product:'Golf Clubs',amount:'9000ks',date:'2024-01-05',time:'09:20 AM',payment:'Wave Pay',orderStatus:'Completed'},
];

    async function handleExport() {
        if (chartsref.current) {
            const canvas = await html2canvas(chartsref.current,{
                logging: false,
                useCORS: true, 
                backgroundColor: '#ffffff'
            });
            canvas.toBlob((blob) => {
                saveAs(blob, 'sales-report.png');
            });
        }
    }   

    async function handleExportTable() {
        if (tableref.current) {
            const canvas = await html2canvas(tableref.current,{
                logging: false,
                useCORS: true, 
                backgroundColor: '#ffffff'
            });
            canvas.toBlob((blob) => {
                saveAs(blob, 'sales-report.png');
            });
        }
    }   

    return(
        <>
        <div className="posreportcontainer">
            <h1 className="reporttitle"><ReportIcon className='titleicon'/> Report</h1>
            <div className="tilteline">
               
            </div>

            <div className="posreportbody">

                <div className="posreporttitle">
                    <p>Total Revenue <DollarIcon/></p>
                    <h3>60000ks</h3>
                    <h5> <TriangleIcon style={{color:'green',fontSize:'30px'}}/><span>11%</span></h5>
                </div>

                <div className="posreporttitle">
                    <p>Order Received <ProductIcon/></p>
                    <h3>1200</h3>
                    <h5><TriangleIcon style={{color:'red',fontSize:'30px',transform:'rotate(180deg)'}}/><span>-3%</span></h5>
                </div>

                <div className="posreporttitle">
                    <p>Total Product <ProductIcon/></p>
                    <h3>55</h3>
                    <h5><TriangleIcon style={{color:'green',fontSize:'30px'}}/><span>+5%</span></h5>
                </div>

                <div className="posreporttitle">
                    <p>Total Customers<CustomerIcon/></p>
                    <h3>245</h3>
                    <h5><TriangleIcon style={{color:'green',fontSize:'30px'}}/><span>+12</span></h5>
                </div>

            </div>
            
            <div className='posreportbody2'>

                <div className='posreportbody2header'>
                    <h2>Sale Trends</h2>
                    <div>
                        <input type='search' placeholder='Search...' />
                        <SearchIcon style={{color:'white',paddingRight:'5px',fontSize:'30px'}}/>
                    </div>
                    <button onClick={handleExport}><SaveAltIcon /> Export</button>
                </div>

                <div className='posreportbody2secheader'>
                    <input type='date' />
                    <input type='date' />
                </div>

                <div style={{width:'100%',height:'270px',
                    paddingRight:'10px',marginTop:'10px',
                    paddingTop:'20px',paddingBottom:'20px',
                    }} ref={chartsref}>
                    <ResponsiveContainer width="100%" height="100%"  >
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


            <div className="posreportbody2 posreporttalbecontainer">
                <div className='posreportbody2header'>
                    <h2>Sale Trends</h2>
                    <div>
                        <input type='search' placeholder='Search...' />
                        <SearchIcon style={{color:'white',paddingRight:'5px',fontSize:'30px'}}/>
                    </div>
                    <button onClick={handleExportTable}><SaveAltIcon /> Export</button>
                </div>

                <div className='posreportbody2secheader'>
                    <input type='date' />
                    <input type='date' />
                </div>
                <div className='posreporttablecontainer' ref={tableref}>
                    <table className='posreporttable'>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Customer</th>
                                <th>Product </th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Payment</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabledata.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.orderId}</td>
                                        <td>{item.customer}</td>
                                        <td>{item.product}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>{item.payment}</td>
                                        <td >
                                            <span className={`posreporttable${item.orderStatus.toLowerCase()}`}>{item.orderStatus}</span>
                                        </td>
                                    </tr>
                                )
                            })
}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        </>
    )
}
export default PosReport;



// Tommorrow's task: 1.function change handleExportTabel to export excel file instead of image. 2. Add pagination to the table. 3. Add filter by order status and payment method. 4. Add sorting by date and amount.