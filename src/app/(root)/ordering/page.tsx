import React from 'react'
import { Loader } from "lucide-react";

import { deleteCartItem, getCartItemsByUserId, getItemes, insertOrder } from '@/src/server/db'
import { getUserByClerkId } from '@/src/server/db';
import {  CartItems, Item, OrderProps, User } from '@/src/types';
import { auth } from '@clerk/nextjs/server';
import { OrderForm } from '@/src/components/OrderForm';
import CoursCard from '@/src/components/CoursCard';

async function handleOrdering(Order:OrderProps) :Promise<number | undefined>{ 
    "use server";
    return await insertOrder(Order);
  }

const Page = async({}) => {
    const user = auth();
    if(!user.userId) return;
    const cartItems = await getCartItemsByUserId(user.userId);

    // Fetch items concurrently
    const items = await getItemes(); // Make sure to await this
    
    // Create a mapping of item IDs to items for quick lookup
    const itemMap = new Map<number, Item>(); // Adjust the type based on your Item structure
    items.forEach(item => {
      itemMap.set(item.id, item); // Assuming 'id' is the identifier for items
    });
    
    // Create an array of objects combining cart items and their corresponding items
    const combinedItems = await Promise.all(cartItems.map(async (cartItem) => {
        if (!cartItem.idItem) throw new Error("no id Item")
      const item = itemMap.get(cartItem.idItem); // Assuming 'idItem' links to the item's ID
      return {
        cartItem,
        item
      };
    }));
  
  if(!cartItems) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>
  )
  async function handleDeleteCartItem(id:number | undefined) :Promise<CartItems | undefined>{ 
    "use server";
    return await deleteCartItem(id);
  }

  async function handleGetUserByClerkId(id:string | null | undefined) :Promise<User| undefined>{ 
    "use server";
    return await getUserByClerkId(id);
  }
  return (
     <section className=' flex w-full flex-col '>
      <div className='Cours_grid'>{combinedItems.map((Cours,index)=>(
        <CoursCard key={index} title={Cours.item?.Titre} imgURL={Cours.item?.imageURL} description={Cours.item?.description} id={Cours.item?.id} />
      ))}
      </div>     
     <section className='flex flex-col gap-8'>
     <OrderForm  insertOrder={handleOrdering} CartItems={cartItems}/>
     </section>
     
     </section>)
}

export default Page