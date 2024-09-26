import { deletePodcast, getPodcastById, getPodcastByUserId, getPodcasts, getUserByClerkId } from '@/server/db';
import { Loader } from 'lucide-react';
import React from 'react'
import Image from 'next/image'
import PodcastdetailPlayer from '@/components/PodcastdetailPlayer';
import PodcastCard from '@/components/PodcastCard';
import EmptyState from '@/components/EmptyState';
import { QueryResult } from '@vercel/postgres';
import ProfileDisplay from '@/components/ProfileDisplay';

 const Profile= async({params}:{
  params:{profileId : string}
}) => {
  
  const user = await getUserByClerkId(params.profileId);
  const userPodcasts = await getPodcastByUserId(params.profileId);
  if(!user) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-orange-1"/>
    </div>
  )

  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      <ProfileDisplay user={user} podcasts={userPodcasts}/>
      
      </header>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-white-1 '> All Podcasts</h1>
     {userPodcasts && userPodcasts.length>0 ?(
      <div className='podcast_grid'>{userPodcasts.map((podcast,index)=>(
        <PodcastCard key={index} title={podcast.title} imgURL={podcast.imageURL} description={podcast.description} id={podcast.id} />
      ))}
      </div>
     ):(
      <>
      <EmptyState
      title={"No podasts found"}
      buttonLink={"/discover"}
      buttonText={"Discover more podcasts"}/>
      </>
     )}
     </section>
     
     </section>)
}
export default Profile


