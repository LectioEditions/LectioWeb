import React from 'react'
 
import { Loader } from "lucide-react";

import { deleteOrder,getCartItemsByOrderId, getItemById, getOrderByIdentifier, isAgent,   updateOrder } from '@/src/server/db'
import {  Items, MergedItemCart, Orders } from '@/src/types';
 
import { auth } from '@clerk/nextjs/server';
import ClientOrderDetails from '@/src/components/ClientOrderDetailes';
 import OrderDetails from '@/src/components/OrderDetailes';


 const editOrder= async (order :Orders)=>{
  "use server";

  const newOrder = await updateOrder(order);
   if(!newOrder) return;
   return order;
}
const DeleteCommande= async (order :Orders)=>{
  "use server";
 console.log("order",order);
  const newOrder = await deleteOrder(order.id);
   if(!newOrder) return;
   return order.id;
}

const Page = async({ params }: { params: { id: string } }) => {
  const user = auth();
  if (!user.userId) return;
   
  // Fetch agent and order details in parallel
  const [ order, cartItems ] = await Promise.all([
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
        Category: item.Departement,
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
  
 const Agent  = await isAgent();

  return (
    <section className='flex w-full flex-col '>
     {Agent ? <OrderDetails 
        MergedItemCart={mergedItemsCart} 
        order={order} 
        archive={true} 
        editOrder={editOrder}
        handleDelete={DeleteCommande}
      />:<ClientOrderDetails 
        MergedItemCart={mergedItemsCart}
        order={order}
      
       />}
    </section>
  );
};

export default Page;
