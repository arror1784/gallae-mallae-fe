import {authGPS} from "@/lib/utils/auth/authGPS";


export function authHandler(e,setShowCamera,i,authLocation,fetchingInit,setShowModal){
    e.stopPropagation();

    if(i===0){
        setShowCamera(true)
    }
    else{
        authGPS(authLocation).then(res=>{
            if(res.status===true){
                fetchingInit()
                setShowModal(false)
            }
        })

    }
}