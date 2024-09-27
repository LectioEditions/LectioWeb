"use client";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Cours, CoursDetailPlayerProps, Courss, User } from "@/src/types";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
//import { useToast } from "./ui/use-toast";
import { QueryResult } from "@vercel/postgres";

const CoursDetailPlayer = ({
Cours , 
deleteCours,
getUserByClerkId
}: {Cours:Courss , deleteCours:(id?: number | undefined) => Promise<QueryResult<never>>,
   getUserByClerkId:(clerkId: string | null | undefined) => Promise<User | undefined> }) => {
  const router = useRouter();
  //const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [owner, setOwner] = useState<User |null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const Pathname = usePathname();
  const showBtn= Pathname.includes("impression");
  console.log(Cours);
  useEffect(() => {
  
    const fetchOwner = async () => {
      if (!Cours.userId) return;
      const ownerData = await getUserByClerkId(Cours.userId);
      if(ownerData) setOwner(ownerData);
      if(owner?.clerkId === Cours.userId) setIsOwner(true);
    };
  
    fetchOwner();
  }, [Cours.userId]);

  
  const handleDelete = async () => {
    try {
     if(!Cours.id) throw new Error("Cours id is missing")
      await deleteCours(Cours.id);
     // toast({   title: "Cours deleted", });
      router.push("/");
    } catch (error) {
      console.error("Error deleting Cours", error);
    //  toast({
      //  title: "Error deleting Cours",
      //  variant: "destructive",
     // });
    }
  };

 

  if (!Cours || ! owner ) return <Loader />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={Cours.imageURL}
          width={250}
          height={250}
          alt="Cours image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1 dark:text-white-1">
              {Cours.Titre}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${Cours.userId}`);
              }}
            >
              <Image
                src={owner?.image}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{owner.name}</h2>
            </figure>
          </article>

        { !showBtn &&  <Button
            onClick={() => {
              router.push(`/impression/${Cours.id}`);
            }}
            className="text-16 w-full max-w-[250px] bg-green-1 font-extrabold text-black-1 dark:text-white-1"
          >
            
            Imprimer
          </Button>}
        </div>
      </div>
      {isOwner && (
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
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-white-6 derk:bg-black-6 py-1.5 hover:bg-black-2"
            >
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-black-1 dark:text-white-1">Delete</h2>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursDetailPlayer;