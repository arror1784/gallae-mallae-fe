'use client'

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {

    const [show, setShow] = useState(true);
    const pathName=usePathname()
    const [scroll,setScroll] = useState(0);
    function scrollHandler(){
        const currentScrollY = window.scrollY;

        if (currentScrollY > scroll) {
            setShow(false);
        } else {
            setShow(true);
        }

    }
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [scroll]);
    if(!(pathName==='/' || pathName.startsWith('/course/') || pathName.startsWith('/map'))) {
        return (
            <div className={'flex justify-center  items-center  '}>
                <div className={`grid grid-cols-5 bottom-0  bg-white/20 border backdrop-blur-lg fixed max-w-[500px] ${show?'translate-y-0':'translate-y-full'} duration-200  justify-center px-10 gap-10 py-2 bg-opacity-100 rounded-t-lg  bg-white`}>
                    <Link href={'/home'}>
                    <Image width={24} height={48} src={'/imgs/navBar/home.svg'} alt={'e'}/>
                    </Link>
                    <Link href={'/course'}>
                    <Image  width={24} height={48} className={''} src={'/imgs/navBar/course.svg'} alt={'e'}/>
                    </Link>
                    <Link href={'/map'}>
                    <Image width={24} height={48} src={'/imgs/navBar/map.svg'} alt={'e'}/>
                    </Link>
                    <Image width={24} height={48} src={'/imgs/navBar/community.svg'} alt={'e'}/>
                    <Image width={24} height={48} src={'/imgs/navBar/myPage.svg'} alt={'e'}/>

                </div>

            </div>
        )
    }
    else return null
}