'use client'

import {useEffect, useState} from "react";
import Link from "next/link";
import lo from "@/lib/data/lo";
import Image from "next/image";
import courseLo from "@/lib/data/courseLo";
import CameraView from "@/components/CameraView";
import {authHandler} from "@/lib/utils/auth/authHandler";

export default function CoursePage() {

    const [clicked, setClicked] = useState(0)
    const [init, setInit] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [authLocation, setAuthLocation] = useState([])

    function fetchingInit() {

        console.log("refetching")
        setInit(courseLo)
    }

    function stampClickHandler(e, location) {
        e.stopPropagation()
        setAuthLocation(location)
        setShowModal(true)
    }

    useEffect(() => {
        fetchingInit()
    }, [])


    return (
        <div className={'flex flex-col gap-6 m-3 mb-20'}>
            <div
                className={'grid grid-cols-2 text-center  h-12   items-center  font-medium text-[15px] text-gray-600 bg-blue-100 rounded-md  '}>

                <p onClick={() => setClicked(0)}
                   className={` rounded-md  ${clicked === 0 && 'm-1 p-2 text-black bg-white  '} `}>코스목록</p>
                <p onClick={() => setClicked(1)}
                   className={` rounded-md  ${clicked === 1 && ' m-1 p-2 text-black bg-white '} `}>진행도</p>
            </div>
            {
                clicked === 0 ?
                    <div className={'flex flex-col gap-8'}>
                        <div className={'flex flex-col gap-1 '}>
                            <div className={'flex  gap-2'}>
                                <span className="material-symbols-outlined">circle</span>
                                <p className={'text-[16px] font-bold '}>진행예정</p>
                            </div>
                            <div className={'flex flex-col gap-4'}>
                                {
                                    init.filter(x => x.state === 'planned').map((x, i) => <Link
                                        key={i}
                                        href={`/course/${x._id}`}><CardView init={x}/></Link>)
                                }
                            </div>
                        </div>

                        <div className={'flex flex-col gap-1'}>
                            <div className={'flex  gap-2'}>
                                <span className="material-symbols-outlined text-md">
check_circle
</span>
                                <p className={'text-[16px] font-bold '}>진행완료</p>
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                {
                                    init.filter(x => x.state === 'done').map((x, i) => <Link
                                        key={i}
                                        href={`/course/${x._id}`}><CardView showImg={false} init={x}/></Link>)
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <div className={'flex flex-col gap-8 '}>
                            {
                                init.filter(x => x.state === 'progress').map((x, i) => {
                                    const doneCount = x.progress
                                    return (
                                        <>
                                            <Link key={i} href={`/course/${x._id}`}>
                                                <div className={'border  rounded-md p-5 flex flex-col  gap-4'}>

                                                    <div className={'flex flex-col gap-1'}>
                                                        <p className={'font-bold text-lg '}>{x.courseName}</p>

                                                        <div
                                                            className={'flex justify-between text-[14px]  font-medium'}>
                                                            <p className={''}>진행도</p>
                                                            <p>{25 * x.progress}%</p>
                                                        </div>
                                                        <div
                                                            className={' h-3 overflow-hidden  rounded-full bg-gray-200 grid grid-cols-4'}>
                                                            {
                                                                Array.from({length: x.progress}, (_, i) => {
                                                                    return (
                                                                        <>
                                                                            <div key={i} className={'bg-blue-500'}>

                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className={'text-sm '}>
                                                        <p>시작일 <span className={'text-gray-600 '}>{x.start_date}</span>
                                                        </p>
                                                        <p>방문현황 <span className={'text-gray-600'}>{x.progress}/4</span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </Link>
                                            <div className={'flex flex-col gap-3'}>
                                                {
                                                    x.location.map((x, i) =>
                                                        <div
                                                            key={i}
                                                            onClick={() => window.open(`https://map.naver.com/p/search/${x.name}/address/isCorrectAnswer=true`)}
                                                            className={'flex border  rounded-md p-5 gap-5 relative overflow-hidden'}>
                                                            <Image src={'/imgs/naverMapLogo.webp'}
                                                                   width={20}
                                                                   height={20}
                                                                   className={' right-0 bottom-1 absolute  -z-10'} alt={'ds'}/>
                                                            <div className={' flex  w-full justify-between  '}>
                                                                <div className={'flex flex-col'}>
                                                                    <p className={'text-[15px] font-bold'}>{x.name}</p>
                                                                    <p className={'text-sm text-gray-600'}>{x.lo_kr}</p>
                                                                </div>
                                                                <Image onClick={e => stampClickHandler(e, x.location)}
                                                                       className={`flex items-end ${i<doneCount? 'pointer-events-none' :''}`}
                                                                       src={i < doneCount ? '/imgs/doneStamp.svg' : '/imgs/stamp.svg'}
                                                                       alt={'e'}
                                                                       width={30} height={30}/>


                                                            </div>

                                                        </div>
                                                    )
                                                }


                                            </div>
                                        </>
                                    )
                                })
                            }


                        </div>

                        <StampModal  {...{setShowModal, showModal, authLocation, fetchingInit}}/>
                        {/*{ showModal && <StampModal {...{setShowModal}}/>}*/}
                    </>
            }
        </div>
    )
}


function CardView({showImg = true, init}) {

    return (
        <div className={'border flex  flex-col rounded-md overflow-hidden'}>
            {
                showImg ? <div className={'h-32 bg-blue-50'}>

                </div> : null
            }

            <div className={'flex justify-between items-end p-3 '}>
                <div className={' flex flex-col '}>
                    <p className={'font-bold text-lg'}>{init.courseName}</p>
                    <p className={'text-sm text-gray-500'}>{init.sub_title}</p>
                </div>
                <span className="material-symbols-outlined  ">arrow_forward</span>
            </div>
        </div>

    )
}

function StampModal({setShowModal, showModal, authLocation, fetchingInit}) {

    const [showCamera, setShowCamera] = useState(false);
    useEffect(() => {
        setShowCamera(false)
    }, [showModal]);
    return (
        <>
            <div onClick={e => setShowModal(false)}
                 className={`fixed inset-0 bg-black/30 ${showModal ? 'opacity-100 ' : ' opacity-0 pointer-events-none '} duration-100 ease-in-out   flex  items-center  justify-center z-20`}>
                <div className={' flex flex-col gap-5 '}>
                    {
                        ['영수증인증', '위치인증'].map((x, i) => {
                            return (
                                <button
                                    key={i}
                                    onClick={e => {
                                        authHandler(e, setShowCamera, i, authLocation, fetchingInit, setShowModal)
                                        // setShowCamera(true)
                                    }}
                                    className={'w-44 py-5 text-black  shadow bg-blue-50    font-bold   rounded-lg flex flex-col items-center justify-center gap-3'}><span
                                    className="material-symbols-outlined  ">{i === 0 ? 'receipt' : 'location_on'}</span>{x}
                                </button>
                            )
                        })
                    }


                </div>
                {
                    showCamera &&
                    <div onClick={e => {
                        e.stopPropagation()
                    }} className={'fixed flex bg-black/20 inset-0 justify-center items-center pointer-events-none  '}>

                        <CameraView {...{setShowModal}}/>
                        {/*<h1>dsadasdasdas</h1>*/}
                    </div>

                }
            </div>

        </>
    )
}