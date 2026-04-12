import './cssFolder/posproduct.css';
import ProductIcon from '@mui/icons-material/Inventory2Outlined';
import SearchIcon from '@mui/icons-material/SearchSharp';
import AddIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useEffect, useRef, useState } from 'react';
import Image from './images/shoe.png';
import { NavLink, Outlet, useFetcher } from 'react-router-dom';
import { useGetCategory } from './Hooks/CustomHooks';
import CloseIcon from '@mui/icons-material/Close';
import toast, { Toaster } from 'react-hot-toast';

function PosProduct(){
    const [data,setdata]=useState([]);
    const [show , setshow]=useState(false);
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const [fliterdata,setfliterdata]=useState();
    const [text,settext]=useState();

    const nameref=useRef();
    const brandref=useRef();
    const maderef=useRef();
    const typeref=useRef();
    const stockref=useRef();
    const descriptionref=useRef();
    const categoryref=useRef();
    const costref=useRef();
    const colorref=useRef();
    const weightref=useRef();
    const ratingref=useRef();
    const imageref=useRef();
    const tagref=useRef();
    const priceref=useRef();
    const sizeref=useRef();
    const wranartref=useRef();
    const dateref=useRef();
    const checkref=useRef();


    const handleChange = (e) => {
    setCategory(e.target.value);
    setTag(e.target.value);
  };
   
  
  const{Categories,GetCategories,Tags,GetTags,Products,GetProducts}=useGetCategory();
  console.log(Products.data);
  useEffect(()=>{
    setfliterdata(Products.data)
  },[Products.data])
  async function AddProduct(e){
        e.preventDefault();
        const uploading=toast.loading('Uploading Prodcut')
        try{
            console.log(ratingref.current.value)
            console.log('item Uploaded')
            let formdata=new FormData();
            formdata.append('productName',nameref.current.value);
            formdata.append('brand',brandref.current.value);
            formdata.append('made',maderef.current.value);
            formdata.append('type',typeref.current.value);
            formdata.append('stock',stockref.current.value);
            formdata.append('description',descriptionref.current.value);
            formdata.append('category',categoryref.current.value);
            formdata.append('cost',costref.current.value);
            formdata.append('tags',tagref.current.value);
            formdata.append('color',colorref.current.value);
            formdata.append('weight',weightref.current.value);
            formdata.append('rating',ratingref.current.value);
            formdata.append('price',priceref.current.value);
            formdata.append('size',sizeref.current.value);
            formdata.append('warranty',wranartref.current.value);
            formdata.append('date',dateref.current.value);
            formdata.append('image',imageref.current.files[0])
            const data = Object.fromEntries(formdata);
            console.log(data);

            let reponse= await fetch('http://130.94.22.119:5000/api/product/addproduct',{
                method:"POST",
                body: formdata
            });
            
            if(reponse.ok){
                toast.success('Successfully Uploaded',{id:uploading})
                console.log('uploaded succefully')
                GetProducts();
                nameref.current.value=''
                brandref.current.value=''
                maderef.current.value=''
                typeref.current.value=''
                stockref.current.value=''
                descriptionref.current.value=''
                categoryref.current.value=''
                costref.current.value=''
                colorref.current.value=''
                weightref.current.value=''
                ratingref.current.value=''
                priceref.current.value=''
                sizeref.current.value=''
                wranartref.current.value=''
                dateref.current.value=''
                imageref.current.value=''
                let data=await reponse.json();
                console.log(data)
            }
        }catch(err){
            console.log(err)
            toast.error('upload fail',{id:uploading})
        }
    }

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
    
    return(
        <>
        <Toaster position='top-center' 
        containerStyle={{
            position:'fixed',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            zIndex:100,
        }}
        />
        <div className="posproductmain">
            <div className="productheader">
                <h1><ProductIcon/>Products</h1>
                <div className="productsearch">
                    <input type='search' placeholder='Search...' value={text} onChange={searchHandler}/>
                    <SearchIcon/>
                </div>
               <button onClick={()=>setshow(true)}><AddIcon/> Add Product</button>
            </div>

            {/*for Add Product*/}
            {
                show && (
                    <form onSubmit={AddProduct}>
                        <div className='posadditemcontainer'>
                            <div className="container">
                                <div className="categoryupload1 ">
                                <button onClick={()=>setshow(false)} type='button'><CloseIcon/></button>
                                </div>
                                <div className="categoryupload2">
                                <h2 className="categoryupload3 ">
                                New Product
                                </h2>
                                </div>

                                <div className="categoryupload4">
                                <div className="categoryupload5 ">
                                    <label>Product Name</label>
                                    <input type="text" placeholder="" ref={nameref} required/>

                                    <label>Brand</label>
                                    <input type="text" placeholder="" ref={brandref} required/>

                                    <label>Made</label>
                                    <input type="text" placeholder="" ref={maderef} required/>

                                    <label>Type</label>
                                    <input type="text" placeholder="" ref={typeref} required/>

                                    <label>Stock</label>
                                    <input type="number" placeholder="" ref={stockref} required/>

                                    <label>Description</label>
                                    <input type="text" placeholder="" ref={descriptionref} required/>

                                    <div className="categoryupload6">
                                    <input type="checkbox" id="available" ref={checkref}/>
                                    <label>Available</label>
                                    </div>
                                </div>

                                <div className="categoryupload7">
                                    <label>Category</label>
                                    <select
                                    value={category}
                                    onChange={handleChange}
                                    className="categoryupload8"
                                    ref={categoryref}
                                    required
                                    >
                                    {Array.isArray(Categories.data) && Categories.data.length > 0 ?
                                        Categories.data.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                        }): (<option>Loading...</option>)  
                                }
                                    </select>

                                    <label>Cost</label>
                                    <input type="number" placeholder="" ref={costref} required/>

                                    <label>Color</label>
                                    <input type="text" placeholder="" ref={colorref} required/>

                                    <label>Weight</label>
                                    <input type="text" placeholder="" ref={weightref} required/>

                                    <label>Rating</label>
                                    <input type="text" placeholder="" ref={ratingref} required/>

                                    <label>Upload Image</label>
                                    {/* Uploaad Section */}
                                    <div className="categoryupload9">
                                    {/* Upload Box */}
                                    <input type='file' placeholder='' ref={imageref} required/>
                                    </div>
                                </div>

                                <div className="categoryupload11">
                                    <label>Tags</label>

                                    <select
                                    value={tag}
                                    onChange={handleChange}
                                    className="categoryupload12"
                                    ref={tagref} required
                                    >
                                    {
                                        Array.isArray(Tags.data) && Tags.data.length > 0 ?
                                        Tags.data.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                        }):(<option>Loading...</option>)
                                    }
                                    </select>

                                    <label>Price</label>
                                    <input type="number" placeholder="" ref={priceref} required/>

                                    <label>size</label>
                                    <input type="number" placeholder="" ref={sizeref} required/>

                                    <label>Wranarty</label>
                                    <input type="number" placeholder="" ref={wranartref} required/>

                                    <label>Date</label>
                                    <input type="date" placeholder=""  ref={dateref} required/>
                                </div>
                                </div>

                                <div className=" categoryupload13">
                                <button className="categoryupload14" >Create</button>
                                <button type='button' className="categoryupload15" onClick={()=>setshow(false)}>cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )
            }
            
            <div className='productbody'>
                {Array.isArray(Products.data) && Products.data.length > 0 ?
                       ( Array.isArray(fliterdata) && fliterdata.length > 0 ?
                        fliterdata.map((item,index)=>{
                            return(
                                <div key={index} className='singleproduct'>
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
        </div>
        </>
    )
}
export default PosProduct;