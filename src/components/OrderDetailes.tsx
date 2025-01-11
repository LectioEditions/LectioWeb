'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Item, MergedItemCart, Order, Orders } from '../types'

 

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

  const handleOrderAction = async (action: 'delete' | 'update', newStatus: string) => {
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
        const updatedOrder = { ...order, Status: newStatus }
        const newOrder = await onEditOrder(updatedOrder)
        if (!newOrder) throw new Error("Problème de base de données")
        toast.success(`Commande marquée comme ${newStatus}!`)
        router.push(newStatus === "prête" ? "/orders" : "/orders-ready")
      }
    } catch (error) {
      toast.error(`Une erreur s'est produite lors de ${isDelete ? 'la suppression' : 'la mise à jour'} de la commande.`)
      console.error(`${isDelete ? 'Deletion' : 'Update'} error:`, error)
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='bg-white dark:bg-black-2 w-3/4 p-5 rounded-xl gap-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Les détails de la Commande</h1>
          <Button variant="destructive" onClick={() => handleOrderAction('delete'," ")}>Supprimer</Button>
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
          <p>Temps estimé: {order.Temps === "0" ? "la commande n'est pas encore traitée" : order.Temps}</p>
          <p>ID de la Commande : {order.id}</p>
          <p>Prix Total: {order.Prix}</p>
          <p>Wilaya: {order.Wilaya}</p>
          <p>Status: {order.Status}</p>
          <p>Téléphone: {order.NumTel}</p>
        </div>

        {!archive && !ready && (
          <Button 
            onClick={() => handleOrderAction('update', 'prête')} 
            className='bg-green-1 text-white font-semibold text-lg w-full py-3 mt-8'
          >
            
            <span className="ml-2 bg-green-1">Valider</span>
          </Button>
        )}

        {ready && (
          <Button 
            onClick={() => handleOrderAction('update', 'Terminé')} 
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
};

 
