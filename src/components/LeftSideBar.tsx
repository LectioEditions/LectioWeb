"use client";
import Link from 'next/link'
import React, { use } from 'react'
import Image from 'next/image'
import { sidebarLinks } from '@/src/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { Button } from './ui/button';

const LeftSideBar = () => {
    const Pathname = usePathname();

  return (
    <section className='left_sidebar'>
        
            <nav className='flex flex-col gap-6'>
             <Link  href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 justify-center'>
             <Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
             <h1 className='text-2xl font-extrabold text-white-1 max-lg:hidden'>Podcaster</h1>
             </Link>
             {sidebarLinks.map((route,index)=>{
                const isActive = Pathname === route.route || Pathname.startsWith('${route.route}/')   ;
                return(
                    <Link key={index} href={route.route} className={cn('flex cursor-pointer items-center gap-3 py-4 max-lg:px-4 justify-center lg:justify-start',
                    isActive?'bg-nav-focus border-r-4 border-orange-1': '')}>
                    <Image src={route.imgURL} alt={route.label} width={24} height={24} />
                    <p>{route.label}</p>
                    </Link>
                ) })}
            </nav>
            <SignedOut>
              <div className='flex justify-center items-center w-full pb-14
              max-lg:px-4 lg:pr-8 '>
                <Link href={"/sign-in"} className='w-full'>
                <Button className='bg-orange-1 text-white-1 font-semibold text-lg w-full'>
                  Sign In
                </Button>
                </Link>
              </div>
      </SignedOut>
      <SignedIn>
     <div className='w-full flex justify-center items-center pr-8' >
      <SignOutButton >
        <Button className='bg-orange-1 text-white-1 font-semibold text-lg w-full'>Sign out</Button>
      </SignOutButton>
      </div>
      </SignedIn>
    </section>
  )
}

export default LeftSideBar