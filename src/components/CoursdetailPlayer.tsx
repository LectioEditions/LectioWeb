"use client";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CartItem, Item, Items, User } from "@/src/types";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
//import { useToast } from "./ui/use-toast";
import { QueryResult } from "@vercel/postgres";
import { toast } from "sonner";
import QuantityForm from "./QuantityForm";
import Link from "next/link";

interface ItemDetailPlayerProps {
  Item: Items;
  deleteItem: (id?: number) => Promise<number>;
  addCartItem: (item :Items , Quantite : number )=> Promise<CartItem | undefined>;
  getUserByClerkId: (clerkId: string | null | undefined) => Promise<User | undefined>;
  agent: boolean | undefined;
}

const ItemDetailPlayer: React.FC<ItemDetailPlayerProps> = ({
  Item,
  deleteItem,
  agent,
  addCartItem,
  getUserByClerkId,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [owner, setOwner] = useState<User |null>(null);
  const Pathname = usePathname();
  const showBtn= Pathname.includes("impression");
  useEffect(() => {
  
    const fetchOwner = async () => {
      if (!Item.userId) return;
      const ownerData = await getUserByClerkId(Item.userId);
      if(ownerData) setOwner(ownerData);
     
    };
  
    fetchOwner();
  }, [Item.userId]);

  
  const handleDelete = async () => {
    const toastId=toast.loading("Deleting Item");
    try {
     if(!Item.id) throw new Error("Item id is missing")
      const deleted = await deleteItem(Item.id);
     if(!deleted) throw new Error("Item not deleted")
      toast.success("Item deleted");
      router.push("/");
    } catch (error) {
      console.error("Error deleting Item", error);
 
    }finally{
      toast.dismiss(toastId);
    }
  };

 

  if (!Item || ! owner ) return(
  <div className="w-full flex justify-center items-center h-64">
    <Loader />
  </div>)

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={Item.imageURL}
          width={250}
          height={250}
          alt="Item image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1 dark:text-white-1">
              {Item.Titre}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${Item.userId}`);
              }}
            >
              <Image
                src={owner?.image}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-black-1 dark:text-white-3 ">{owner.name}</h2>
            </figure>
           <div className="flex justify-between items-center w-full">
            <h1 className="text-16 font-normal text-black-1 dark:text-white-1">Prix unitair: {Item.Prix}</h1>
            <Link href={Item.PdfUrl} className="px-4 py-2 bg-green-1 text-white-1 rounded-sm font-semibold">Voir le PDF</Link></div>
          </article>

        { !showBtn &&  <QuantityForm addToCart={addCartItem} Item={Item} />}
        </div>
      </div>
      {agent && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <form action = {async ()=>{await handleDelete()}} 
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md "
            >
              <Button className="text-16 font-normal bg-red-700 w-full text-white-1">
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
                Delete</Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDetailPlayer;


