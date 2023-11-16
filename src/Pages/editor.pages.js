import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

const Editor=()=>{
    let{userAuth:{access_token}}=useContext(UserContext)
    return(
        access_token===null?<Navigate to='/signin'/>:<h1>You can edit</h1>
    )
}
export default Editor;