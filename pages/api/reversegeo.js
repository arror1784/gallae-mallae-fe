import axios from "axios";


export default async function handler(req, res) {

    if(req.method==='GET'){

        try {
            const result = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2regioncode.json', {
                headers: {
                    Authorization: `KakaoAK ${process.env.REVERSE}`
                },
                params: {
                    y: req.query.lat,
                    x: req.query.lng
                }
            })
            return res.status(200).send(result.data)
        }catch (e){
            console.log(e)
            return res.status(500).send(e)
        }
    }
}