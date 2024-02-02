'use client'

import React, { useState } from 'react'

export default function EditPage( {id, title, content }  ) {

    const [postData, setPostData] = useState({
        title : title,
        content : content
    });

    //console.log("PROPS: ----"+  title, content, "DATA: ",postData);

    const handleInputChange = (e) => {
        let value = e.target.value
        setPostData({ ...postData, title: value });
        console.log(postData);
    };

    const handleTextareaChange = (e) => {
        let value = e.target.value
        setPostData({ ...postData, content: value });
        console.log(postData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const key in postData) {
            if (postData.hasOwnProperty(key) && !postData[key]) {
                alert(`Please fill in all fields!`);
                return;
            }
        }
        putDataHandler()
    }

    // Function to handle the PUT request
    const putDataHandler = async () => {
        if (postData) {
            try {
                // Make a POST request using Axios
                const res = await fetch(`/api/blogs/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postData }),
                })
                if (res.ok) {
                    console.log("Yeai!")
                } else {
                    console.log("Oops! Something is wrong.")
                }
                // Handle the response data
                console.log('Response:', res.json());

            } catch (error) {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            }
        } else alert("Never Gonna Give You Up");
    };

    return (
        <div>
            <div className=' '>
                <form onSubmit={handleSubmit}>

                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Title:</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input onChange={handleInputChange} value={postData.title} type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="title" />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <textarea onChange={handleTextareaChange} value={postData.content} id="about" name="about" rows="3" className="block w-full max-w-2xl rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <p className="mb-3 text-sm leading-6 text-gray-600">Write a few sentences about.</p>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className='p-2 rounded  text-white bg-neutral-900 hover:bg-neutral-800'>Update Blog</button>

                    </div>
                </form>
            </div>
        </div>
    )
}