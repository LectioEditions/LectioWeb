"use client";
import React, { useEffect, useState } from 'react'
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
import { agentLinks, sidebarLinks } from '@/src/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import ThemeSwitch from './ThemeSwitch';


const MobileNav = ({ isAgent }: { isAgent: () => Promise<boolean> }) => {
  const pathname = usePathname();
  const [agent, setAgent] = useState<boolean | undefined>(undefined);

  useEffect(() => {
      const checkAgent = async () => {
          try {
              const agentStatus = await isAgent();
              setAgent(agentStatus);
          } catch (error) {
              console.error('Error fetching agent status:', error);
              setAgent(false);
          }
      };

      checkAgent();
  }, [isAgent]);

  const linksToRender = agent ? agentLinks : sidebarLinks;

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
      <SheetContent side="left" className='border-none bg-white-6  dark:bg-black-2 text-black-1 dark:text-white-1'>
      <Link  href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 pl-4'>
      <Image src='/icons/lectio_logo-04.png' alt='logo' width={100} height={27} />
      </Link>
      <div className='h-[calc(100vh - 72px)] flex-col justify-between overflow-auto'>
       <SheetClose asChild>
        <nav className='flex flex-col gap-6 h-full text-white-1'>
        {linksToRender.map((route,index)=>{
                const isActive = pathname === route.route || pathname.startsWith('${route.route}/')   ;
                return(
                  <SheetClose asChild key={route.route}> 
                  <Link key={index} href={route.route} className={cn('flex cursor-pointer items-center gap-3 py-4 max-lg:px-4 justify-start',
                    isActive?'bg-nav-focus border-r-4 border-green-1': '')}>
                    <Image src={route.imgURL} alt={route.label} width={24} height={24} />
                    <p>{route.label}</p>
                    </Link>
                    </SheetClose>
                ) })}
                <ThemeSwitch/>
        </nav>
       </SheetClose>
        </div>       
      </SheetContent>
      </Sheet>

      </section>
    
  )
}

export default MobileNav