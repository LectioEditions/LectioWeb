import EmptyState from '@/src/components/EmptyState';
import PodcastCard from '@/src/components/CourstCard';
import SearchBar from '@/src/components/SearchBar';
import { getPodcastBySearch, getPodcasts } from '@/src/server/db';
import { Loader } from 'lucide-react';
import React from 'react'

const Discover = async ({searchParams: {search}}:{searchParams:{search : string}}) => {
  const podcasts= await getPodcastBySearch(search ? search : '');
  const discover = await getPodcasts();
  return (
    <div className=" flex flex-col gap-9">
      <SearchBar/>
      <div className='flex flex-col gap-9'>
      <h1 className='text-xl font-bold text-white-1'>Discover</h1>
       {podcasts ? <>
       {podcasts.length > 0 ? <div className='podcast_grid'>
        {podcasts.map(podcast => (
          <PodcastCard id={podcast.id} imgURL={podcast.imageURL} title={podcast.title}  description={podcast.description}/>))}
        </div>:<EmptyState title={'No Results found'}/>}
       </> : <>{ discover && !podcasts ? <div className='podcast_grid'>
        {discover.map(podcast => (
          <PodcastCard id={podcast.id} imgURL={podcast.imageURL} title={podcast.title}  description={podcast.description}/>))}
       </div> : <Loader size={50} className='mx-auto'/>}
      </>

}
      </div>
    </div>
  )
}

export default Discover