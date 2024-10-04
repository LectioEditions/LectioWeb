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

// Define a schema for form validation using Zod
const orderSchema = z.object({
  Temps: z.string().min(1, "Temps estimé is required")
})

type OrderFormValues = z.infer<typeof orderSchema>

const OrderDetails = ({ MergedItemCart, order, agent, editOrder }: {
  MergedItemCart: MergedItemCart[],
  order: Orders,
  agent: true | undefined,
  editOrder: (order: Orders) => Promise<Orders | undefined>
}) => {
  const router = useRouter();

  // Initialize form using React Hook Form and Zod for validation
  const formMethods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      Temps: '', // Set the default value of the form field
    }
  });

  // Submit handler
  const onSubmit = async (data: OrderFormValues) => {
    const toastId = toast.loading("Entrain d'ajouter l'Item...");
    try {
      order.Temps = data.Temps;
      order.Traite = true;
      const newOrder = await editOrder(order);
      if (!newOrder) throw new Error("dbProblem");
      toast.success("Item submitted successfully!");
      router.push("/orders");
    } catch (error) {
      toast.error("An error occurred while submitting the Cours.");
      console.error("Submission error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className='w-full'>
      {MergedItemCart.map((item, index) => (
        <figure key={index} className='flex justify-around items-center bg-black-2 dark:bg-inherit py-5 rounded-xl text-white-1 w-full'>
          <Image
            src={item.imageURL ? item.imageURL : ""}
            alt={item.Titre ? item.Titre : "placeholder"}
            width={174}
            height={174}
            className='aspect-square rounded-xl'
          />
          <div className='flex flex-col'>
            <h1 className='text-16 truncate font-bold capitalize text-white-1'>{item.Titre}</h1>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix Unitaire: {item.Prix === 0 ? "n'est pas mentionné" : item.Prix}</h2>
            <h2 className='text-16 font-normal text-black-1 dark:text-white-1'>Quantité: {item.Quantite}</h2>
            <h1 className='text-16 font-normal text-black-1 dark:text-white-1'>Prix: {item.CartPrix}</h1>
            {item.PdfUrl && (<Link href={item.PdfUrl}>Voire le Document</Link>)}
          </div>
        </figure>
      ))}

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className='flex flex-col gap-5 items-center justify-center cursor-pointer rounded-xl'>
          <FormField
            control={formMethods.control}
            name="Temps"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-5 w-full justify-start items-start">
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

          <Button type='submit' className='bg-green-1 text-white-1 font-semibold text-lg w-full py-3'>
            <Image
              src="/icons/delete.svg"
              width={16}
              height={16}
              alt="Valider icon"
            />
            <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Valider</h2>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default OrderDetails;
