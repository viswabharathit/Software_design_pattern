import React from 'react';
import ShineBorder from '../magicui/shine-border';
import heroImage from '../../assets/images/hero.png';
import about from "../../assets/images/abouting.png";
import timesplitting from "../../assets/images/timesplitting.png"
import { LuTwitter } from 'react-icons/lu';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CarouselPlugin } from '../ui/CarouselPlugin';
import '../../assets/css/styles.css';
import PulsatingButton from '../ui/pulsating-button';
import Carouselhome from '../ui/Carouselhome';


const Home = () => {
  return (
    <>
    <div className='flex px-5 py-32 bg-black justify-center '>
      
      
    <ShineBorder
      borderRadius={8}
      borderWidth={2}
      duration={10}
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      className="relative w-1/2 flex flex-col items-start justify-start p-2 rounded-lg border bg-black md:shadow-xl ml-20"
    >
      <h1 className='text-white text-5xl font-oswald'>
        Hey,<br /> Welcome to this <span className='text-green-700'>TASK MANAGEMENT WEBSITE ...</span>
      </h1>
      <p className='text-xl text-white font-playwrite mt-2'>
      Plans are nothing; planning is everything.
      </p>
      <div className='mt-4 flex flex-row gap-3'>
        <a href='#'><LuTwitter className='text-white' size={20} /></a>
        <a href='#'><FaFacebook className='text-white' size={20} /></a>
        <a href='#'><FaLinkedin className='text-white' size={20} /></a>
      </div>
      <div className='mt-4 px-40'>
      <PulsatingButton/>

      </div>
    </ShineBorder>
      <div className='w-1/2 flex justify-center'>
        <img className='w-2/3' src={heroImage} alt="Hero" />
      </div>
    </div>

    {/* Carousel Component */}
    <div className='py-16'>
        <Carouselhome />
      </div>
   
    {/* 2nd division */}
    <div className='border-t border-green-700'></div> 
    <div className='flex bg-black'>
    <div className='w-1/2'>
        <img  className= 'h-400' src ={about}/>
    </div>
      <div  
      className='w-1/2 flex justify-center'>
          <div className='flex flex-col justify-center'>
              <h1 className='text-4xl text-green-700 border-b-4 mb-5 ml-5 w-[160px] font-bold text-hover-effect'>About us</h1>
              <p className='text-white font-oswald mr-5 ml-5 text-2xl text-hover-effect'>Welcome to our Task Management Website, your ultimate solution for efficient and seamless project management.
                Our platform is designed to streamline the process of assigning, tracking, and completing tasks within your team. Whether you're a project manager overseeing a large project or a team member working on specific tasks, 
                our website offers a user-friendly interface to keep everyone on the same page.</p>
          </div>
      </div>

  </div>
  {/* 3rd division */}
  <div className='flex px-5 py-32 bg-black justify-center '>
      
      
    <ShineBorder
      borderRadius={8}
      borderWidth={2}
      duration={10}
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      className="relative w-1/2 flex flex-col items-start justify-start p-2 rounded-lg border bg-black md:shadow-xl ml-20"
    >
      <CarouselPlugin/>
    </ShineBorder>
      <div className='w-1/2 flex justify-center'>
        <img className='w-2/3' src={timesplitting} alt="Hero" />
      </div>
    </div>
    </>
  );
}

export default Home;
