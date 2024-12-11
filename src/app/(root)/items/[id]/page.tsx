import React from 'react'
import Image from 'next/image'
import { Loader } from "lucide-react";

import { getItemById, getItemes, insertCartItem, isAgent } from '@/src/server/db'
import CoursdetailPlayer from '@/src/components/CoursdetailPlayer';
import CoursCard from '@/src/components/CoursCard';
import EmptyState from '@/src/components/EmptyState';
import { CartItem, CartItems, Item, Items, User } from '@/src/types';
import { deleteItem,getUserByClerkId } from '@/src/server/db';
import { auth, clerkClient } from '@clerk/nextjs/server';
const CoursDetails = async({params}:{
  params:{id : number}
}) => {
  const user = auth();
  if(!user.userId) return;
  const {id} = await params;
  const Agent  = await isAgent();
  const Item = await getItemById(id);
  const similarItem = await getItemes();
  if(!Item) return(<div className='min-w-full min-h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>
  )
  async function handleAddTCart(item :Items , Quantite : number ) :Promise<CartItem | undefined>
  {
    "use server";
    const cartItem :CartItem ={
      idItem: item.id,
      userId: item.userId,
      Prix: item.Prix ? item.Prix * Quantite : 0,
      Type: item.Type,
      PdfUrl: item.PdfUrl,
      Quantite : Quantite,
    }
    return await insertCartItem(cartItem);
  }
  async function handleDeleteItem(id:number | undefined) :Promise<number>{ 
    "use server";
    return await deleteItem(id);
  }

  async function handleGetUserByClerkId(id:string | null | undefined) :Promise<User | undefined>{ 
    "use server";
    return await getUserByClerkId(id);
  }

  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      
    
      </header>
      <CoursdetailPlayer Item={Item} deleteItem={handleDeleteItem} getUserByClerkId={handleGetUserByClerkId} agent={Agent} addCartItem={handleAddTCart}/>
      <p className='text-black-1 dark:text-white-1 text-lg pb-8 pt-11 font-medium max-md:text-center'>{Item?.description}</p>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1 '> Similar Items:</h1>
     {similarItem && similarItem.length>0 ?(
      <div className='Cours_grid'>{similarItem.map((Cours,index)=>(
        <CoursCard key={index} title={Cours.Titre} imgURL={Cours.imageURL} description={Cours.description} id={Cours.id} />
      ))}
      </div>
     ):(
      <>
      <EmptyState
      title={"No similar podasts found"}
      buttonLink={"/discover"}
      buttonText={"Discover more Courss"}/>
      </>
     )}
     </section>
     
     </section>)
}

export default CoursDetails
