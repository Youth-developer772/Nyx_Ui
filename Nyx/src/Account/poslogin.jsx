import { useContext } from 'react';
import './login.css';
import { Context } from '../Hooks/context';
import { useNavigate } from 'react-router-dom';
function PosLogin(){

    const navigate=useNavigate();

    const ContextData = useContext(Context);
    const {setToken} = ContextData;

    const handlelogin=(e)=>{
        e.preventDefault();
        localStorage.setItem('allow','true')
        setToken(true)
        navigate('/')
    }

    return(
        <form className="posloginwarper" onSubmit={handlelogin}>
            <span>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required/>
            </span>

            <span>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required/>
                <p>Forgot Password ?</p>
            </span>
            
            <button>Login</button>
        </form>
    )
}
export default PosLogin;