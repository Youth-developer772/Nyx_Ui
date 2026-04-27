import { useContext, useRef } from 'react';
import { useGetCategory } from '../Hooks/CustomHooks';
import  '../PosSettingCss/GeneralSetting.css';
import ShopLogo from '../images/shoplogo.png';
import { Context } from '../Hooks/context';
import toast, { Toaster } from 'react-hot-toast';

function PosGeneralSetting(){

    const {General,GetGenerals}=useGetCategory();
    const {Token}=useContext(Context);

    const nameref=useRef();
    const contactref=useRef();
    const addressref=useRef();
    const linkref=useRef();
    const fileref=useRef();


    const shop_info = Array.isArray(General.data) && General.data.length > 0 ?
                    {   
                        key : 1,
                        url : General.data[0].logo_image_url,
                        name : General.data[0].shop_name,
                        phNo : General.data[0].contact_info,
                        address : General.data[0].address,
                        social_link : General.data[0].social_link,
                    } :
                    {   
                        key : 2,
                        url : {ShopLogo},
                        name : 'Loading...',
                        phNo : 'Loading...',
                        address : 'Loading...',
                        social_link : 'Loading...',  
                    };

    async function update_general(e){
        e.preventDefault();
        if(Array.isArray(General.data)){
            let fromdata = new FormData();
            fromdata.append('id',General.data[0].id)
            fromdata.append('shop_name',nameref.current.value)
            fromdata.append('contact_info',contactref.current.value)
            fromdata.append('address',addressref.current.value)
            fromdata.append('social_link',linkref.current.value)
            if(fileref.current.files[0]){
                fromdata.append('logo',fileref.current.files[0])
            }
            let data={
                id:General.data[0].id,
                shop_name:nameref.current.value,
                contact_info:contactref.current.value,
                address:addressref.current.value,
                social_link:linkref.current.value
            }

            if(
                data.shop_name == General.data[0].shop_name && 
                data.contact_info == General.data[0].contact_info &&
                data.address == General.data[0].address &&
                data.social_link == General.data[0].social_link &&
                !(fileref.current.files[0])
            ){
                return;
            }
            const updating=toast.loading('Saving Changes...')
            try {
                let response= await fetch(import.meta.env.VITE_UPDATE_GENERAL,{
                    method:'PUT',
                    headers:{
                        'Authorization' :`Bearer ${Token}`
                    },
                    body:fromdata
                })
                if(response.ok){
                    await GetGenerals();
                    toast.success('Successfully changed',{id:updating})
                }else{
                    toast.error('failed',{id:updating})
                }
            } catch (error) {
                console.log(error)
                toast.error('failed',{id:updating})
            }
        }else{
            console.log('second block is work')
            return;
        }
    }

    function cancelFun(){

        nameref.current.value=shop_info.name;
        contactref.current.value=shop_info.phNo;
        addressref.current.value=shop_info.address;
        linkref.current.value=shop_info.social_link;

    }

    return(
        <form className='posgeneralsettingmain' key={shop_info.key} onSubmit={update_general}>
            <Toaster />
            <div className='posgeneralsettingbody1'>
                <div className='zoom_img'><img src={shop_info.url} alt="Shop Logo" /></div>
                <label className='changelogo'>
                    Change Logo
                    <input type="file" ref={fileref} style={{display:'none'}}/>
                </label>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Shop Name</label>
                <input type="text" defaultValue={shop_info.name} ref={nameref} required/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Contact Info</label>
                <input type="text" defaultValue={shop_info.phNo} ref={contactref} required/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Address</label>
                <input type="text" defaultValue={shop_info.address} ref={addressref} required/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Social Link</label>
                <input type="text" defaultValue={shop_info.social_link} ref={linkref}required/>
            </div>
            <div className="posgeneralsettingbody2button">
                <button type='button' onClick={cancelFun}>cancel</button>
                <button>save changes</button>
            </div>
        </form>
    )
}
export default PosGeneralSetting;