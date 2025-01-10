"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from './ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Orders, MergedItemCart } from '../types'

// Define a schema for form validation using Zod
const orderSchema = z.object({
  Temps: z.string().min(1, "Temps estimé is required")
})

type OrderFormValues = z.infer<typeof orderSchema>

const OrderDetails = ({ 
  MergedItemCart, 
  order, 
  editOrder, 
  handleDelete, 
  ready, 
  archive
}: {
  MergedItemCart: MergedItemCart[],
  order: Orders,
  archive: boolean,
  ready: boolean,
  editOrder: (order: Orders) => Promise<Orders | undefined>,
  handleDelete: (order: Orders) => Promise<number | undefined>
}) => {
  const router = useRouter();

  // Initialize form using React Hook Form and Zod for validation
  const formMethods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      Temps: order.Temps || '', // Set the default value of the form field
    }
  });

  const deleteOrder = async (order: Orders) => {
    const toastId = toast.loading("Entrain de supprimer la commande...");
    try {    
      const deleted = await handleDelete(order);
      if (deleted) {
        toast.success("Commande supprimée avec succès!");
        router.push(archive ? "/archive" : "/orders");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de la commande.");
      console.error("Deletion error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // Submit handler for updating order with estimated time
  const onSubmit = async (data: OrderFormValues) => {
    const toastId = toast.loading("Mise à jour de la commande...");
    try {
      const updatedOrder = { ...order, Temps: data.Temps, Status: "prête" };
      const newOrder = await editOrder(updatedOrder);
      if (!newOrder) throw new Error("Problème de base de données");
      toast.success("Commande mise à jour avec succès!");
      router.push("/orders");
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la mise à jour de la commande.");
      console.error("Update error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // Finish handler for marking order as ready
  const onFinish = async () => {
    const toastId = toast.loading("Finalisation de la commande...");
    try {

      const updatedOrder = { ...order, Status: "Terminé" };
      const newOrder = await editOrder(updatedOrder);
      if (!newOrder) throw new Error("Problème de base de données");
      toast.success("Commande marquée comme prête!");
      router.push("/orders-ready");
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la finalisation de la commande.");
      console.error("Finalization error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='bg-white-6 dark:bg-black-4 w-3/4 p-5 rounded-xl gap-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Les détails de la Commande</h1>
          <Button className='bg-red-500 text-white-1' onClick={() => deleteOrder(order)}>Supprimer</Button>
        </div>
        
        {MergedItemCart.map((item, index) => (
          <figure key={index} className='flex justify-around items-center bg-inherit py-5 rounded-xl text-black-1 dark:text-white-1 w-full'>
            <Image
              src={item.imageURL || "/placeholder.svg"}
              alt={item.Titre || "placeholder"}
              width={174}
              height={174}
              className='aspect-square rounded-xl'
            />
            <div className='flex flex-col'>
              <h1 className='text-16 truncate font-bold capitalize text-black-1 dark:text-white-1'>{item.Titre}</h1>
              <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Unitaire: {item.Prix === 0 ? "n'est pas mentionné" : item.Prix}</h2>
              <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Quantité: {item.Quantite}</h2>
              <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix: {item.CartPrix}</h1>
              {item.PdfUrl && (<Link href={item.PdfUrl}>Voir le Document</Link>)}
            </div>
          </figure>
        ))}

        <div className='flex flex-col'>
          <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Temps estimé: {order.Temps === "0" ? "la commande n'est pas encore traitée" : order.Temps}</h2>
          <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>ID de la Commande : {order.id}</h2>
          <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Total: {order.Prix}</h1>
          <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Wilaya: {order.Wilaya}</h1>
          <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Status: {order.Status}</h1>
          <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Téléphone: {order.NumTel}</h1>
        </div>

        {!archive && !ready && (
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className='flex flex-col gap-2 items-center justify-center cursor-pointer rounded-xl mt-8'>
              <FormField
                control={formMethods.control}
                name="Temps"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 w-full justify-start items-start">
                    <FormLabel className="text-base font-bold whitespace-nowrap text-black-1 dark:text-white-1">Temps estimé</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => formMethods.trigger("Temps")}
                        className="input-class focus-visible:ring-offset-green-1"
                        placeholder="XX min"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">{formMethods.formState.errors.Temps?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button type='submit' className='bg-green-1 text-black-1 dark:text-white-1 font-semibold text-lg w-full py-3'>
                <Image
                  src="/icons/check.svg"
                  width={16}
                  height={16}
                  alt="Valider icon"
                />
                <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Valider</h2>
              </Button>
            </form>
          </FormProvider>
        )}

        {ready && (
          <form onSubmit={(e) => { e.preventDefault(); onFinish(); }} className='flex flex-col gap-2 items-center justify-center cursor-pointer rounded-xl mt-8'>
            <Button type='submit' className='bg-green-1 text-black-1 dark:text-white-1 font-semibold text-lg w-full py-3'>
              <Image
                src="/icons/check.svg"
                width={16}
                height={16}
                alt="Finaliser icon"
              />
              <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Finaliser la commande</h2>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;

