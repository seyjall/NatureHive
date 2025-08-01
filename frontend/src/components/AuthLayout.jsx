import React , {useEffect , useState} from 'react' 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




export default function Protected ({
    children , 
    authentication = true
}) {
    const navigate = useNavigate() 
    const [loader , setLoader] = useState(true) 
     const authStatus = useSelector(state => state.auth.status )
     
    //  console.log("authentication " , authentication); 
    //  console.log("authStatus" , authStatus);
     useEffect(() => {
        if(authentication && authStatus !== authentication ) {
            navigate("/login")
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
       
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        setLoader(false)

     } , [authStatus , navigate , authentication])

   
    return loader ? <h1>loading...</h1> : <>{children}</>
 }


