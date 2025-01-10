import {  getAllOrders,    getUserByClerkId } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'
import EmptyState from '@/src/components/EmptyState';
import ProfileDisplay from '@/src/components/ProfileDisplay';
import { clerkClient } from '@clerk/nextjs/server';
import OrderCard from '@/src/components/OrderCard';

 const Profile= async({params}:{
  params:{profileId : string}
}) => {
  
  const user = await getUserByClerkId(params.profileId);
  const usercourss = await getAllOrders();
  

  if(!user) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>
  )
  const fullUserData= await clerkClient.users.getUser(user.clerkId);
  const agent:boolean = fullUserData.publicMetadata.agent === true;
  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      <ProfileDisplay user={user} />
      
      </header>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1 '> Mes Commandes</h1>
     {usercourss && usercourss.length>0 ?(
      <div className='Cours_grid'>{usercourss.map((cours,index)=>(
        <OrderCard route={"archive"}  key={index} id={cours.identifier} Prix={cours.Prix}  CreatedAt={cours.createdAt}/>
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


