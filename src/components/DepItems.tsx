"use client"; 
import EmptyState from '@/src/components/EmptyState';
import CoursCard from '@/src/components/CoursCard';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import Filter from '@/src/components/Filter';
import { Items } from '../types';

const DepItems = ({ items }: { items: Items[] | undefined }) => {
  const [module, setModule] = useState<string | undefined>(undefined);
  const [nivUniv, setNivUniv] = useState<string | undefined>(undefined);
  const [unite, setunite] = useState<string | undefined>(undefined);
  const [filteredItems, setFilteredItems] = useState<Items[]>(items || []);
  const [Dep, setDep] = useState<string>(" ");

  if(!filteredItems && items){
    setFilteredItems(items)
  }
  useEffect(() => {
    if (items !== undefined && items[0]?.Departement) {
      setDep(items[0].Departement);
    }
  }, [items]); // This runs only when items change

  const handleFilter = () => {
    let filtered = items || []; // Initialize with items or empty array
    
    
    if (nivUniv !== undefined) {
      filtered = filtered.filter(item => item.NivUniv === nivUniv);
    }
    if (module !== undefined) {

      filtered = filtered.filter(item => item.Module === module);
    }
    if (Dep && Dep !== "") {

      filtered = filtered.filter(item => item.Departement === Dep);
    }
    if (unite && unite !== "") {

      filtered = filtered.filter(item => item.Unite === unite);
    }
    // Update filteredItems state after filtering
    setFilteredItems(filtered);
  };

  // Separate the items into two categories
  const livres = filteredItems.filter(item => item.Type === "Livre");
  const cours = filteredItems.filter(item => item.Type === "Cours");

  const TD = filteredItems.filter(item => item.Type === "TD");

  return (
    <div className="flex flex-col gap-9 py-10">
      <Filter setModule={setModule} setNivUniv_Med={setNivUniv} setunite={setunite} onFilter={handleFilter} Dep={Dep} />
      <div className='flex flex-col gap-9'>
        {items !== undefined ? (
          TD.length > 0 || livres.length > 0 || cours.length > 0 ? (
            <>
              {livres.length > 0 && (
                <>
                  <h1 className="text-2xl font-bold text-black-1 dark:text-white-1">Livres</h1>
                  <div className='Cours_grid'>
                    {livres.map(item => (
                      <CoursCard 
                        key={item.id} 
                        id={item.id} 
                        imgURL={item.imageURL} 
                        title={item.Titre} 
                        description={item.description}
                      />
                    ))}
                  </div>
                </>
              )}

              {cours.length > 0 && (
                <>
                  <h1 className="text-2xl font-bold text-black-1 dark:text-white-1">Cours</h1>
                  <div className='Cours_grid'>
                    {cours.map(item => (
                      <CoursCard 
                        key={item.id} 
                        id={item.id} 
                        imgURL={item.imageURL} 
                        title={item.Titre} 
                        description={item.description}
                      />
                    ))}
                  </div>
                </>
              )}

              {TD.length > 0 && (
                <>
                  <h1 className="text-2xl font-bold text-black-1 dark:text-white-1">TD</h1>
                  <div className='Cours_grid'>
                    {TD.map(item => (
                      <CoursCard 
                        key={item.id} 
                        id={item.id} 
                        imgURL={item.imageURL} 
                        title={item.Titre} 
                        description={item.description}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
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
