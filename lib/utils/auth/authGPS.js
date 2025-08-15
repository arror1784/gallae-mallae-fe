import {getCurrentPosition} from "@/service/getCurrentLocation";


export async  function authGPS(location, meters = 120) {

    const [placeLat, placeLng] = location
    const latOffset = meters / 111320;
    const lngOffset = meters / (111320 * Math.cos(placeLat * Math.PI / 180));

    const minLat = placeLat - latOffset
    const maxLat = placeLat + latOffset
    const minLng = placeLng - lngOffset
    const maxLng = placeLng + lngOffset


    let error=false
    console.log(`장소lo ${location}`)
    let currentLat
    let currentLng

    try {
        const res = await getCurrentPosition()
        currentLat = res.lat
        currentLng = res.lng

        if ((currentLat >= minLat && currentLat <= maxLat) && (currentLng >= minLng && currentLng <= maxLng)) {

            alert('인증성공')
            return {
                status: true
            }
        }
        else {
            alert('인증실패 ')
            return {

                status: false
            }
        }
    }catch (e){

        alert('현재 위치정보를 받아올 수 없습니다 ')
        return {
            status:false
        }
    }
}