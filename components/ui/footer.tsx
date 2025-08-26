import Image from 'next/image';
import React from 'react'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
const Footer = () => {
    return (

        <footer className="bg-grey-400 text-black py-4 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Mobile: 2 cols | Desktop: 3 cols */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

                    {/* Column 1 - Logo */}
                    <div>
                        <Image src="/logo.svg" alt="VRCN Logo" width={150} height={150} />
                    </div>

                    {/* Column 2 - Support */}
                    <div className='flex flex-col  md:flex-row justify-between'>
                        {/* <div className='flex flex-col grid-cols md:grid-cols-3'> */}
                        <div className='flex flex-col'>
                            <h3 className="text-lg font-semibold mb-2">Support</h3>
                            <div className='flex gap-3 mt-0 md:mt-3'>
                                <a href="https://t.me/+xG1JjT-3EPIzZjNk"><FaTelegram size={30} /></a>
                                <a href="https://discord.gg/vgdGwVud"><BsDiscord size={30} /></a>
                            </div>

                        </div>
                        {/* <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://x.com/VRCNOfficial"><BsTwitterX size={30} /></a>
                                <a href="https://www.facebook.com/officialvrcncoin"><FaSquareFacebook size={30} /></a>
                                <a href="https://www.instagram.com/vrcn.coin/"><FaInstagram size={30} /></a>
                                <a href="https://whatsapp.com/channel/0029VaECVXeF6smrq8uggj1r"><IoLogoWhatsapp size={30} /></a>
                            </div> */}
                        {/* </div> */}
                        <div className=' '>
                                                  <div className='flex flex-col'>
                                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="https://x.com/VRCNOfficial"><BsTwitterX size={30} /></a>
                                    <a href="https://www.facebook.com/officialvrcncoin"><FaSquareFacebook size={30} /></a>
                                    <a href="https://www.instagram.com/vrcn.coin/"><FaInstagram size={30} /></a>
                                    <a href="https://whatsapp.com/channel/0029VaECVXeF6smrq8uggj1r"><IoLogoWhatsapp size={30} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 - Social Media */}
                </div>
            </div>
        </footer>


    );
};


export default Footer;




// <div className="min-h-[5rem] flex flex-col md:flex-row justify-around items-start gap-8 p-8 bg-[#f5f5f5]">

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Column 1 - Logo */}
//         <div className="flex flex-col items-center sm:items-start">
//             <Image src="/logo.svg" alt="VRCN Logo" width={100} height={150} />
//             {/* <h2 className="font-bold text-lg">VRCN Launchpad</h2> */}
//         </div>

//         {/* Column 2 - Support */}
//         <div className="flex flex-col items-center sm:items-start">
//             <h3 className="font-semibold">Support</h3>
//             <div className="flex gap-3 mt-2">
//                 <a href="https://t.me/+xG1JjT-3EPIzZjNk"><FaTelegram size={30} /></a>
//                 <a href="https://discord.gg/vgdGwVud"><BsDiscord size={30} /></a>
//             </div>
//         </div>

//         {/* Column 3 - Social Media */}
//         <div className="flex flex-col items-center sm:items-start">
//             <h3 className="font-semibold">Social Media</h3>
//             <div className="flex gap-3 mt-2">
//                 <a href="https://x.com/VRCNOfficial"><BsTwitterX size={30} /></a>
//                 <a href="https://www.facebook.com/officialvrcncoin"><FaSquareFacebook size={30} /></a>
//                 <a href="https://www.instagram.com/vrcn.coin/"><FaInstagram size={30} /></a>
//                 <a href="https://whatsapp.com/channel/0029VaECVXeF6smrq8uggj1r"><IoLogoWhatsapp size={30} /></a>
//             </div>
//         </div>
//     </div>

{/* Logo & Title */ }
{/* <div>
        <Image src="/logo.svg" alt="VRCN Logo" width={100} height={150} />
        <div className="flex items-baseline">
          <h1 className="text-2xl sm:text-xl mx-2 md:text-3xl font-bold">VRCN</h1>
          <h2 className="text-xl sm:text-lg md:text-2xl font-bold text-[#977545]">
            Launchpad
          </h2>
        </div>
      </div> */}

{/* Support Section */ }
{/* <div>
        <h6 className="text-xl font-bold">Support</h6>
        <div className="flex gap-3 mt-3">
          <a href="https://t.me/+xG1JjT-3EPIzZjNk"><FaTelegram size={30} /></a>
          <a href="https://discord.gg/vgdGwVud"><BsDiscord size={30} /></a>
        </div>
      </div> */}

{/* Social Media Section */ }
{/* <div>
        <h6 className="text-xl font-bold">Social Media</h6>
        <div className="flex gap-3 mt-3">
          <a href="https://x.com/VRCNOfficial"><BsTwitterX size={30}/></a>
          <a href="https://www.facebook.com/officialvrcncoin"><FaSquareFacebook size={30} /></a>
          <a href="https://www.instagram.com/vrcn.coin/"><FaInstagram size={30}/></a>
          <a href="https://whatsapp.com/channel/0029VaECVXeF6smrq8uggj1r"><IoLogoWhatsapp size={30}/></a>
        </div>
      </div> */}
// </div>