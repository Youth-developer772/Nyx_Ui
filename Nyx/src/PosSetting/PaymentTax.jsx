import '../PosSettingCss/paymenttax.css';
import Kpay from '../images/kbz.png';
import wavepay from '../images/wavepay.png';
import cbpay from '../images/cbpay.png';
import Cash from '../images/Vector.png';
import Unknow from '../images/barpone.png'

function PosPaymentTax(){

    let paymentMethod=[
        {name:'Kpay',logo:Kpay},
        {name:'Kpay',logo:wavepay},
        {name:'Kpay',logo:cbpay},
        {name:'Kpay',logo:Cash},
        {name:'Kpay',logo:Unknow},
    ]
    return(
        <div className='pospaymentwarper'>
            <div className='pospaymentchild2'>
                <div>
                    <p>Tax Percentage( % )</p>
                    <input type="text" value={5} readOnly/>
                </div>
                <div>
                   <p>Currency</p> 
                   <input type='text' value='MMK' readOnly/>
                </div>
            </div>
            <h3 className='pospaymentmethod'>Payment Method</h3>
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
                <button style={{background:'#0D1B2A',color:'white'}}>save changes</button>
            </div>
        </div>
    )
}
export default PosPaymentTax;