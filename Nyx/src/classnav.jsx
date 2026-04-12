import { useNavigate } from "react-router-dom"

function Classnav(){
    const nagivate=useNavigate()
    return(
        <>
        <div>
            <button onClick={()=>nagivate('/')}>On click</button>
        </div>
        </>
    )
}
export default Classnav;