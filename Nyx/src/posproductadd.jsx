import './cssFolder/productadd.css';
import './cssFolder/posproduct.css';
import ProductIcon from '@mui/icons-material/Inventory2Outlined';
import SearchIcon from '@mui/icons-material/SearchSharp';
import AddIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useFetcher, useNavigate, useOutletContext } from 'react-router-dom';
import { useGetCategory } from './Hooks/CustomHooks';
import CloseIcon from '@mui/icons-material/Close';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import uploader from '@zwehtetpaing55/uploader';
import { Context } from './Hooks/context';


function AddProduct(){

    const {info,setinfo,GetProducts}=useOutletContext();
    const [allowupdate,setallowupdate]=useState(info ? true : false);

    const navigate=useNavigate();

    const{Categories,GetCategories,Tags,GetTags,Products}=useGetCategory();
    const {Token}=useContext(Context)

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

            let reponse= await fetch(import.meta.env.VITE_ADD_PRODUCT,{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${Token}`
                },
                body: formdata
            });
            
            if(reponse.ok){
                toast.success('Successfully Uploaded',{id:uploading})
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


    async function deleteProduct(id){
        const result = await Swal.fire({
            title: "Are you sure to delete this product?",
            text: "You can't undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#a2aeb9',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            background: '#F0F0F0',
            customClass: {
                popup: 'modern-swal-popup',
                title: 'modern-swal-title',
                htmlContainer: 'modern-swal-text',
                confirmButton: 'modern-swal-confirm',
                cancelButton: 'modern-swal-cancel',
                icon: 'modern-swal-icon'
            },
        buttonsStyling: false
            
        });

        if(result.isConfirmed){
            const deleting=toast.loading('Deleting Prodcut')
            try{
                let reponse= await fetch(`${import.meta.env.VITE_DELETE_PRODUCT}/${id}`,{
                method:'DELETE',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type':'application/json'
                }
            })
            if(reponse.ok){
                toast.success('Succssfully Deleted',{id:deleting})
                await GetProducts()
                navigate(-1)
            }
            else{
                toast.error('Deleting fail',{id:deleting})
            }
            }catch(err){
                console.log(err)
                toast.error('Deleting fail',{id:deleting})
            }
            }
    }

    async function updateProduct(e){
        try{
            e.preventDefault();
            let formdata=new FormData();
            formdata.append('id',info.id);
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

            if(imageref.current.files[0]){
                formdata.append('image',imageref.current.files[0]);
            }
            const productUpdateLoading=toast.loading('Updating Product');
            let reponse= await fetch(import.meta.env.VITE_UPDATE_PRODUCT,{
                method:'PUT',
                headers:{
                    "Authorization": `Bearer ${Token}`
                },
                body: formdata
            })
            if(reponse.ok){
                toast.loading('Getting Product',{id:productUpdateLoading})
                await GetProducts();
                toast.success('Successfully Updated',{id:productUpdateLoading});
                setallowupdate(true);
                setinfo(null);
                navigate(-1); 
            }else{
                GetProducts();
                setallowupdate(true);
                setinfo(null);
                navigate(-1); 
                toast.error('Updating fail',{id:productUpdateLoading})
            }
        }catch(err){
            console.log(err)
            toast.error('Updating failed',{id:productUpdateLoading})
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
        <form onSubmit={info ? updateProduct : AddProduct} className='addproductform'>
            <div className='posadditemcontainer'>
                <div className='additemheader'>
                    <button onClick={()=>{
                            navigate(-1)
                            setallowupdate(false)
                            setinfo(null)
                        }} type='button'><CloseIcon/></button>
                    <h2 className="categoryupload3 ">{info ? 'Product Details' : 'New Product'}</h2>
                </div>
                <div className="container">
                        
                            <div className="categoryupload5 ">
                                <label>Product Name</label>
                                <input type="text" placeholder="" ref={nameref} required
                                 defaultValue={info ? info.productName :''} readOnly={allowupdate}/>

                                <label>Brand</label>
                                <input type="text" placeholder="" ref={brandref} required
                                 defaultValue={info ? info.brand : ''} readOnly={allowupdate}/>

                                <label>Made</label>
                                <input type="text" placeholder="" ref={maderef} required
                                 defaultValue={info ? info.made : ''} readOnly={allowupdate}/>

                                <label>Type</label>
                                <input type="text" placeholder="" ref={typeref} required
                                readOnly={allowupdate} defaultValue={info ? info.types : ''}/>

                                <label>Stock</label>
                                <input type="number" placeholder="" ref={stockref} required
                                readOnly={allowupdate} defaultValue={info ? info.total_stock : ''}/>

                                <label>Description</label>
                                <input type="text" placeholder="" ref={descriptionref} required
                                readOnly={allowupdate} defaultValue={info ? info.description : ''}/>

                                {/* <div className="categoryupload6">
                                    <input type="checkbox" id="available" ref={checkref}/>
                                    <label>Available</label>
                                </div> */}
                            </div>

                            <div className="categoryupload7">
                                <label>Category</label>
                                <select
                                className="categoryupload8"
                                ref={categoryref}
                                required
                                defaultValue={info ? info.category : ''}
                                disabled={allowupdate}
                                >
                                {Array.isArray(Categories.data) && Categories.data.length > 0 ?
                                    Categories.data.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    }): (<option disabled>Loading...</option>)  
                                }
                                </select>

                                <label>Cost</label>
                                <input type="number" placeholder="" ref={costref} required
                                readOnly={allowupdate} defaultValue={info ? info.cost : ''}/>

                                <label>Color</label>
                                <input type="text" placeholder="" ref={colorref} required
                                readOnly={allowupdate} defaultValue={info ? info.colors : ''}/>

                                <label>Weight</label>
                                <input type="text" placeholder="" ref={weightref} required
                                readOnly={allowupdate} defaultValue={info ? info.weights : ''}/>

                                <label>Rating</label>
                                <input type="text" placeholder="" ref={ratingref} required
                                readOnly={allowupdate} defaultValue={info ? info.rating : ''}/>

                                <div className="categoryupload9">
                                    <label>Upload Image</label>
                                    <input type='file' placeholder='' ref={imageref}
                                    required={allowupdate} disabled={allowupdate}/>
                                </div>
                                </div>

                                <div className="categoryupload11">
                                    <label>Tags</label>

                                    <select
                                    className="categoryupload12"
                                    ref={tagref} required
                                    defaultValue={info ? info.tag : ''}
                                    disabled={allowupdate}
                                    >
                                    {
                                        Array.isArray(Tags.data) && Tags.data.length > 0 ?
                                        Tags.data.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                        }):(<option disabled>Loading...</option>)
                                    }
                                    </select>

                                    <label>Price</label>
                                    <input type="number" placeholder="" ref={priceref} required
                                    readOnly={allowupdate} defaultValue={info ? info.price : ''}/>

                                    <label>size</label>
                                    <input type="number" placeholder="" ref={sizeref} required
                                    readOnly={allowupdate} defaultValue={info ? info.sizes : ''}/>

                                    <label>Warranty</label>
                                    <input type="text" placeholder="" ref={wranartref} required
                                    readOnly={allowupdate} defaultValue={info ? info.warranty : ''}/>

                                    <label>Date</label>
                                    <input type="date" placeholder=""  ref={dateref} required
                                    readOnly={allowupdate} defaultValue={info ? info.date : ''}/>
                                </div>
                                </div>

                                {
                                    info ? 
                                    <div className=" categoryupload132">
                                        <button type='button' className='up132btn1'
                                        onClick={()=> deleteProduct(info.id)}
                                        >Delete</button>
                                        <div>
                                            <button type='button'
                                            className='up132btn2'
                                            onClick={()=>{
                                                setallowupdate(false)
                                            }}>Edit</button>
                                            <button disabled={allowupdate}
                                            className='up132btn3'>Update</button>
                                        </div>
                                    </div>:
                                    <div className=" categoryupload13">
                                        <button className="categoryupload14" >Create</button>
                                        <button type='button'
                                        className="categoryupload15" onClick={()=>{
                                            navigate(-1)
                                            setinfo(null)
                                        }}
                                        >cancel</button>
                                    </div>
                                }
                </div>
            </form>
        </>
    )
}

export default AddProduct;