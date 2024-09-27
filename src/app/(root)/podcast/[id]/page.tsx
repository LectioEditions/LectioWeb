import React from 'react'
import Image from 'next/image'
import { Loader } from "lucide-react";

import { getCoursById, getCourses } from '@/src/server/db'
import CoursdetailPlayer from '@/src/components/CoursdetailPlayer';
import CoursCard from '@/src/components/CoursCard';
import EmptyState from '@/src/components/EmptyState';
import { Cours, User } from '@/src/types';
import { deletecours,getUserByClerkId } from '@/src/server/db';
import { QueryResult } from '@vercel/postgres';
const CoursDetails = async({params}:{
  params:{id : number}
}) => {
  
  const Cours = await getCoursById(params.id);
  const similarCourss = await getCourses();
  if(!Cours) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>
  )
  async function handleDeleteCours(id:number | undefined) :Promise<QueryResult<never>>{ 
    "use server";
    return await deletecours(id);
  }

  async function handleGetUserByClerkId(id:string | null | undefined) :Promise<User | undefined>{ 
    "use server";
    return await getUserByClerkId(id);
  }

  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      <h1 className='text-xl font-bold text-white-1'>
      Currently playing 
      </h1>
      <figure className='flex gap-3 '>
        <Image 
        src="/icons/headphone.svg" 
        width={24}
        height={24}
        alt="headphone"/>
      <h2 className='text-lg font-bold text-white-1'>
        {Cours?.Impression}
      </h2>
      </figure>
      </header>
      <CoursdetailPlayer Cours={Cours} deleteCours={handleDeleteCours} getUserByClerkId={handleGetUserByClerkId}/>
      <p className='text-white-1 text-lg pb-8 pt-11 font-medium max-md:text-center'>{Cours?.description}</p>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-white-1 '> Similar Courss:</h1>
     {similarCourss && similarCourss.length>0 ?(
      <div className='Cours_grid'>{similarCourss.map((Cours,index)=>(
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