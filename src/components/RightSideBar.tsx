import {  getItemes, getTopUserByItemCount, getUserByClerkId } from '@/src/server/db';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Header from './Header';
import Carousel from './Carousel';
import { Loader } from 'lucide-react';

const RightSideBar = async () => {
  const user = auth();
  const [topUsers, Cours] = await Promise.all([
    getTopUserByItemCount(),
    getItemes()  // Ensure you have the correct function name here
  ]);
  
  if (user.userId) var userData= await getUserByClerkId(user.userId);
  if(!topUsers || !Cours) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-green-1"/>
    </div>)
  return (
    <section className='right_sidebar text-black-1 dark:text-white-1'>

      <SignedIn>
        <Link href={ `/profile/${userData?.clerkId}`} className='flex gap-3 pb-12'>
        <UserButton/>
        <div className='flex w-full items-center justify-between '>
          <h1 className='text-lg truncate font-semibold text-black-1 dark:text-white-1'>
            {userData?.name}
          </h1>
          <Image
           src= "/icons/right-arrow.svg"
           alt="arrow right"
            width={24}
            height={24}
          />
        </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle='Nos derniers ouvrages' titleClassName=''/>
        <Carousel TopUsers={topUsers} Cours={Cours}/>

      </section>
      
    </section>
  )
}

export default RightSideBar