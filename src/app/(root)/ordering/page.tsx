import React from 'react'
import { Loader } from "lucide-react";

import { deleteCartItem, getCartItemsByUserId, getItemes, insertOrder } from '@/src/server/db'
import {   Item, OrderProps } from '@/src/types';
import { auth } from '@clerk/nextjs/server';
import { OrderForm } from '@/src/components/OrderForm';
import Cart_Item from '@/src/components/CartItem';

async function handleOrdering(Order:OrderProps) :Promise<string | undefined>{ 
    "use server";
    return await insertOrder(Order);
  }

async function handleRemoveCartItem(id:number | undefined , itemId : number | undefined) :Promise<void>
  { "use server";
 await deleteCartItem(id,itemId);

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
 

  return (
     <section className=' flex w-full flex-col  py-10'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1 mb-3'>Le contenu de votre panier</h1>
      <div className='Cours_grid'>
        {combinedItems.map((Cours,index)=>(
        <Cart_Item handleRemoveCartItem={handleRemoveCartItem} key={index} title={Cours.item?.Titre} imgURL={Cours.item?.imageURL} description={Cours.item?.description} id={Cours.cartItem?.id} ItemId={Cours.item?.id} itemPrix={Cours.item?.Prix} cartItemPrix={Cours.cartItem.Prix}/>
      ))}
      </div>     
     <section className='flex flex-col gap-8'>
     <OrderForm  insertOrder={handleOrdering} CartItems={cartItems}/>
     </section>
     
     </section>)
}

export default Page