import EmptyState from '@/src/components/EmptyState';
import CoursCard from '@/src/components/CoursCard';
import SearchBar from '@/src/components/SearchBar';
import { getItemByCategory } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'

const Discover = async ({DepNom}:{DepNom : string}) => {
  const courss= await getItemByCategory(DepNom ? DepNom : '');
  return (
    <div className=" flex flex-col gap-9">
      <div className='flex flex-col gap-9'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1 capitalize'>{DepNom}</h1>
       {courss ? <>
       <div className='Cours_grid'>
        {courss.map(cours => (
          <CoursCard id={cours.id} imgURL={cours.imageURL} title={cours.Titre}  description={cours.description}/>))}
        </div>
       </> : <Loader size={50} className='mx-auto'/>}
      


      </div>
    </div>
  )
}

export default Discover