import React from 'react'
import CoursCard from '@/src/components/CoursCard'
import { getItemes } from '@/src/server/db';
import "@/src/app/globals.css"
async function  Cours(){
  const Cours = await getItemes();
return Cours;


}


const Home = async () => {
 const CoursData= await Cours();
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Trending Cours</h1>
      <div className='Cours_grid'>{CoursData.map((Cours,index)=>(
        <CoursCard key={index} title={Cours.Titre} imgURL={Cours.imageURL} description={Cours.description} id={Cours.id} />
      ))}
      </div>
      </section>
    </div>
  )
}

export default Home