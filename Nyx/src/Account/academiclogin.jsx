import { useNavigate } from "react-router-dom";

function AcademicLogin(){
    const navigate=useNavigate();
    return(
        <form className="posloginwarper">
             <span>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" />
            </span>

            <span>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" />
                <p>Forgot Password ?</p>
            </span>

            <button onClick={()=>navigate('/class')}>Login</button>
        </form>
    )
}
export default AcademicLogin;