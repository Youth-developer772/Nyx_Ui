import './cssFolder/posproduct.css';
import ProductIcon from '@mui/icons-material/Inventory2Outlined';
import SearchIcon from '@mui/icons-material/SearchSharp';
import AddIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useFetcher, useNavigate } from 'react-router-dom';
import { useGetCategory } from './Hooks/CustomHooks';
import toast, { Toaster } from 'react-hot-toast';

function PosProduct(){
    const [fliterdata,setfliterdata]=useState();
    const [text,settext]=useState();
    const [info,setinfo]=useState(null);
    

    const nagivate=useNavigate();

    const handleChange = (e) => {
    setCategory(e.target.value);
    setTag(e.target.value);
  };
   
  
  const{Categories,GetCategories,Tags,GetTags,Products,GetProducts}=useGetCategory();
  useEffect(()=>{
    setfliterdata(Products.data)
  },[Products.data])

  
    function searchHandler(e){
        let textvalue=e.target.value;
        settext(textvalue)
        if(textvalue === ''){
            setfliterdata(Products.data)
        }else{
            if( Array.isArray(Products.data) && Products.data.length > 0 ){
            let result= Products.data.filter((item)=>{
                return item.productName.toLowerCase().trim().includes(textvalue.toLowerCase());
            })
            setfliterdata(result);
        }
        }
    }

    function handleupdate(data){
        setinfo(data)
        nagivate('posaddproduct')
    }
    
    return(
        <>
        <div className="posproductmain">
            <div className="productheader">
                <h1><ProductIcon/>Products</h1>
                <div className="productsearch">
                    <input type='search' placeholder='Search...' value={text} onChange={searchHandler}/>
                    <SearchIcon/>
                </div>
               <button onClick={()=>nagivate('posaddproduct')}><AddIcon/> Add Product</button>
            </div>

            {/*for Add Product*/}
            
            
            <div className='productbody'>
                {Array.isArray(Products.data) && Products.data.length > 0 ?
                       ( Array.isArray(fliterdata) && fliterdata.length > 0 ?
                        fliterdata.map((item,index)=>{
                            return(
                                <div key={index} className='singleproduct' onClick={()=>{handleupdate(item)}}>
                                    <img src={item.images} alt={item.name}/>
                                    <div>
                                        <h3>{item.productName}</h3>
                                        <h4 style={{fontFamily:'Inter',fontWeight:300}}>{item.price}MMk</h4>
                                        {item.status == 'isAvailable' ? <p style={{backgroundColor:'#16F90E'}}>Avaliable</p>
                                        : <p style={{backgroundColor:'#FF0302',width:'100px'}}>Out of Stocks</p>}
                                    </div>
                                </div>
                            )
                        }): (<h1>No Result Found....</h1>))
                        : (<h1>Loading...</h1>)
                }
            </div>
            <Outlet context={{info,setinfo,GetProducts}}/>
        </div>
        </>
    )
}
export default PosProduct;