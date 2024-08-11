import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModeToggle } from '../ui/mode-toggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const LinksData = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Login',
            link: '/Login'
        },
        {
            title: 'Register',
            link: '/Register'
        }
    ];

    return (
        <div className='w-full h-[8vh] flex flex-row justify-between items-center bg-black text-white border-b-2 border-green-500 relative'>
            <div className='h-full w-1/4 flex justify-center items-center font-bold'>
                Logo
            </div>
            <div className='hidden md:flex h-full w-3/4 justify-center items-center gap-10'>
                {
                    LinksData.map((data, index) => (
                        <li key={index} className='list-none'>
                            <NavLink
                                to={data.link}
                                className='text-white font-bold hover:text-green-500'
                                
                            >
                                {data.title}
                            </NavLink>
                        </li>
                    ))
                }
            </div>
            <div className='md:hidden flex items-center'>
                <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
                    {isOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3Icon className='h-6 w-6' />}
                </button>
            </div>
            {isOpen && (
                <div className='md:hidden absolute top-full left-0 w-full flex flex-col items-center gap-2'>
                    {
                        LinksData.map((data, index) => (
                            <NavLink
                                key={index}
                                to={data.link}
                                className='text-white font-bold hover:text-green-500 p-2'
                                
                            >
                                {data.title}
                            </NavLink>
                        ))
                    }
                    <ModeToggle/>
                </div>
            )}
        </div>
    );
}

export default Navbar;
