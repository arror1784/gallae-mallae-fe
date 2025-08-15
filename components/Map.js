'use client';
import 'swiper/css';
import {useEffect, useRef, useState} from 'react';
import MapBottomView from "@/components/map/MapBottomView";
import SlideCardView from "@/components/map/SlideCardView";
import MapCardView from "@/components/map/MapCardView";
import {mapInit, mapInitByCourse} from "@/lib/utils/map/maphandler";
import {getCurrentPosition} from "@/service/getCurrentLocation";
import {panToLocation} from "@/lib/utils/map/panToLocation";

export default function NaverMap({init: lo, type = true, course, check: progress}) {
    const mapRef = useRef(null);
    const [tMap, setTMap] = useState(null);
    const [show, setShow] = useState([false, 0])
    const [prevMarker, setPrevMarker] = useState(0);
    const [showType, setShowType] = useState(['카페']);
    const [showCourseIndex,setShowCourseIndex] = useState(0);
    const [location, setLocation] = useState([36.3504567, 127.3848187]);
    const markerRefs = useRef([]);
    const polyLineRef = useRef(null);
    function showHandler(index, check) {
        setShow(e => {
                setPrevMarker(e[1])
                return ([check, index])
            }
        )
    }

     function mapParamsInit(){
        return {
            mapRef,
            location,
            setLocation,
            setTMap,
            showHandler,
            markerRefs,
            polyLineRef
        }
    }


    // useEffect(() => {
    //     getCurrentPosition().then(res=>setLocation([res.lat,res.lng])).catch(e=>console.error(e));
    // }, []);
    useEffect(() => {

        if (!mapRef.current) return null;
        if (type) {


            return mapInit(lo, true, 0.005, false,mapParamsInit())
        } else {

            let t=course ? '도보' : '카페'
            console.log('위치정보변경')
            return mapInitByCourse(t, course,setShowType,showType,course,lo,showCourseIndex,mapParamsInit,tMap)
        }

    }, [showType[0], course,location,showCourseIndex]);

    useEffect(() => {

        function changeMarkerColor(i,color){
            let c= color==='blue'? `text-blue-600` : 'text-red-600'
            markerRefs.current[i].setIcon({
                content: `<span class="material-symbols-outlined text-4xl ${c}" style="font-variation-settings: 'FILL' 1;">location_on</span>`,
                anchor: new naver.maps.Point(16, 34)
            })

        }
        try {

            changeMarkerColor(show[1],'red')

            prevMarker === show[1] || changeMarkerColor(prevMarker,'blue')

        } catch (e) {
            showHandler(0, false)
            changeMarkerColor(0,'red')
        }
    }, [show[1], showType[0],location,showCourseIndex]);


    if (!type) {
        let menu = course ? ['도보', '버스', '지하철', '자차'] :['식당', '카페', '서점', '스포츠']
        return (
            <>

                <div
                    ref={mapRef}
                    className={'h-full  relative '}
                >
                    <FindMyLocationButton {...{tMap}}/>
                    <MapBottomView {...{
                        menu,
                        mapRef,
                        showType,
                        setShowType,
                        showHandler,
                        show,
                        tMap,
                        course,
                        setShowCourseIndex,
                        showCourseIndex,
                    }}/>
                </div>
            </>
        )
    }
    return (
        <>


            <div
                ref={mapRef}
                className={'h-full  flex flex-1  justify-center relative '}
            >

            <FindMyLocationButton {...{tMap}}/>
                {
                    show[0] ?
                        <MapCardView init={lo[show[1]]}/>
                        :
                        <div className={'absolute bottom-8 flex flex-col gap-2'}>
                            <SlideCardView {...{lo, tMap, showHandler, progress}} />
                        </div>


                }


            </div>
        </>
    );
};

function FindMyLocationButton({tMap}){

    return (
        <>
            <button onClick={e => getCurrentPosition().then(res => panToLocation(tMap, res.lat, res.lng))}
                    className={'absolute top-0 z-30  right-0'}><span className="material-symbols-outlined p-5 ">
location_searching
</span></button>
        </>
    )
}