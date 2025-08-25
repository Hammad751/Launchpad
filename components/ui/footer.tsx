import Image from 'next/image';
import React from 'react'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
    return (
        <>
           <div className="min-h-[5rem] flex flex-col md:flex-row justify-around p-8 bg-[#f5f5f5]">

                {/* <div className="relative z-10"> */}
                    <div>
                        <Image src="/logo.svg" alt="VRCN Logo" width={150} height={150} />
                        <div className="flex items-baseline">
                        <h1 className="text-2xl sm:text-xl mx-2 md:text-3xl font-bold">
                        VRCN
                        </h1>
                        <h2 className="text-xl sm:text-lg md:text-2xl font-bold text-transparent bg-clip-text text-[#be9c6e]">
                        Launchpad
                        </h2>
                    </div>

                    </div>  
                    <div className='flex  flex-col'>
                        <h6 className=' text-xl font-bold'>
                            Support
                        </h6>

                        <div className='flex gap-3 mt-3'>
                            <a href='https://t.me/+xG1JjT-3EPIzZjNk'><FaTelegram size={30} /></a>
                        </div>

                    </div>

                    <div> 
                        <h6 className=' text-xl font-bold'>
                            Social Media
                        </h6>
                        <div className='flex gap-3 mt-3'>
                            <a href='https://x.com/VRCNOfficial'><BsTwitterX size={30}/></a>
                            <a href='https://www.facebook.com/officialvrcncoin'><FaSquareFacebook size={30} /></a>
                            <a href='https://www.instagram.com/vrcn.coin/'><FaInstagram size={30}/></a>
                            <a href='https://whatsapp.com/channel/0029VaECVXeF6smrq8uggj1r'><IoLogoWhatsapp size={30}/></a>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Footer;
