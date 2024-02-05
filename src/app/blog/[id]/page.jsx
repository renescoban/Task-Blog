
import React from 'react'
import EditPage from "../../../components/EditPage"

export default async function Page({ params }) {
  const id = params.id;
  
  const blogData = await getBlogById(id)
  const { blog } = await Promise.resolve(blogData)
  const { _id ,title, content } = blog;
  //console.log(title, content);

  

  return (
    <>
    <div>edit: {id}</div>
    <EditPage id={_id} title={title} content={content} />
  </>
  )
}

const getBlogById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

