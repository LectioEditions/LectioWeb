"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Cart_Item = ({imgURL,title,description,id ,ItemId,handleRemoveCartItem}:{imgURL:string|undefined,title:string|undefined,description:string|undefined,id:number|undefined,ItemId:number | undefined ,handleRemoveCartItem :(id: number | undefined, itemId: number | undefined)=> Promise<void>}) => {
    const router= useRouter(); 
  return (
    <div >
    <Link className='cursor-pointer' href={`/items/${id}`} key={id}>
      <figure className=' flex flex-col gap-2 items-center bg-black-2 dark:bg-inherit py-5 rounded-xl text-white-1'>
      <Image src={!imgURL ? "" : imgURL} alt={!title ? "placeholder": title} width={174} height={174}  className='aspect-square rounded-xl'/>
      <div className=' flex flex-col '>
      <h1 className='text-16 truncate font-bold capitalize  text-white-1'>{title}</h1>
        <h2 className='text-12 truncate font-normal capitalize  text-white-1'>{description}</h2>
      </div>
      </figure>
    </Link>

    <form action = {async ()=>{ 
         const toastId = toast.loading("Entrain d'ajouter l'Item...");
        try{
        await handleRemoveCartItem(id,ItemId)
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

export default Cart_Item