import React from 'react';
import heroImage from '../../assets/images/hero.png';
import about from "../../assets/images/abouting.png";
import { LuTwitter } from 'react-icons/lu';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Home = () => {
  return (
    <>
    <div className='flex px-5 py-32 bg-black justify-center '>
      <div className='w-1/2 flex flex-col justify-center ml-40'>
        <h1 className='text-white text-7xl font-oswald'>
          Hey,<br /> Welcome to this <span className='text-green-700'>TASK MANAGEMENT</span>
        </h1>
        <p className='text-2xl text-white font-playwrite'>
          Get developed with this app
        </p>
        <div className='mt-4 flex flex-row gap-5'>
          <a href='#'><LuTwitter className='text-white' size={30} /></a>
          <a href='#'><FaFacebook className='text-white' size={30} /></a>
          <a href='#'>< FaLinkedin className='text-white' size={30} /></a>
        </div>
      </div>
      <div className='w-1/2 flex justify-center'>
        <img className='w-2/3' src={heroImage} alt="Hero" />
      </div>
    </div>
    <div className='border-t border-green-700'></div> 
    <div className='flex bg-black'>
    <div className='w-1/2'>
        <img  className= 'h-400' src ={about}/>
    </div>
    <div  className='w-1/2 flex justify-center'>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-green-700 border-b-4 mb-5 w-[160px] font-bold'>About us</h1>
            <p className='text-white'>Some information about our website</p>
        </div>
    </div>
    </div>
    </>
  );
}

export default Home;
