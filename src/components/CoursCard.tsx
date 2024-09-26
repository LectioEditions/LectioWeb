import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CoursCard = ({imgURL,title,description,id}:{imgURL:string,title:string,description:string,id:number}) => {

  return (
    <Link className='cursor-pointer' href={`/podcast/${id}`} key={id}>
      <figure className=' flex flex-col gap-2'>
      <Image src={imgURL} alt={title} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col '>
      <h1 className='text-16 truncate font-bold capitalize text-white-1'>{title}</h1>
        <h2 className='text-12 truncate font-normal capitalize text-white-4'>{description}</h2>
      </div>
      </figure>
    </Link>
  )
}

export default CoursCard