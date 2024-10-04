"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {  Orders,MergedItemCart, User } from '../types'

const OrderDetails = ({MergedItemCart,order  ,agent }:{
  MergedItemCart :MergedItemCart[],
  order :Orders,
  agent : true | undefined,
  
}) => {
    const router= useRouter(); 
  return (
    <div className='w-full' >
{MergedItemCart.map((item, index) => {
  return (
    <figure key={index} className='flex justify-around items-center bg-black-2 dark:bg-inherit py-5 rounded-xl text-white-1 w-full'>
      <Image 
        src={item.imageURL ? item.imageURL : ""} 
        alt={item.Titre ? item.Titre : "placeholder"} 
        width={174} 
        height={174}  
        className='aspect-square rounded-xl'
      />
      <div className='flex flex-col '>
        <h1 className='text-16 truncate font-bold capitalize text-white-1'>{item.Titre}</h1>
        <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Unitaire: {item.Prix}</h2>
        <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>
          Quantité: {item.CartPrix && item.Prix ? item.CartPrix / item.Prix : ""}
        </h2>
        <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix : {item.CartPrix}</h1>
        {item.PdfUrl && (<Link href ={item.PdfUrl}/>)}
      </div>
    </figure>
  );
})}

    <form action = {async ()=>{ 
         const toastId = toast.loading("Entrain d'ajouter l'Item...");
        try{
        toast.success("Item submitted successfully!");
        router.refresh();
    } catch (error) {
        // Error feedback
        toast.error("An error occurred while submitting the Cours.");
        console.error("Submission error:", error); // Log the error for debugging
      } finally {
        // Reset loading state
        toast.dismiss(toastId); // Dismiss the loading toast

      }
    }} 
    className='flex gap-2 items-center justify-center cursor-pointer  rounded-xl'>
            <Button type='submit' className='bg-red-800 text-white-1 font-semibold text-lg w-full py-3'>
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Delete</h2>
           </Button>
            </form>
    </div>
  )
}

export default OrderDetails