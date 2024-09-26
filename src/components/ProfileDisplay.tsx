"use client";

import React from 'react'
import Image from "next/image";

import { useAudio } from '@/providers/AudioProvider';
import { Podcasts, User } from "@/types";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
//import { useToast } from "./ui/use-toast";
const ProfileDisplay = ({
    user ,podcasts

    }: {user:User , podcasts : Podcasts[]}) => {
      const { setAudio } = useAudio();
      const podcast = podcasts[0];

    
      

      const handlePlay = () => {
        if (!podcast)  throw new Error("No podcast found");
        const podcastId = podcast.id.toString();
        const author = user?.name || "";
        setAudio({
          title: podcast.title,
          audioUrl: podcast.audioURL,
          imageUrl: podcast.imageURL,
          author:author,
          podcastId,
        });
      };
    
      if (!user || !podcasts ) return <Loader />;
    
      return (
        <div className="mb-6 flex w-full justify-between max-md:justify-center">
          <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
            <Image
              src={user.image}
              width={250}
              height={250}
              alt="Podcast image"
              className="aspect-square rounded-lg"
            />
            <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
              <article className="flex flex-col justify-between h-1/2 gap-2 max-md:items-center">
                <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
                  {user.name}
                </h1>
                <figure className='flex gap-3 '>
                    <Image 
                    src="/icons/headphone.svg" 
                    width={24}
                    height={24}
                    alt="headphone"/>
                    <h2 className='text-lg font-bold text-white-1'>
                        {user?.views} 
                    </h2>
                    <p className='text-lg font-inter font-thin text-white-1'>monthely listeners</p>
                </figure>
              </article>
    
              <Button
                onClick={handlePlay}
                className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1 gap-3"
              >
                <Image
                  src="/icons/randomPlay.svg"
                  width={20}
                  height={20}
                  alt="random play"
                />{" "}
                 Play a random podcast
              </Button>
            </div>
          </div>
         
        </div>
      );
    };
    
    

export default ProfileDisplay


