'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import options from "@/lib/data/options";
import {useRouter} from "next/navigation";
import {Slider} from "antd";
import {getCurrentPosition} from "@/service/getCurrentLocation";
import axios from "axios";
import {getReverseGeoLocation} from "@/service/locationService";

const logo = ['account_circle', 'person', 'location_on', 'star']
export default function Home() {

    const router = useRouter();
    const [location,setLocation]=useState('위치정보 받아오기');

    return (

        <div className={' bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 py-10  '}>
            <div className={'text-center text-2xl font-bold mb-8 '}>
                <span className="material-symbols-outlined text-6xl text-white">star_shine</span>
                <p className={' '}>프로필 설정</p>
            </div>
            <div className={'flex flex-1  justify-center '}>

                <form onSubmit={e => {
                    e.preventDefault()
                    let formCheck=true
                    // console.log([...(new FormData(e.target).keys)])
                    // console.log(e.target)
                    new FormData(e.target).forEach((x, i) => {
                        console.log(i,x)
                       // if(!x){
                       //     formCheck=false
                       //
                       // }

                    })
                    // formCheck?router.push('/home') : alert('폼을 모두 채워주세요')
                    router.push('/home')
                }} className="flex flex-col gap-5   ">

                    {
                        Object.keys(options).map((x, i) => {
                            return (
                                <RadioOptions key={i} name={x} options={options[x]} logo={logo[i]}/>
                            )
                        })
                    }

                    <div className={'flex flex-col gap-5  shadow   bg-white rounded-lg font-medium p-5'}>
                        <div className={'flex  gap-2'}>
                            <span className="material-symbols-outlined">{logo[2]}</span>
                            <p className={'text-md  text-md font-bold '}>위치</p>
                            <button onClick={(e)=> {
                                e.preventDefault()
                                getCurrentPosition().then(res=>{
                                    console.log(res)
                                    getReverseGeoLocation(res.lat,res.lng).then(res=>setLocation(res.documents[0].address_name))
                                }).catch(e=> {
                                    console.log(e)
                                    setLocation('위치정보 에러!')
                                })
                            }}
                                    className={'text-stone-500 text-sm '}
                            >{location}</button>
                        </div>
                    </div>
                    <div className={'flex justify-center mb-5 '}>
                        <button type={'submit'}>
                            <span className="material-symbols-outlined border    rounded-xl p-3">arrow_forward</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function RadioOptions({name, options, logo}) {
    const [selected, setSelected] = useState('');
    const [slider, setSlider] = useState(50);
    return (
        <div  className={'flex flex-col gap-5  shadow   bg-white rounded-lg font-medium p-5'}>
            <div className={'flex  gap-2'}>
                <span className="material-symbols-outlined">{logo}</span>
                <p className={'text-md  text-md font-bold '}>{name}</p>
            </div>
            {
                name === '혼잡도' ? <div>

                        <Slider
                            onChange={setSlider}
                            marks={{
                                0: '한적',
                                25: ' ',
                                50: '보통',
                                75: ' ',
                                100: '복잡'

                            }} step={null} tooltip={false} name={name} defaultValue={50}/>
                        <input type="hidden" name="한적도" value={slider}/>
                    </div> :

                    <div className={'grid grid-cols-2 gap-3  justify-center'}>

                        {options.map((option) => (
                            <label
                                key={option}
                                className={` text-center text-sm w-36 py-2 rounded-md border cursor-pointer transition-all
                        ${
                                    selected === option
                                        ? 'bg-blue-100 text-blue-600 font-bold  border-blue-400'
                                        : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={option}
                                    checked={selected === option}
                                    onChange={() => setSelected(option)}
                                    className="hidden"
                        />
                        {option}
                    </label>
                ))}
            </div>
            }
        </div>
    )
}
