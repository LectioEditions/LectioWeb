import React from 'react'
import Image from 'next/image'
import { Loader } from "lucide-react";

import { getCartItemsByOrderId, getItemById, getOrderByIdentifier, insertCartItem } from '@/src/server/db'
import { CartItem, CartItems, Item, Items, MergedItemCart, User } from '@/src/types';
import { deleteItem, getUserByClerkId,isAgent } from '@/src/server/db';
import { QueryResult } from '@vercel/postgres';
import { auth, clerkClient } from '@clerk/nextjs/server';
import OrderDetails from '@/src/components/OrderDetailes';

const Page = async({ params }: { params: { id: string } }) => {
  const user = auth();
  if (!user.userId) return;

  // Fetch agent and order details in parallel
  const [agent, order, cartItems ] = await Promise.all([
    isAgent(),
    getOrderByIdentifier(params.id),
    getCartItemsByOrderId(params.id)
  ]);


  // If order does not exist, return a loading screen
  if (!order) {
    return (
      <div className='min-w-full min-h-screen flex justify-center items-center'>
        <Loader size={30} className="animate-spin text-green-1" />
      </div>
    );
  }
  const items: Items[] = await Promise.all(
    cartItems.map(async (cartItem) => {
      const item = await getItemById(cartItem.idItem);
      return item ? item : null; // Return null if item not found
    })
  ).then(results => results.filter((item): item is Items => item !== null)); // Type guard to filter out nulls
  
  const mergedItemsCart: MergedItemCart[] = cartItems.map(cartItem => {
    const item = items.find(i => i.id === cartItem.idItem);
  
    if (item) {
      return {
        id: item.id,
        Titre: item.Titre,
        Category: item.Category,
        Annee: item.Annee,
        Module: item.Module,
        Type: item.Type,
        PdfUrl: item.PdfUrl,
        imageURL: item.imageURL,
        Prix: item.Prix,
        Quantite: cartItem.Quantite,
        CartPrix: cartItem.Prix, // Assuming this comes from cartItem
      };
    }
  
    return null; // Explicitly return null if item not found
  }).filter((mergedItem): mergedItem is MergedItemCart => mergedItem !== null); // Filter out null values
  

  console.log(mergedItemsCart);

  return (
    <section className='flex w-full flex-col'>
      <OrderDetails 
        MergedItemCart={mergedItemsCart} 
        order={order} 
        agent={agent} 
      />
    </section>
  );
};

export default Page;
