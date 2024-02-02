import React from 'react'
import TopicsList from '@/components/TopicsList'
import Blog from "@/models/blog";
import RemoveBTN from '@/components/RemoveBTN'
import EditBtn from '@/components/EditBtn'

export default async function page() {

  const blogsData = getBlogs()
  const blogs = await Promise.resolve(blogsData)


  return (
    <div className='p-4 mx-auto sm:max-w-2xl  '>


      {Object.keys(blogs[0]).length > 4 ? (
        <>
          <p>{blogs[0].title}</p>
          {blogs.map((blog ,index) => (
            <div className='bg-white p-4 rounded-sm border border-black my-3 flex justify-between items-start gap-5'>
              <TopicsList key={blog._id} title={blog.title} content={blog.content} date={blog.createdAt} />
              <div className='flex gap-2'>
                <RemoveBTN key={blog._id+"rmv"}/>
                <EditBtn key={blog._id+"edt"} id={blog._id} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading blogs...</p>
      )}

    </div>
  )
}


const getBlogs = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-store' })
    if (res.ok) {
      console.log("GET:Yeai!")
    } else {
      console.log("GET:Oops! Something is wrong.")
    }
    // Handle the response data
    const data = await res.json();
    console.log('GET:Response:', data);//typeof obj
    return data
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('GET:Error:', error);
  }

}
