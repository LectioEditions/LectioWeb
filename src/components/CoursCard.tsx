import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CoursCard = ({imgURL,title,description,id}:{imgURL:string|undefined,title:string|undefined,description:string|undefined,id:number|undefined}) => {

  return (
    <Link className='cursor-pointer' href={`/item/${id}`} key={id}>
      <figure className=' flex flex-col gap-2 items-center'>
      <Image src={!imgURL ? "" : imgURL} alt={!title ? "placeholder": title} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col '>
      <h1 className='text-16 truncate font-bold capitalize text-black-1 dark:text-white-1'>{title}</h1>
        <h2 className='text-12 truncate font-normal capitalize text-black-1 dark:text-white-1'>{description}</h2>
      </div>
      </figure>
    </Link>
  )
}

export default CoursCard