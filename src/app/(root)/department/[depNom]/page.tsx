import EmptyState from '@/src/components/EmptyState';
import CoursCard from '@/src/components/CoursCard';
import { getItemByCategory } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react';

const Discover = async ({ searchParams }: { searchParams: { depNom: string } }) => {
  const search = searchParams?.depNom || '';
  const courss = await getItemByCategory(search);

  return (
    <div className="flex flex-col gap-9">
      <div className='flex flex-col gap-9'>
        <h1 className='text-xl font-bold text-black-1 dark:text-white-1 capitalize'>{search}</h1>
        {courss !== undefined ? (
          <div className='Cours_grid'>
            {courss.map(cours => (
              <CoursCard 
                key={cours.id} 
                id={cours.id} 
                imgURL={cours.imageURL} 
                title={cours.Titre} 
                description={cours.description}
              />
            ))}
          </div>
        ) : (
          <Loader size={50} className='mx-auto' />
        )}
      </div>
    </div>
  );
};

export default Discover;
