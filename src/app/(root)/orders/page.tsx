import EmptyState from '@/src/components/EmptyState';
import { getOrders } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'
import OrderCard from '@/src/components/OrderCard';

const Page = async ({searchParams: {search}}:{searchParams:{search : string}}) => {
  const orders= await getOrders();
  return (
    <div className=" flex flex-col gap-9">
      <div className='flex flex-col gap-9'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Commandes</h1>
       {orders ? <div className='Cours_grid'>
        {orders.map((cours,index) => (
          <OrderCard key={index} id={cours.identifier} imgURL={cours.imageURL} Prix={cours.Prix}  CreatedAt={cours.createdAt}/>))}
        </div>:<EmptyState title={'No Results found'}/>}
       
      </div>
    </div>
  )
}

export default Page