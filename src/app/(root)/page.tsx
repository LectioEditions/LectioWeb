import React from 'react';
import CoursCard from '@/src/components/CoursCard';
import Link from 'next/link'; // Assuming you're using Next.js
import { getItemes } from '@/src/server/db';
import "@/src/app/globals.css";
import { Categories } from '@/src/constants';
import { Item } from '@/src/types';

// Fetch courses
async function fetchCourses() {
  return await getItemes();
}

// Reusable component for Department Section
interface DepartmentSectionProps {
  title: string;
  courses: Item[];
  link: string;
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({ title, courses, link }) => (
  
  <section className="flex flex-col gap-5">
    <h1 className="text-xl font-bold text-black-1 dark:text-white-1">{title}</h1>
    <div className="Cours_grid">
      {courses.slice(0, 3).map((course, index) => (
        <CoursCard
          key={index}
          title={course.Titre}
          imgURL={course.imageURL}
          description={course.description}
          id={course.id}
        />
      ))}
      <Link href={link}>
        <div className="w-full h-full rounded-xl bg-white-6 dark:bg-black-2 flex justify-center items-center">
          <h1 className="text-green-1 font-semibold">Voir plus</h1>
        </div>
      </Link>
    </div>
  </section>
);

// Home component
const Home = async () => {
  const courses = await fetchCourses();
  // Filter courses by department
  const departmentCourses = Categories.map((category) =>
    courses.filter((course) => course.Departement === category.dep)
  );
  
  return (
    <div className="mt-9 flex flex-col gap-9">
      {Categories.map((category, index) => (
        <DepartmentSection
          key={index}
          title={`Département ${category.dep}`}
          courses={departmentCourses[index]}
          link={`/department/${category.link}`}
        />
      ))}
    </div>
  );
};

export default Home;
