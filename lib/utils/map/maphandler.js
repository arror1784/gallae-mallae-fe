import {markHandler} from "@/lib/utils/map/markhandler";


function fetchDataByLocation(){

}
export function mapInitByCourse(def, line, setShowType, showType, course, lo, showCourseIndex, handler, tMap) {
    let t = lo.filter(x => x.type === showType[0])
    const temp=handler()
    if (t.length === 0) {

        if (course) {
            t = lo.find(x => x.type === def).location
        } else t = lo.filter(x => x.type === def)

        setShowType([def, t])
        return mapInit(t, line, 0.005, true, handler())
    } else if (course) {
        setShowType([showType[0], t[showCourseIndex].location])
        if (tMap) {
            polyLineHandler(temp.polyLineRef, t[showCourseIndex].location, tMap)
            return markHandler(t[showCourseIndex].location, tMap, temp.showHandler, temp.markerRefs, true)
        }
        return mapInit(t[showCourseIndex].location, line, 0.005, true, handler())
    } else {

        console.log(`여기에서 위치정보 바탕으로 수정 다시 데이터 초기화  ${location}`)
        setShowType([showType[0], t])
        // console.log(tMap)
        if (tMap) {

            return markHandler(t, tMap, temp.showHandler, temp.markerRefs, true)
        }
        // markHandler(t,)
        return mapInit(t, line, 0.005, true, handler())
    }
}

export function mapInit(init, line = false, num, search = false, {
    mapRef,
    location,
    setLocation,
    setTMap,
    showHandler,
    markerRefs,
    polyLineRef
}) {
    let x = init[0].location[0]
    let y = init[0].location[1]

    if (search) {
        x = location[0]
        y = location[1]
    }
    const mapOptions = {
        center: new naver.maps.LatLng(x, y),

        disableDoubleClickZoom: true,
        mapDataControl: false,
        zoom: 15,

    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);
    setTMap(map);
    if (!search) {
        naver.maps.Event.addListener(map, "click", (e) => {
            showHandler(0, false)
            map.panTo(mapOptions.center);
        });
    }
    markHandler(init, map, showHandler, markerRefs);
    if (line) {
        polyLineHandler(polyLineRef, init, map)

    }

    if (search) {
        naver.maps.Event.addListener(map, 'dragend', function () {
            const center = map.getCenter();
            const lat = center.lat();
            const lng = center.lng();

            setLocation([lat, lng])
        });
    }
}

function polyLineHandler(polyLineRef, init, map) {
    console.log(polyLineRef)
    if (polyLineRef.current) {
        polyLineRef.current.setMap(null)
    }

    polyLineRef.current = new naver.maps.Polyline({
        path: init.map(x => new naver.maps.LatLng(x.location[0], x.location[1])),
        strokeColor: '#e67129',
        strokeWeight: 3,
        strokeStyle: 'shortdash',
        strokeLineCap: 'round',
        map: map
    });

}
