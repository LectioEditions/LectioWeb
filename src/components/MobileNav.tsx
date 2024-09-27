"use client";
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/src/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/lib/utils'


const MobileNav = () => {
  const Pathname = usePathname();

  return (
    
      <section>
      <Sheet>
      <SheetTrigger>
        <Image
        src="/icons/hamburger.svg"
        width={30}
        height={30}
        alt="menu"
        />
      </SheetTrigger>
      <SheetContent side="left" className='border-none bg-black-1'>
      <Link  href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 pl-4'>
             <Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
             <h1 className='text-2xl font-extrabold ml-2 text-white-1 '>Podcaster</h1>
             </Link>
      <div className='h-[calc(100vh - 72px)] flex-col justify-between overflow-auto'>
       <SheetClose asChild>
        <nav className='flex flex-col gap-6 h-full text-white-1'>
        {sidebarLinks.map((route,index)=>{
                const isActive = Pathname === route.route || Pathname.startsWith('${route.route}/')   ;
                return(
                  <SheetClose asChild key={route.route}> 
                  <Link key={index} href={route.route} className={cn('flex cursor-pointer items-center gap-3 py-4 max-lg:px-4 justify-start',
                    isActive?'bg-nav-focus border-r-4 border-green-1': '')}>
                    <Image src={route.imgURL} alt={route.label} width={24} height={24} />
                    <p>{route.label}</p>
                    </Link>
                    </SheetClose>
                ) })}
        </nav>
       </SheetClose>
        </div>       
      </SheetContent>
      </Sheet>

      </section>
    
  )
}

export default MobileNav