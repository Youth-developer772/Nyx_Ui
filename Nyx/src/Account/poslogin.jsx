import { useContext, useRef } from 'react';
import './login.css';
import { Context } from '../Hooks/context';
import { useNavigate } from 'react-router-dom';
function PosLogin(){

    const navigate=useNavigate();

    const ContextData = useContext(Context);
    const {token,setToken} = ContextData;
    const emailref=useRef();
    const passwordref=useRef();


    async function adminLogin(e){
        e.preventDefault();
        let data={
            email:emailref.current.value,
            password:passwordref.current.value
        }
        try {
            let response= await fetch(import.meta.env.VITE_ADMIN_LOGIN,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                let data= await response.json()
                console.log(data)
                if(!(data.token == 'Invalid email or password')){
                    localStorage.setItem('JWTToken',data.token);
                    setToken(true);
                    navigate('/');
                }
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form className="posloginwarper" onSubmit={adminLogin}>
            <span>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required ref={emailref}/>
            </span>

            <span>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required ref={passwordref}/>
                <p>Forgot Password ?</p>
            </span>
            
            <button>Login</button>
        </form>
    )
}
export default PosLogin;