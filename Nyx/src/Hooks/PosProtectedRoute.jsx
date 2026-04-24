import { Children, useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { Context } from "./context";

const PosProtectedRoute =({children})=>{

    const ContextData=useContext(Context);
    const {Token,SetToken}=ContextData;

    if(!Token){
        return <Navigate to='/login/poslogin' replace />
    }
    return children;

}
export default PosProtectedRoute;