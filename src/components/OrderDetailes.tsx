'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Item, MergedItemCart, Order, Orders } from '../types'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const orderSchema = z.object({
  Temps: z.string().min(1, "Temps estimé is required")
})

type OrderFormValues = z.infer<typeof orderSchema>

interface OrderDetailsProps {
  MergedItemCart: MergedItemCart[]
  order: Orders
  archive: boolean
  ready: boolean
  onEditOrder: (order: Orders) => Promise<number | undefined>
  onDeleteOrder: (order: Orders) => Promise<number | undefined>
}

export default function OrderDetails({ 
  MergedItemCart, 
  order, 
  onEditOrder, 
  onDeleteOrder, 
  ready,
  archive
}: OrderDetailsProps) {
  const router = useRouter()
  const formMethods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      Temps: '', // Set the default value of the form field
    }
  });

  const handleOrderAction = async (action: 'delete' | 'update', newStatus: string, estimatedTime?: string) => {
    const isDelete = action === 'delete'
    const toastId = toast.loading(isDelete ? "Suppression de la commande..." : "Mise à jour de la commande...")
    
    try {
      if (isDelete) {
        const deleted = await onDeleteOrder(order)
        if (deleted) {
          toast.success("Commande supprimée avec succès!")
          router.push(archive ? "/archive" : "/orders")
        }
      } else {
        const updatedOrder = { ...order, Status: newStatus, Temps: estimatedTime || order.Temps }
        const newOrder = await onEditOrder(updatedOrder)
        if (!newOrder) throw new Error("Problème de base de données")
        toast.success(`Commande mise à jour avec succès!`)
        router.push(newStatus === "prête" ? "/orders" : "/orders-ready")
      }
    } catch (error) {
      toast.error(`Une erreur s'est produite lors de ${isDelete ? 'la suppression' : 'la mise à jour'} de la commande.`)
      console.error(`${isDelete ? 'Deletion' : 'Update'} error:`, error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  const onSubmit = async (data: OrderFormValues) => {
    const toastId = toast.loading("Entrain d'ajouter l'Item...");
    try {
      order.Temps = data.Temps;
      order.Status = "En cours de traitement";
      const newOrder = await onEditOrder(order);
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
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='bg-white dark:bg-black-2 w-3/4 p-5 rounded-xl gap-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Les détails de la Commande</h1>
          <Button variant="destructive" className='bg-red-600 rounded-sm' onClick={() => handleOrderAction('delete'," ")}>Supprimer</Button>
        </div>
        
        {MergedItemCart.map((item, index) => (
          <figure key={index} className='flex justify-around items-center py-5 rounded-xl w-full'>
            <Image
              src={item.imageURL || "/placeholder.svg"}
              alt={item.Titre || "placeholder"}
              width={174}
              height={174}
              className='aspect-square rounded-xl'
            />
            <div className='flex flex-col'>
              <h2 className='text-lg font-bold capitalize'>{item.Titre}</h2>
              <p>Prix Unitaire: {item.Prix === 0 ? "n'est pas mentionné" : item.Prix}</p>
              <p>Quantité: {item.Quantite}</p>
              <p>Prix: {item.CartPrix}</p>
              {item.PdfUrl && (<Link href={item.PdfUrl} className="text-green-1 hover:underline font-semibold">Voir le Document</Link>)}
            </div>
          </figure>
        ))}

        <div className='flex flex-col mt-4'>
          <p>ID de la Commande : {order.id}</p>
          <p>Prix Total: {order.Prix}</p>
          <p>Wilaya: {order.Wilaya}</p>
          <p>Status: {order.Status}</p>
          <p>Téléphone: {order.NumTel}</p>
        </div>

        {!archive&& !ready && <FormProvider {...formMethods}>
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
              src="/icons/delete.svg"
              width={16}
              height={16}
              alt="Valider icon"
              />
            <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Valider</h2>
          </Button>
        </form>
      </FormProvider>}
        {ready && (
          <Button 
            onClick={() => handleOrderAction('update', 'prête')} 
            className='bg-green-1 text-white font-semibold text-lg w-full py-3 mt-8'
          >
            <Image
              src="/icons/check.svg"
              width={16}
              height={16}
              alt="Finaliser icon"
            />
            <span className="ml-2">Finaliser la commande</span>
          </Button>
        )}
      </div>
    </div>
  )
}

