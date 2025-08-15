'use client'

import NaverMap from "@/components/Map";
import lo from "@/lib/data/lo";
import {useEffect, useState} from "react";
import course from "@/lib/data/course";
import {useRouter} from "next/navigation";

export default function Map() {

    const [type,setType] = useState(false);
    const [init,setInit]=useState([]);
    const router=useRouter();

    function fetchInit(type){

        setInit(type? course: lo)
        setType(type)
    }

    function changeMenuHandler(type){
       fetchInit(type)
    }

    useEffect(()=>{
        fetchInit(type)
    },[])



    if(init.length===0 ){
        return null
    }
    return (
        <div className={'h-[100dvh]  relative'}>

                        <span tabIndex={0} onClick={() => router.back()}
                              className=" absolute m-5  font-medium z-20 material-symbols-outlined">
arrow_back
</span>
            <div className={'absolute  z-10 w-full p-3 flex justify-center '}>

                <div className={'bg-blue-400/10 backdrop-blur-xl rounded-full p-1'}>
                    <button onClick={e => changeMenuHandler(false)}
                            className={`text-md  font-medium py-1 px-5   text-gray-700  rounded-full rounded-r-none  ${type == 0 ? 'bg-white/70' : ''}`}>장소
                    </button>
                    <button onClick={e => changeMenuHandler(true)}
                            className={`text-md  font-medium py-1 px-5   text-gray-700  rounded-full rounded-l-none  ${type == 1 ? 'bg-white/70' : ''}`}>코스
                    </button>
                </div>
            </div>

            <NaverMap {...{init}} type={false} course={type}/>


        </div>
    )
}