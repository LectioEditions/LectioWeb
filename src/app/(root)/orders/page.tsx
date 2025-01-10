import EmptyState from '@/src/components/EmptyState';
import { getOrders } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'
import OrderCard from '@/src/components/OrderCard';
import { auth } from '@clerk/nextjs/server';

const Page = async () => {
  const orders= await getOrders("En attente");
  const user = await auth();
  if(!orders || !user) return <Loader size={50} className='mx-auto'/>;
  
  return (
    <section className=" w-full min-h-screen py-10">
      <div className='flex flex-col gap-9 '>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Commandes En attente</h1>
      {orders.length > 0 ? <div className='Cours_grid'>
        {orders.map((cours,index) => (
          <OrderCard route={"archive"} idSimple={cours.id}   key={index} id={cours.identifier} Prix={cours.Prix}  CreatedAt={cours.createdAt}/>))}
        </div>:<EmptyState title={'No Results found'}/>}
      </div>
    </section>
  )
}

export default Page
