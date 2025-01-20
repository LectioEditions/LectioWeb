"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Orders, MergedItemCart } from '../types'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

 

const ClientOrderDetails = ({ MergedItemCart, order  }: {
  MergedItemCart: MergedItemCart[],
  order: Orders,
   }) => {
 

   
  
   

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center '>
        <div className='bg-white-6 dark:bg-black-4 w-3/4 p-5 rounded-xl gap-5'>
       <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
          <h1 className='text-sm lg:text-xl font-bold text-black-1 dark:text-white-1'>Les detailles de la Commande</h1>
        <h1 className={`px-4 py-2 rounded-sm ${order.Temps === "0" ? "bg-red-500 bg-opacity-50 ": ""}`}>{order.Temps === "0" ? "En attente ": ""}</h1>
        </div>
      {MergedItemCart.map((item, index) => (
        <figure key={index} className='flex flex-col lg:flex-row lg:justify-around gap-4 items-center  bg-inherit py-5 rounded-xl text-black-1 dark:text-white-1 w-full'>
          <Image
            src={item.imageURL ? item.imageURL : ""}
            alt={item.Titre ? item.Titre : "placeholder"}
            width={174}
            height={174}
            className='aspect-square rounded-xl'
          />
          <div className='flex flex-col'>
            <h1 className='text-16 truncate font-bold capitalize text-black-1 dark:text-white-1'>{item.Titre}</h1>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Unitaire: {item.Prix === 0 ? "n'est pas mentionné" : item.Prix}</h2>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Quantité: {item.Quantite}</h2>
            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix: {item.CartPrix}</h1>
            {item.PdfUrl && (<Link href={item.PdfUrl}>Voire le Document</Link>)}
          </div>
        </figure>
      ))}

          <div className='flex flex-col'>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Temps estimé: {order.Temps === "0" ? " la commande n'est pas encore traité" : order.Temps}</h2>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>ID du Commande : {order.id}</h2>
            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Total: {order.Prix}</h1>
            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Wilaya: {order.Wilaya}</h1>
            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Status: {order.Status}</h1>

            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Telephone: {order.NumTel}</h1>
          </div>
       
              </div>
    </div>
  );
}

export default ClientOrderDetails;
