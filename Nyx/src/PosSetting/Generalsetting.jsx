import  '../PosSettingCss/GeneralSetting.css';
import ShopLogo from '../images/shoplogo.png';
function PosGeneralSetting(){
    return(
        <div className='posgeneralsettingmain'>
            <div className='posgeneralsettingbody1'>
                <div className='zoom_img'><img src={ShopLogo} alt="Shop Logo" /></div>
                <button>Change Logo</button>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Shop Name</label>
                <input type="text" placeholder='Nyx' readOnly/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Contact Info</label>
                <input type="text" placeholder='123-456-7890' readOnly/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Address</label>
                <input type="text" placeholder='123 Main Street' readOnly/>
            </div>
            <div className="posgeneralsettingbody2">
                <label htmlFor="">Social Link</label>
                <input type="text" placeholder='https://www.facebook.com/nyxshop' readOnly/>
            </div>
            <div className="posgeneralsettingbody2button">
                <button>cancel</button>
                <button>save changes</button>
            </div>
        </div>
    )
}
export default PosGeneralSetting;