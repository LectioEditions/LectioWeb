"use client";
import React, { useCallback } from 'react'
import {  EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation';
import { Items, User } from '@/src/types/index';
import Image from 'next/image';
import { Loader } from 'lucide-react';

const EmblaCarousel= ({TopUsers ,Cours}:{TopUsers:User[],Cours:Items[]}) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true},[Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay  || !("stopOnInteraction" in autoplay.options))  return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as ()=>void)
        :( autoplay.stop as ()=>void)

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )
  const slides = TopUsers && TopUsers?.filter((item : User)=>{if(item.Achat) item.Achat > 0})

 if(!Cours) return(<div className='w-full h-screen flex justify-center items-center'>
  <Loader size={30} className="animate-spin  text-green-1"/>
  </div>
)
    return (
    <section className="flex w-full flex-col gap-4 overflow-hidden"  ref={emblaRef}>
      <div className="flex">
          {Cours.slice(0,5).map((index) => (
            <figure  key={index.id}
            className='carousel_box'
            onClick={()=>router.push(`/items/${index.id}`)}
            >
              <Image
              src={index.imageURL}
              alt='card'
              fill
              className="absolute size-full rounded-xl border-none"
              />
              <div className='glassmorphism-black relative z-10 flex flex-col p-4 rounded-b-xl '>
                <h2 className='text-sm font-bold text-white-1'>{index.Titre}</h2>
                <h2 className='text-sm text-white-1'>{index.description}</h2>
                
              </div>
              </figure>
          ))}
        
      </div>
        <div className="flex justify-center gap-2 ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              selected={index=== selectedIndex}
            />
          ))}
      </div>
    </section>
  )
}

export default EmblaCarousel
