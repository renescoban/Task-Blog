'use client'

import React from 'react'
import RemoveBTN from './RemoveBTN'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import { HiOutlineTrash } from 'react-icons/hi'
import '@radix-ui/themes/styles.css';
import { AlertDialog, Button, Flex, Theme } from '@radix-ui/themes';







export default function TopicsList(props) {
  const id = props.id

  const handleDelete = () => {
    console.log("deleting...", id);

    deleteHandler()
  };
  const deleteHandler = async () => {
    if (id) {
      try {
        // Make a POST request using Axios
        const res = await fetch('/api/blogs', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        if (res.ok) {
          console.log("Yeai!")
          router.push("/blog");
        } else {
          console.log("Oops! Something is wrong.")
        }
        // Handle the response data
        console.log('Response:', res.json());
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      }
    } else alert("DELETE: Id not Dound");
  };

  function DeletButton() {

    return (
      <Theme>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <button  className='text-red-600'>
              <HiOutlineTrash size={24} />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Delete Blog</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure? This blog will no longer be accessible.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red" onClick={handleDelete} >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Theme>

    )
  }


  return (
    <div className='bg-white p-4 rounded-sm border border-black my-3 flex justify-between items-start gap-5'>
      <div className='w-full '>
        <h2 className='font-bold text-2xl'> {props.title} </h2>
        <p className='py-3'>{props.content}</p>
        <p className='text-right text-sm'> {props.date}</p>
      </div>
      <div className='flex gap-2'>

        <DeletButton />

        <Link href={`blog/${props.id}`} >
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div >
  )
}


