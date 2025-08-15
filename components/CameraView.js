'use client'

import {useEffect, useRef, useState} from "react";
import {camera} from "@/lib/utils/camera/camera";
import lo from "@/lib/data/lo";

export default function CameraView({setShowModal}) {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const stream = useRef(null);
    const handleCapture = (e) => {
        e.preventDefault()
    };

    useEffect(() => {
        let t
        if (videoRef.current) {
            camera(videoRef, setLoading).then(res => {
                stream.current = res
            })
        }


        return () => {
            if (stream.current) {
                stream.current.getTracks().forEach((track) => track.stop());
            }
        }
    }, []);


    return (
        <>

                <div className={`relative ${stream.current ? 'visible' : 'hidden'}    flex justify-center  `}>
                    <video ref={videoRef} autoPlay playsInline
                           className={`rounded-2xl shadow   h-[80dvh]   `}>

                    </video>
                    <button onClick={e => setShowModal(false)} className={'absolute z-40 top-0 left-0 p-4'}><span
                        className="material-symbols-outlined text-white">
close
</span></button>
                    {/*{*/}
                    {/*    stream.current ||*/}
                    {/*}*/}
                    <button onClick={handleCapture}
                            className="absolute  bottom-5 w-12 h-12 bg-white  border  rounded-full text-white ">

                    </button>
                </div>
                <div className={`${stream.current ? 'hidden' : 'visible'} bg-white  inset-0 fixed flex justify-center items-center`}>
                    <p className={'text-2xl font-bold '}>CAMERA LOADING...</p>
                </div>

        </>
    )
}