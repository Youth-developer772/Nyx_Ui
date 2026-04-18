import InventoryIcon from '@mui/icons-material/DensityMediumOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import './cssFolder/posinventory.css';
import { useGetCategory } from './Hooks/CustomHooks';
function PosInventory(){
    const {Categories}=useGetCategory();
    let Condition=[
        {title:'Total Inventory',data:'1200'},
        {title:'Out of Stocks',data:'98'},
        {title:'Out of Stocks',data:'98'},
        {title:'Top Categories',data:'Badminton'},
    ]
    let itemdata=[
        {id:1,productId:1,productName:'Badminton',prodcutCategory:'Badminton',tag:"New Arrival",date:'26/3/26',stocks:145,staus:'stock'},
        {id:2,productId:2,productName:'Ball',prodcutCategory:'Foodball',tag:"Special Promotion",date:'26/3/26',stocks:0,staus:'out of stock'},
    ]
    return(
        <>
        <div className="posinventorymain">
            <h1 className='Inventorytitle'><InventoryIcon className='inventoryIcon'
            />Inventory</h1>
            <div className='inventoryCondition'>
                {Condition.map((item,index)=>{
                    return(
                        <div key={index} className={`condition${index}`}>
                            <p>{item.title}</p>
                            <h4>{item.data}</h4>
                        </div>
                    )
                })}
            </div>
            <div className="inventoryheader">
                <h2>Product Stocks Overview</h2>
                    <select>
                       {Array.isArray(Categories.data) && Categories.data.length > 0 ?
                            Categories.data.map((item,index)=>{
                                return(
                                    <option key={index} value={item.name}>{item.name}</option>
                                    )
                                }): (<option>Loading...</option>)  
                            } 
                    </select>   
                    <div>
                        <input type="search" placeholder='Search..' />
                        <SearchIcon style={{color:'white'}}/>
                    </div>
            </div>
            <div className='inventorytablecontainer'>
                    <table className='inventorytable'>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Tags</th>
                                <th>Date</th>
                                <th>Current Stocks</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {itemdata.map((item,index)=>{
                                return(
                                    <tr key={index} className='test'>
                                        <td>{item.id}</td>
                                        <td>{item.productId}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.prodcutCategory}</td>
                                        <td>{item.tag}</td>
                                        <td>{item.date}</td>
                                        <td>{item.stocks}</td>
                                        <td>{item.staus}</td>
                                        <td className='invbutcontainer'>
                                            <div>
                                                <button className='Ibtn1'>View</button>
                                                <button className='Ibtn2'>Delete</button>
                                            </div>
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
export default PosInventory;