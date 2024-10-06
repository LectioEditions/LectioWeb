import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CoursCard = ({imgURL,title,description,id}:{imgURL:string|undefined,title:string|undefined,description:string|undefined,id:number|undefined}) => {

  return (
    <Link className='cursor-pointer' href={`/items/${id}`} key={id}>
      <figure className=' flex flex-col gap-2 items-center bg-white-6 dark:bg-black-4 py-5 rounded-xl text-white-1'>
      <Image src={!imgURL ? "" : imgURL} alt={!title ? "placeholder": title} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col '>
      <h1 className='text-16 truncate font-bold capitalize  text-white-1'>{title}</h1>
        <h2 className='text-12 truncate font-normal capitalize  text-white-1'>{description}</h2>
      </div>
      </figure>
    </Link>
  )
}

export default CoursCard