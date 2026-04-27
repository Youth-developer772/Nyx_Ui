import './cssFolder/poscategory.css';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TagIcon from '@mui/icons-material/Inventory2Outlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useContext, useRef, useState } from 'react';
import { useGetCategory } from './Hooks/CustomHooks';
import toast, { Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Context } from './Hooks/context';

function PosCategory(){

    const [show ,setshow]=useState(false);
    const [show1,setshow1]=useState(false);
    const [alert1,setalert1]=useState(false);
    const [editdata,seteditdata]=useState(null);//for tagsupdate
    const [selecttoDel,setselecttoDel]=useState(null);
    const [allow,setallow]=useState( selecttoDel ? true : false);
    const [isallow,setisallow]=useState(editdata ? true : false); //for tagsupdate
    
    let Categoryname=useRef();
    let CategoryImage=useRef();
    let Tagsref=useRef();


    const {Categories,GetCategories,Tags,GetTags}=useGetCategory();
    const {backcolor,Token}=useContext(Context);

    const Font_color=Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_color ? '#E1E1E1' : '#0D1B2A'
    }

    
    
    async function addCategory(e){

        e.preventDefault();
        let formdata=new FormData();
        formdata.append('image',CategoryImage.current.files[0])
        formdata.append('name',Categoryname.current.value)
        const loadingtoast=toast.loading('Uploading...')
        try{
            let reponse=await fetch(import.meta.env.VITE_ADD_CATEGORY,{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${Token}`
                },
                body: formdata
            })
            if(reponse.ok){
                setTimeout(async () => {
                    await GetCategories();
                }, 500);
                setshow(false)   
                toast.success('Successfully Uploaded',{id:loadingtoast})            
            }else{
                toast.error('Upload Failed',{id:loadingtoast})
                setshow(false)
            }
        }
        catch(err){
            console.log(err)
            toast.error('upload Fialed',{id:loadingtoast})
        }
    }
    async function AddTags(e){
        e.preventDefault();
        const laodingtag=toast.loading('Uploading...')
        let data={name:Tagsref.current.value}
        try{
            let reponse= await fetch(import.meta.env.VITE_ADD_TAGS,{
                method:'POST',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })
            if(reponse.ok){
                console.log('Tags added succefully')
                GetTags();
                toast.success('Successfully Uploaded',{id:laodingtag})
                setshow1(false)
            }else{
                toast.error('Upload Fail',{id:laodingtag})
                setshow1(false)
            }
            
        }catch (err){
            console.log(err)
            toast.error('Upload Fail',{id:laodingtag})
        }

    }

    function handleEdit(item){
        setshow1(true)
        seteditdata(item)
        setisallow(true)
    }

    function editCategory(item){
        setshow(true);    
        setselecttoDel(item);
    }

    async function handleUpdateCategory(e){
        e.preventDefault();
        let formdata=new FormData();
            formdata.append('id',selecttoDel.id)
            if(Categoryname.current.value != selecttoDel.name){
                formdata.append('name',Categoryname.current.value)
            }

            if(CategoryImage.current.files[0]){
                formdata.append('image',CategoryImage.current.files[0])
            }

           if(Categoryname.current.value == selecttoDel.name && !CategoryImage.current.files[0]){ 
                toast.error('No changes made')
                setshow(false)
                setallow(false)
                setselecttoDel(null)
                return;
            }
            const laodingtag=toast.loading('Updating Tags...')
            try{

                let reponse=await fetch(import.meta.env.VITE_UPDATE_CATEGORY,{
                    method:'PUT',
                    headers:{
                        "Authorization": `Bearer ${Token}`
                    },
                    body: formdata
                })

                if(reponse.ok){
                    GetCategories();
                    toast.success('Successfully Uploaded',{id:laodingtag})
                    setselecttoDel(null)
                    setallow(false)
                    setshow(false)
                }else{
                    toast.error('Upload Fail',{id:laodingtag})
                    setselecttoDel(null)
                    setshow(false)
                    setallow(false)
                }
                
            }catch(err){
                console.log(err)
                toast.error('Upload Fail',{id:laodingtag})
                setselecttoDel(null)
                setallow(false)
                setshow(false)
            }
           
    }
            

    async function handleUpdateTags(e){
        e.preventDefault(); 
        let name=Tagsref.current.value;
        let id=editdata.id;

        if(name == editdata.name){
            setshow1(false);
            seteditdata(null)
            setisallow(false)
            return;
        }
        try{
            let response= await fetch(import.meta.env.VITE_UPDATE_TAGS,{
                method:'PUT',
                headers:{
                    "Authorization": `Bearer ${Token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id,name})
            })
            if(response.ok){
                GetTags();
                setshow1(false)
                seteditdata(null)
                setisallow(false)
                
            }else{
                setshow1(false)
                seteditdata(null)
                setisallow(false)
                toast.error('Failed to update Tags')
            }
        }catch(err){
            console.log(err)
        }
    }


    async function handleDeleteTags(){
        let tagsName=editdata.name;
        const result= await Swal.fire({
            title:'Are you sure To Delete?',
            text:'You will not be able to recover this Tags',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, delete it!',
            customClass: {
                popup: 'modern-swal-popup',
                title: 'modern-swal-title',
                htmlContainer: 'modern-swal-text',
                confirmButton: 'modern-swal-confirm',
                cancelButton: 'modern-swal-cancel',
                icon: 'modern-swal-icon'
            },
            buttonsStyling: false
        })
        if(result.isConfirmed){
            let tagdelete=toast.loading('Deleting Tags...')
            try{
                let reponse= await fetch(`${import.meta.env.VITE_DELETE_TAGS}${tagsName}`,{
                    method:'DELETE',
                    headers:{
                        "Authorization": `Bearer ${Token}`
                    }
                })
                if(reponse.ok){
                toast.success('Tags Deleted',{id:tagdelete})
                GetTags();
                setshow1(false)
                seteditdata(null)
                setisallow(false)
            }else{
                setshow1(false)
                seteditdata(null)
                setisallow(false)
                toast.error('Failed to delete Tags',{id:tagdelete})
            }

        }catch(err){
            console.log(err)
            setshow1(false)
            seteditdata(null)
            setisallow(false)
            toast.error('Failed to delete Tags',{id:tagdelete})
        }
    }
}

    async function handleDeleteCategory() {
        let data=selecttoDel.name;
        const result= await Swal.fire({
            title:'Are you sure To Delete?',
            text:'You will not be able to recover this Category',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, delete it!',
            customClass: {
                popup: 'modern-swal-popup',
                title: 'modern-swal-title',
                htmlContainer: 'modern-swal-text',
                confirmButton: 'modern-swal-confirm',
                cancelButton: 'modern-swal-cancel',
                icon: 'modern-swal-icon'
            },
            buttonsStyling: false
        })
        if(result.isConfirmed){
            try{
                let reponse=await fetch(`${import.meta.env.VITE_DELETE_CATEGORY}${data}`,{
                    method:'DELETE',
                    headers:{
                        "Authorization": `Bearer ${Token}`
                    }
                })

                if(reponse.ok){
                setTimeout(async()=>{
                    await GetCategories();
                },500)

                setshow(false);
                setselecttoDel(null);
                toast.success('Category Deleted')
            }else{
                setshow(false);
                setselecttoDel(null);
                toast.error('Failed to delete Category')
            }

                }catch(err){
                console.log(err)
                setshow(false);
                setselecttoDel(null);
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
            zIndex:100
        }}
        />
        <div className='poscategorymain'>

            <div className='Poscategoryheader'>
                <h1 style={FontStyle}><CategoryIcon style={{fontSize:'35px'}}/>Category</h1>
                <button onClick={()=>{
                    setshow(true)
                    setselecttoDel(null)
                    setallow(false)
                }}><AddIcon/>Add Category</button>
            </div>

            <div className='poscategorybody'>
                {Array.isArray(Categories.data) && Categories.data.length > 0 ? 
                     Categories.data.map((item,index)=>{
                        return(
                            <div key={index} onClick={()=>editCategory(item)}>
                                <img src={item.image_url} alt='image'/>
                                <p>{item.name}</p>
                            </div>
                            )
                        })
                    : (<h1>Loading....</h1>)
            }
            </div>

           { /*for Pop up box*/}
            {
             show && (
                <div className="showwarper">
                    <form className='categorypopup' onSubmit={selecttoDel ? handleUpdateCategory : addCategory}>

                        <h1 className='categorypopupheader'>{selecttoDel ? 'Category Details' : 'New Category'}</h1>

                        <button className='categorycloseIcon'
                        onClick={()=>{
                            setshow(false)
                            setallow(false)
                            setselecttoDel(null)
                        }}
                        ><CloseIcon/></button>

                        <p>Category Name</p>

                            <input type='text' className='category'
                            defaultValue={selecttoDel ? selecttoDel.name : ''}
                            readOnly={ selecttoDel && !allow}
                            required={!selecttoDel}
                            ref={Categoryname} key={selecttoDel ? 2 : ''} />

                            <input type='file' ref={CategoryImage} 
                            disabled={ selecttoDel && !allow} required={!selecttoDel}/>


                        {selecttoDel ? 
                        <div className='categoryupdate'>

                            <button onClick={handleDeleteCategory} type='button'>Delete</button>

                            <div >
                                <button onClick={()=>{
                                    setallow(true)
                                    Categoryname.current.focus();
                                }} type='button'>Edit</button>
                                <button disabled={ selecttoDel && !allow } 
                                >Update</button>
                            </div>

                        </div>
                        :
                        <div className='categorycreatebtn'>
                            <button style={{background:'#0D1B2A',color:'white'}}
                            >Create</button>
                            <button onClick={()=>setshow(false)} type='button'>cancel</button>
                        </div>
                        }
                    </form>
                </div>
             )
            }
          
            {/*for Tag box*/}
            {
                show1 && (
                    <div className="show1warper">
                        <div className='tagpopup'>
                            <div className='tagheader'>
                                <h2>{editdata ? 'Update Tags' : 'New Tags'}</h2>
                                <button className='tagcloseIcon'
                                onClick={()=>{
                                    setshow1(false)
                                    setisallow(true)
                                }}
                                >
                                    <CloseIcon/>
                                </button>

                            </div>
                            <p>Tag name</p>
                            <form onSubmit={editdata ? handleUpdateTags : AddTags}>
                                <input type="text" className='taginput' ref={Tagsref} required
                                defaultValue={editdata ? editdata.name : ''}
                                key={editdata ? 3 : ''} 
                                readOnly={isallow}
                                />
                                {/* <label htmlFor="statuscheck"> <input type='checkbox' 
                                className='checkstatus' 
                                />Avaliable</label> */}
                                
                                {editdata ? 
                                <div className='tagupdatebtn'>
                                    <button onClick={handleDeleteTags} type='button'>Delete</button>
                                    <div>
                                        <button onClick={()=>{
                                            setisallow(false)
                                            Tagsref.current.focus();
                                        }} type='button'>Edit</button>
                                        <button disabled={isallow} >Update</button>
                                    </div>
                                </div>
                                :
                                <div className='tagbutton'>
                                    <button type='submit'>{editdata ? 'Delete' : 'Create'}</button>
                                    <button
                                    type='button'
                                    onClick={()=>setshow1(false)}
                                    >cancel</button>
                                </div>}
                            </form>
                        </div>
                    </div>
                )
            }
            {/*for tag alret box*/}
            
            <hr  style={{margin:'1em ',height:'5px',background:'black',width:'100%'}}/>
            <div className='poscategorybody2'>
                <h1 style={FontStyle}><TagIcon style={{fontSize:'35px'}}/>Tags</h1>
                <button
                onClick={()=>{
                    seteditdata(null)
                    setshow(false)
                    setshow1(true)
                    setisallow(false)
                }}
                ><AddIcon/>Add Tags</button>
            </div>
            <div className='poscategoryfooter'>
                {Array.isArray(Tags.data) ? 
                (Tags.data.length > 0 ?
                   Tags.data.map((item,index)=>{
                        return(<h3 key={index}
                        onClick={()=>handleEdit(item)}
                        >{item.name}</h3>) 
                        
                   }):
                   (<div>
                   <p>There is no tags</p>
                   <h1 onClick={()=>setshow1(true)}>Add New Tags</h1>
                   </div>))
                    : (<h4>Loading....</h4>)    
            }
            </div>
        </div>
        </>
    )
}
export default PosCategory;

