import './cssFolder/poscategory.css';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TagIcon from '@mui/icons-material/Inventory2Outlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useRef, useState } from 'react';
import { useGetCategory } from './Hooks/CustomHooks';
import toast, { Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
function PosCategory(){

    const[show ,setshow]=useState(false);
    const[show1,setshow1]=useState(false);
    const [alert1,setalert1]=useState(false);
    const [editdata,seteditdata]=useState(null);
    const [selecttoDel,setselecttoDel]=useState(null);
    const [allow,setallow]=useState(false);
    const [isallow,setisallow]=useState(editdata ? true : false);
     console.log(editdata)
    let Categoryname=useRef();
    let CategoryImage=useRef();
    let Tagsref=useRef();
    

    const {Categories,GetCategories,Tags,GetTags}=useGetCategory();
    
    async function addCategory(e){
        let formdata=new FormData();
        formdata.append('image',CategoryImage.current.files[0])
        formdata.append('name',Categoryname.current.value)
        const loadingtoast=toast.loading('Uploading...')
        try{
            let reponse=await fetch(import.meta.env.VITE_ADD_CATEGORY,{
                method:"POST",
                body: formdata
            })
            if(reponse.ok){
                setTimeout(async () => {
                    await GetCategories();
                    console.log("Categories refreshed!");
                }, 500);
                setshow(false)   
                toast.success('Successfully Uploaded',{id:loadingtoast})            
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
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })
            if(reponse.ok){
                console.log('Tags added succefully')
                GetTags();
                toast.success('Successfully Uploaded',{id:laodingtag})
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

    async function handleUpdateCategory(){
        alert('Update function is currently unavailable')
        let categoryname=Categoryname.current.value;
        let categoryimage=CategoryImage.current.files[0];
        
    }

    async function handleUpdateTags(){
        let tagsname=Tagsref.current.value;
        alert('Update function is currently unavailable')
        // try{
        //     let reponse= await fetch(`${import.meta.env.VITE_UPDATE_TAGS}${tagsname}`,{
        //         method:'Put'
        //     })
        //     if(reponse.ok){
        //         GetCategories();
        //     }
        // }catch(err){
        //     console.log(err)
        // }
    }


    async function handleDeleteTags(){
        let tagsName=editdata.name;
        
        try{
            let reponse= await fetch(`${import.meta.env.VITE_DELETE_TAGS}${tagsName}`,{
                method:'DELETE',
            })
            if(reponse.ok){
                GetTags();
                setshow1(false)
                seteditdata(null)
                setisallow(false)
            }
        }catch(err){
            console.log(err)
            setshow1(false)
            seteditdata(null)
            setisallow(false)
        }
    }

    async function handleDeleteCategory() {
        let data=selecttoDel.name;
        try{
            let reponse=await fetch(`${import.meta.env.VITE_DELETE_CATEGORY}${data}`,{
                method:'DELETE'
            })
            if(reponse.ok){
                setTimeout(async()=>{
                    await GetCategories();
                },500)
                setshow(false);
            }
        }catch(err){
            console.log(err)
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
                <h1><CategoryIcon/>Category</h1>
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
                <div className='categorypopup'>

                    <h1>{selecttoDel ? 'Category Details' : 'New Category'}</h1>

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
                        ref={Categoryname} key={selecttoDel ? 2 : ''} />

                        <input type='file' ref={CategoryImage} disabled={ selecttoDel && !allow}/>
                   

                    

                    {/* <label htmlFor="statuscheck"> <input type='checkbox'  className='checkstatus'/>Avaliable</label> */}

                    {selecttoDel ? 
                    <div className='categoryupdate'>

                        <button onClick={handleDeleteCategory} >Delete</button>

                        <div >
                            <button onClick={()=>{
                                setallow(true)
                                Categoryname.current.focus();
                            }} type='button'>Edit</button>
                            <button disabled={ selecttoDel && !allow } onClick={handleUpdateCategory}
                            >Update</button>
                        </div>

                    </div>
                     :
                    <div className='categorycreatebtn'>
                        <button style={{background:'#0D1B2A',color:'white'}}
                        onClick={()=>{
                            addCategory();
                            setshow(false);
                        }}
                        >Create</button>
                        <button onClick={()=>setshow(false)} type='button'>cancel</button>
                    </div>
                    }
                </div>
             )
            }
          
            {/*for Tag box*/}
            {
                show1 && (
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
                            <label htmlFor="statuscheck"> <input type='checkbox' 
                             className='checkstatus' 
                             />Avaliable</label>
                             
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
                )
            }
            {/*for tag alret box*/}
            {
                alert1 && (
                    <div className="orderalret">
                        <CheckCircleIcon style={{
                            color:'green',padding:'5px',borderRadius:'50%',background:'white',margin:'0'
                        }}/>
                        <h1>Tags Added To New List</h1>
                        <p>Your new Tags is now avaliable</p>
                        <button
                        onClick={()=>setalert1(false)}
                        >Great,Thanks</button>
                    </div>
                )
            }
            
            <hr  style={{margin:'1em '}}/>
            <div className='poscategorybody2'>
                <h1><TagIcon/>Tags</h1>
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
                {Array.isArray(Tags.data) && Tags.data.length > 0 ? 
                   Tags.data.map((item,index)=>{
                        return(<h3 key={index}
                        onClick={()=>handleEdit(item)}
                        >{item.name}</h3>);

                   }) : (<h1>Loading....</h1>)    
            }
            </div>
        </div>
        </>
    )
}
export default PosCategory;

