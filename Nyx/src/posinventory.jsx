import InventoryIcon from '@mui/icons-material/DensityMediumOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import './cssFolder/posinventory.css';
import { useGetCategory } from './Hooks/CustomHooks';
import { useContext } from 'react';
import { Context } from './Hooks/context';
import TableLoading from './Components/tableloading';

function PosInventory(){
    const {Categories,Inventory,GetInventory}=useGetCategory();
    const {backcolor}=useContext(Context);

    let Condition=[
        {title:'Total Inventory',data:'1200'},
        {title:'Out of Stocks',data:'98'},
        {title:'Out of Stocks',data:'98'},
        {title:'Top Categories',data:'Badminton'},
    ];

    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }
    const InputStyle={
        backgroundColor: Font_color ? '#E1E1E1' : '#0D1B2A'
    }

    async function DeleteInventoryData(item){
        try {
            let reponse = await fetch(`${import.meta.env.VITE_DELETE_INVENTORY}/${item}`,{
                method: 'DELETE'
            })
            if(reponse.ok){
                await GetInventory()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <>
        <div className="posinventorymain">
            <h1 className='Inventorytitle' style={FontStyle}><InventoryIcon className='inventoryIcon'
            style={{border: backcolor ? '1px solid white':'1px solid black' }}
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
                <h2 style={FontStyle}>Product Stocks Overview</h2>
                    <select>
                       {Array.isArray(Categories.data) && Categories.data.length > 0 ?
                            Categories.data.map((item,index)=>{
                                return(
                                    <option key={index} value={item.name}>{item.name}</option>
                                    )
                                }): (<option>Loading...</option>)  
                            } 
                    </select>   
                    <div style={InputStyle}>
                        <input type="search" placeholder='Search..' style={{color: !backcolor ? 'white' : '#0D1B2A'}}/>
                        <SearchIcon style={{color: !backcolor ? 'white' : '#0D1B2A'}}/>
                    </div>
            </div>
            <div className='inventorytablecontainer'>
                    <table className='inventorytable' id='inventorytable'>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Tags</th>
                                <th>Date</th>
                                <th>Stocks</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {Array.isArray(Inventory.data) && Inventory.data.length > 0 ?
                            Inventory.data.map((item,index)=>{
                                return(
                                    <tr key={index} className='test'>
                                        <td>{item.ProductID}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.category}</td>
                                        <td>{item.tags}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.current_stock}</td>
                                        <td>{item.status}</td>
                                        <td className='invbutcontainer'>
                                            <div>
                                                <button className='Ibtn1'>View</button>
                                                <button className='Ibtn2' onClick={()=>{DeleteInventoryData(item.ProductID)}}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : 
                            [...Array(8)].map((_, index) => (
                                <TableLoading key={index} data={8} />
                            ))   
                           }
                        </tbody>
                    </table>
            </div>
        </div>
        </>
    )
}
export default PosInventory;