import React from 'react'
import Image from 'next/image'
import { Loader } from "lucide-react";

import { getItemById, getItemes, insertCartItem } from '@/src/server/db'
import CoursdetailPlayer from '@/src/components/CoursdetailPlayer';
import CoursCard from '@/src/components/CoursCard';
import EmptyState from '@/src/components/EmptyState';
import { CartItem, CartItems, Item, Items, User } from '@/src/types';
import { deleteItem,getUserByClerkId } from '@/src/server/db';
import { QueryResult } from '@vercel/postgres';
import { auth, clerkClient } from '@clerk/nextjs/server';
const CoursDetails = async({params}:{
  params:{id : number}
}) => {
  const user = auth();
  if(!user.userId) return;
  const agent = await clerkClient.users.getUser(user.userId);
  const isAgent  = agent.publicMetadata.agent === true;
  const Item = await getItemById(params.id);
  const similarItem = await getItemes();
  if(!Item) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>
  )
  async function handleAddTCart(item :Items) :Promise<CartItem | undefined>
  {
    "use server";
    console.log(item);
    const cartItem :CartItem ={
      idItem: item.id,
      userId: item.userId,
      Prix: item.Prix,
      Type: item.Type,
      PdfUrl: item.PdfUrl,
      Quantite : 0,
    }
    return await insertCartItem(cartItem);
  }
  async function handleDeleteItem(id:number | undefined) :Promise<QueryResult<never>>{ 
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
      
      <figure className='flex gap-3 '>
        <Image 
        src="/icons/headphone.svg" 
        width={24}
        height={24}
        alt="headphone"/>
      <h2 className='text-lg font-bold text-black-1 dark:text-white-1'>
        {Item?.Achat} Achat
      </h2>
      </figure>
      </header>
      <CoursdetailPlayer Item={Item} deleteItem={handleDeleteItem} getUserByClerkId={handleGetUserByClerkId} agent={isAgent} addCartItem={handleAddTCart}/>
      <p className='text-black-1 dark:text-white-1 text-lg pb-8 pt-11 font-medium max-md:text-center'>{Item?.description}</p>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1 '> Similar Courss:</h1>
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