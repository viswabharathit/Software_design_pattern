import React from 'react';
import { Pencil, Heart, Trash2, CirclePlus } from 'lucide-react';

const Cards = ({ onAddClick }) => {
  const data = [
    {
      title: 'Task 1',
      desc: 'Description 1',
      status: "Incomplete"
    },
    {
      title: 'Task 2',
      desc: 'Description 2',
      status: "Completed"
    },
    {
      title: 'Task 3',
      desc: 'Description 3',
      status: "Completed"
    },
    {
      title: 'Task 4',
      desc: 'Description 4',
      status: "Incomplete"
    },
  ];

  return (
    <div className='grid grid-cols-3 gap-6 p-6'>
      {data && data.map((items, i) => (
        <div key={i} className='flex-col justify-between bg-black  border-2 border-gray-400 rounded-lg p-3'>
          <div>
            <h3 className='text-xl font-semibold text-white'>{items.title}</h3>
            <p className='text-gray-300 my-2'>{items.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button className={`${items.status === "Incomplete" ? "bg-red-500" : "bg-green-800"} text-black p-1 rounded w-2/6`}>
              {items.status}
            </button>
            <div className='text-white px-4 w-4/6 text-2xl font-semibold flex justify-end gap-2 transition-all duration-300'>
              <button><Heart /></button>
              <button><Pencil /></button>
              <button><Trash2 /></button>
            </div>
          </div>
        </div>
      ))}
      <div onClick={onAddClick} className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer'>
        <CirclePlus className='text-xl'/>
        <h1 className='text-2xl mt-4'>Add Task</h1>
      </div>
    </div>
  );
};

export default Cards;
