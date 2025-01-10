"use client";

import React from 'react'
import Image from "next/image";

import {  Users } from "@/src/types";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { User } from '@clerk/nextjs/server';

const ProfileDisplay = ({
    user 
    }: {user : Users}) => {

    
      

    
      if (!user  ) return <Loader />;
    
      return (
        <div className="mb-6 flex w-full justify-between max-md:justify-center">
          <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
            <Image
              src={user.image}
              width={250}
              height={250}
              alt="cours image"
              className="aspect-square rounded-lg"
            />
            <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
              <article className="flex flex-col justify-center h-1/2 gap-2 max-md:items-center">
                <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1 dark:text-white-1">
                  {user.name}
                </h1>
               
              </article>
    
            
            </div>
          </div>
         
        </div>
      );
    };
    
    

export default ProfileDisplay


