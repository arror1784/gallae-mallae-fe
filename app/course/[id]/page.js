'use client'

import {useRouter} from "next/navigation";
import NaverMap from "@/components/Map";
import lo from "@/lib/data/lo";
import {useEffect, useState} from "react";
import courseLo from "@/lib/data/courseLo";
import axios from "axios";

export default function CourseDetailPage({params}) {

    const [init,setInit] = useState([]);
    const router = useRouter()
    useEffect(() => {
        setInit(courseLo.find(x => x._id == params.id))
    },[])

    return (
        <div className={'flex flex-col h-[100dvh] relative'}>
            <div className={'flex absolute z-10  items-center   justify-center h-12  font-bold'}>
                <div onClick={() => router.back()} className={'flex gap-3 bg-white/30 backdrop-blur-lg ml-5 border p-2 px-4 rounded-lg mt-5'}>
                    <span  className="material-symbols-outlined">arrow_left_alt</span>
                    <p>{init.courseName} </p>
                </div>
            </div>
            <div className={'flex-1 '}>
                {
                    init.length===0? null:<NaverMap init={init.location} check={init.state}/>
                }


            </div>
        </div>
    )
}