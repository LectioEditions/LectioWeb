import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const OrderCard = ({Prix,CreatedAt,id,idSimple ,route}:{route:string ,idSimple:number,Prix:number|null,CreatedAt:Date|null,id:string|null}) => {

  return (
    <Link className='cursor-pointer h-fit bg-white-6 dark:bg-black-2  rounded-xl' href={`/${route}/${id}`} key={id}>
      <figure className=' flex flex-col gap-2 items-center  py-5 text-white-1'>
      <Image src={"https://utfs.io/f/UbLnnOeeK6tTtPFLo8GnA4r8wG7yixhQOHLTZ1bslN3depuW"} alt={ "placeholder"} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col h-fit w-full pl-5'>
      <h1 className='text-16 truncate font-bold capitalize  text-black-1 dark:text-white-1'>ID :{idSimple}</h1>

      <h1 className='text-16 truncate font-bold capitalize  text-black-1 dark:text-white-1'>Prix :{Prix}DA</h1>
        <h2 className='text-12 truncate font-normal capitalize   text-black-1 dark:text-white-1'>{ CreatedAt ? CreatedAt.toLocaleDateString() : "No date available"}</h2>
      </div>
      </figure>
    </Link>
  )
}

export default OrderCard