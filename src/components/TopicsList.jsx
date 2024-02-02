import React from 'react'
import RemoveBTN from './RemoveBTN'
import EditBtn from './EditBtn'



export default function TopicsList( props ) {  
  return (
        <div className='w-full '>
            <h2 className='font-bold text-2xl'> { props.title } </h2>
            <p className='py-3'>{ props.content }</p>
            <p className='text-right text-sm'> { props.date }</p>
        </div>
  )
}
