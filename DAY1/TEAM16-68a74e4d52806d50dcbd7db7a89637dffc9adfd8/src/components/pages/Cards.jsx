import React from 'react'
import { Pencil } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Trash2 } from 'lucide-react';
const Cards = () => {

    const data = [
        {
            title:'dfuwvfvfe',
            desc:'kdnfjdbfjbrfjhbwrfkjr fkjfj wfrjf rjg',
        },
        {
            title:'dfuwvfvfe',
            desc:'kdnfjdbfjbrfjhbwrfkjr fkjfj wfrjf rjg',
        },
        {
            title:'dfuwvfvfe',
            desc:'kdnfjdbfjbrfjhbwrfkjr fkjfj wfrjf rjg',
        },
        {
            title:'dfuwvfvfe',
            desc:'kdnfjdbfjbrfjhbwrfkjr fkjfj wfrjf rjg',
        },
    ]
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
        {data && data.map((items,i)=>(
            <div className=' flex-col justify-between bg-gray-800 rounded p-4'>
                <div>
                <h3 className='text-xl font-semibold'>{items.title}</h3>
                <p className='text-gray-300 my-2'>{items.desc}</p>
                </div>
                <div className='mt-4 w-full flex items-center'> 
                    <button className='bg-red-500 text-black p-2 rounded w-3/6'>Progress</button>
                    <div className='text-white p-2 w-3/6 text-2xl  font-semibold flex justify-around'>
                        <button><Heart /></button>
                        <button><Pencil /></button>
                        <button><Trash2 /></button>
                       
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Cards