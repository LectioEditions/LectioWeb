"use client";
import EmptyState from '@/src/components/EmptyState';
import CoursCard from '@/src/components/CoursCard';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import Filter from '@/src/components/Filter';
import { Items } from '../types';

const DepItems = ({ items }: { items: Items[] | undefined }) => {
  const [module, setModule] = useState<string | undefined>(undefined);
  const [nivUniv, setNivUniv] = useState<string | undefined>(undefined);
  const [filteredItems, setFilteredItems] = useState<Items[]>(items || []);

  const handleFilter = () => {
    let filtered = items || []; // Initialize with items or empty array

    if (nivUniv !== undefined) {
      filtered = filtered.filter(item => item.NivUniv === nivUniv);
    }
    if (module !== undefined) {
      filtered = filtered.filter(item => item.Module === module);
    }

    setFilteredItems(filtered); // Update the filteredItems state
  };

  return (
    <div className="flex flex-col gap-9 py-10">
      <Filter setModule={setModule} setNivUniv={setNivUniv} onFilter={handleFilter} />
      <div className='flex flex-col gap-9'>
        {items !== undefined ? (
          filteredItems.length > 0 ? (
            <div className='Cours_grid'>
              {filteredItems.map(item => (
                <CoursCard 
                  key={item.id} 
                  id={item.id} 
                  imgURL={item.imageURL} 
                  title={item.Titre} 
                  description={item.description}
                />
              ))}
            </div>
          ) : (
            <EmptyState title={'No Results found'} />
          )
        ) : (
          <Loader size={50} className='mx-auto' />
        )}
      </div>
    </div>
  );
};

export default DepItems;
