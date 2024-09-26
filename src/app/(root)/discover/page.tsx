import EmptyState from '@/src/components/EmptyState';
import CoursCard from '@/src/components/CoursCard';
import SearchBar from '@/src/components/SearchBar';
import { getCoursBySearch, getCourses } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'

const Discover = async ({searchParams: {search}}:{searchParams:{search : string}}) => {
  const courss= await getCoursBySearch(search ? search : '');
  const discover = await getCourses();
  return (
    <div className=" flex flex-col gap-9">
      <SearchBar/>
      <div className='flex flex-col gap-9'>
      <h1 className='text-xl font-bold text-white-1'>Discover</h1>
       {courss ? <>
       {courss.length > 0 ? <div className='cours_grid'>
        {courss.map(cours => (
          <CoursCard id={cours.id} imgURL={cours.imageURL} title={cours.Titre}  description={cours.description}/>))}
        </div>:<EmptyState title={'No Results found'}/>}
       </> : <>{ discover && !courss ? <div className='cours_grid'>
        {discover.map(cours => (
          <CoursCard id={cours.id} imgURL={cours.imageURL} title={cours.Titre}  description={cours.description}/>))}
       </div> : <Loader size={50} className='mx-auto'/>}
      </>

}
      </div>
    </div>
  )
}

export default Discover