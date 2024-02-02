import React from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

export default function Layout({ children }) {
    return (
        
        <>
        <div className='w-full p-4 mx-auto sm:max-w-2xl  '>
          <nav className='flex justify-between items-center bg-slate-800  px-8 py-3'>
              <Link className='text-white' href='/blog'>My Blogs.</Link>
              <Link className='bg-slate-50 p-2 rounded-sm' href='/blog/add'>Add Topic</Link>
          </nav>
          
          <div className='mt-8'>{children}</div>
  
          {/* <TopicsList />
          <TopicsList />
          <TopicsList />
          <TopicsList /> */}
  
  
      </div>
      </>
        
    )
}
