import '../PosSettingCss/paymenttax.css';
import Kpay from '../images/kbz.png';
import wavepay from '../images/wavepay.png';
import cbpay from '../images/cbpay.png';
import Cash from '../images/Vector.png';
import Unknow from '../images/barpone.png'
import { useContext } from 'react';
import { Context } from '../Hooks/context';

function PosPaymentTax(){

    let paymentMethod=[
        {name:'Kpay',logo:Kpay},
        {name:'Kpay',logo:wavepay},
        {name:'Kpay',logo:cbpay},
        {name:'Kpay',logo:Cash},
        {name:'Kpay',logo:Unknow},
    ]

    const {backcolor}=useContext(Context);
    const Font_Color= Boolean(backcolor == '#1A1C1E');
    const FontStyle={
        color: Font_Color ? 'white': '#0D1B2A',
    }
    const InputStyle={
        backgroundColor: backcolor ? '#FFFFFF': '#0d1b2a21',
        color: backcolor ? 'black' : 'white'
    }

    return(
        <div className='pospaymentwarper' style={{border: Font_Color && '1px solid white'}}>
            <div className='pospaymentchild2'>
                <div>
                    <p style={FontStyle}>Tax Percentage( % )</p>
                    <input type="text" value={5} readOnly style={InputStyle}/>
                </div>
                <div>
                   <p style={FontStyle}>Currency</p> 
                   <input type='text' value='MMK' readOnly style={InputStyle}/>
                </div>
            </div>
            <h3 className='pospaymentmethod' style={FontStyle}>Payment Method</h3>
            <div className='pospaymentbody'>
                {paymentMethod.map((item,index)=>{
                    return(
                        <div key={index} className='poscurrency'>
                            <label htmlFor='input'><input type='radio'/>{item.name}</label>
                            <img src={item.logo}alt={`${item.name}_logo`} className='paymentimg'/>
                        </div>
                    )
                })}
            </div>
            <div className='pospaymentbutton'>
                <button>cancel</button>
                <button 
                style={{background : Font_Color ? '#ffff' : '#0D1B2A',
                 color : Font_Color ? '#0D1B2A':'white' }}>save changes</button>
            </div>
        </div>
    )
}
export default PosPaymentTax;