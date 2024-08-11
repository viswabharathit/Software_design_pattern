import React from 'react';
import { NavLink } from 'react-router-dom';
import { Star, Power ,ClipboardList,CalendarCheck2,CircleEllipsis,LayoutList} from 'lucide-react';
import { Button } from '../ui/button';
import '../../assets/css/styles.css'



const Leftbar = () => {
  const AdminLinks = [
    {
      title: 'AllTasks',
      link: '/alltasks',
      icon: ClipboardList,
    },
    {
      title: 'Completed',
      link: '/completed',
      icon: CalendarCheck2,
    },
    {
      title: 'Progress',
      link: '/progress',
      icon: CircleEllipsis,
    },
    {
      title: 'Important tasks',
      link: '/important',
      icon: Star,
    },
  ];

  return (
    <div className='leftbar h-screen w-1/6 flex justify-center items-center flex-col shadow-sm shadow-primary pt-10m border-gray-500 border-x-2'>
      
      <div className='links h-[90%] w-full flex flex-col justify-start items-center gap-4'>
        {AdminLinks.map((data, index) => (
          <NavLink
            key={index}
            to={data.link}
            className='link p-5 bg-primary/5 hover:bg-primary/10 font-bold mt-2 w-full'
          >
            <span className='flex flex-row items-center justify-start h-full w-full gap-2'>
              {React.createElement(data.icon, { size: 20 })}
              {data.title}
            </span>
          </NavLink>
        ))}
      </div>
      <div className='logout h-[5%] w-full flex flex-col justify-center items-center'>
        <Button className='p-10 bg-red-500/5 hover:bg-red-500/10 font-bold w-full'>
          <span className='flex flex-row items-center justify-start h-full w-full gap-4 text-red-500'>
            <Power size={20} /> Logout
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Leftbar;
