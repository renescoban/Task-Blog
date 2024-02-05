import React from 'react'
import TopicsList from '../../components/TopicsList'

export default async function page() {

  const blogsData = getBlogs()
  const blogs = await Promise.resolve(blogsData)


  return (
    <div className='p-4 mx-auto sm:max-w-2xl  '>

      {true ? (
        <>

          {blogs.map((blog, index) => (

            <TopicsList key={blog._id} id={blog._id} title={blog.title} content={blog.content} date={blog.createdAt} />

          ))}

        </>
      ) : ("asd")}

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
    //console.log('GET:Response:', data);//typeof obj
    return data
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('GET:Error:', error);
  }

}
