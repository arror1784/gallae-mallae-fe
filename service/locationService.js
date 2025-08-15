import axios from "axios";


export  async function getReverseGeoLocation (lat,lng){
    const {data}=await axios.get('/api/reversegeo',{
        params:{
            lat,
            lng
        }
    })

    return data
}