import { deletecours, getCoursById, getCoursByUserId, getCourses, getUserByClerkId } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'
import Image from 'next/image'
import CoursdetailPlayer from '@/src/components/CoursdetailPlayer';
import CoursCard from '@/src/components/CoursCard';
import EmptyState from '@/src/components/EmptyState';
import { QueryResult } from '@vercel/postgres';
import ProfileDisplay from '@/src/components/ProfileDisplay';

 const Profile= async({params}:{
  params:{profileId : string}
}) => {
  
  const user = await getUserByClerkId(params.profileId);
  const usercourss = await getCoursByUserId(params.profileId);
  if(!user) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-orange-1"/>
    </div>
  )

  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      <ProfileDisplay user={user} courses={usercourss}/>
      
      </header>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-white-1 '> All courss</h1>
     {usercourss && usercourss.length>0 ?(
      <div className='cours_grid'>{usercourss.map((cours,index)=>(
        <CoursCard key={index} title={cours.Titre} imgURL={cours.imageURL} description={cours.description} id={cours.id} />
      ))}
      </div>
     ):(
      <>
      <EmptyState
      title={"No podasts found"}
      buttonLink={"/discover"}
      buttonText={"Discover more courss"}/>
      </>
     )}
     </section>
     
     </section>)
}
export default Profile


