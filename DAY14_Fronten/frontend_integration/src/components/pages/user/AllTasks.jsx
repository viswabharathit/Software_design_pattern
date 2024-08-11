import React, { useState } from 'react';
import Cards from '../Cards';
import { CirclePlus } from 'lucide-react';
import Inputdata from '../Inputdata';

const AllTasks = () => {
  const [showInput, setShowInput] = useState(false);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleClose = () => {
    setShowInput(false);
  };

  return (
    <>
      <div className='bg-black h-full'>
        <div className='w-full flex justify-end p-4 py-2'>
          <CirclePlus 
            className='text-5xl text-gray-300 hover:text-gray-100 transition-all' 
            onClick={handleAddClick}
          />
        </div>
        <Cards onAddClick={handleAddClick} />
      </div>
      {showInput && <Inputdata onClose={handleClose} />}
    </>
  );
};

export default AllTasks;
