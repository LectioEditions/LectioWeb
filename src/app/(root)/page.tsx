import React from 'react';
import CoursCard from '@/src/components/CoursCard';
import Link from 'next/link';  // Assuming you're using Next.js
import { getItemes } from '@/src/server/db';
import "@/src/app/globals.css";
import { Categories } from '@/src/constants';

async function Cours() {
  const Cours = await getItemes();
  return Cours;
}

const Home = async () => {
  const CoursData = await Cours();

  // Filter courses by department
  const department1Courses = CoursData.filter(c => c.Departement === Categories[0]);
  const department2Courses = CoursData.filter(c => c.Departement ===Categories[1]);
  const department3Courses = CoursData.filter(c => c.Departement === Categories[2]);

  return (
    <div className='mt-9 flex flex-col gap-9'>
      {/* Section for Department 1 */}
      <section className='flex flex-col gap-5'>
        <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>{Categories[0]}</h1>
        <div className='Cours_grid'>
          {department1Courses.slice(0, 3).map((Cours, index) => (
            <CoursCard 
              key={index} 
              title={Cours.Titre} 
              imgURL={Cours.imageURL} 
              description={Cours.description} 
              id={Cours.id} 
            />
          ))}
          {/* Add a link as the fourth item */}
          <Link href={`/department/${Categories[0]}`}>
          <div className='w-full h-full rounded-xl bg-white-6 dark:bg-black-2 flex justify-center items-center'>

            <h1 className="text-green-1 font-semibold ">Voir plus</h1>
          </div>
                    </Link>
        </div>
      </section>

      {/* Section for Department 2 */}
      <section className='flex flex-col gap-5'>
        <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>{Categories[1]}</h1>
        <div className='Cours_grid'>
          {department2Courses.slice(0, 3).map((Cours, index) => (
            <CoursCard 
              key={index} 
              title={Cours.Titre} 
              imgURL={Cours.imageURL} 
              description={Cours.description} 
              id={Cours.id} 
            />
          ))}
          {/* Add a link as the fourth item */}
          <Link href={`/department/${Categories[1]}`}>
          <div className='w-full h-full rounded-xl bg-white-6 dark:bg-black-2 flex justify-center items-center'>

            <h1 className="text-green-1 font-semibold ">Voir plus</h1>
          </div>
          </Link>
        </div>
      </section>

      {/* Section for Department 3 */}
      <section className='flex flex-col gap-5'>
        <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>{Categories[2]}</h1>
        <div className='Cours_grid'>
          {department3Courses.slice(0, 3).map((Cours, index) => (
            <CoursCard 
              key={index} 
              title={Cours.Titre} 
              imgURL={Cours.imageURL} 
              description={Cours.description} 
              id={Cours.id} 
            />
          ))}
          {/* Add a link as the fourth item */}
          <Link href={`/department/${Categories[2]}`}>
          <div className='w-full h-full rounded-xl bg-white-6 dark:bg-black-2 flex justify-center items-center'>

            <h1 className="text-green-1 font-semibold ">Voir plus</h1>
          </div>
                    </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
