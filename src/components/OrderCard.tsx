import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const OrderCard = ({imgURL,Prix,CreatedAt,id}:{imgURL:string|undefined,Prix:number|null,CreatedAt:Date|null,id:string|null}) => {

  return (
    <Link className='cursor-pointer h-fit' href={`/orders/${id}`} key={id}>
      <figure className=' flex flex-col gap-2 items-center bg-black-2 dark:bg-inherit py-5 rounded-xl text-white-1'>
      <Image src={!imgURL ? "" : imgURL} alt={ "placeholder"} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col h-fit w-full pl-5'>
      <h1 className='text-16 truncate font-bold capitalize  text-white-1'>{Prix}</h1>
        <h2 className='text-12 truncate font-normal capitalize  text-white-1'>{ CreatedAt ? CreatedAt.toLocaleDateString() : "No date available"}</h2>
      </div>
      </figure>
    </Link>
  )
}

export default OrderCard