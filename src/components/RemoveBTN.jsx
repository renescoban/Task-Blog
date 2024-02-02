import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBTN( props ) {
    let {id} = props
    return (
        <button className='text-red-600'>
            <HiOutlineTrash size={24} />
        </button>

    )
}
