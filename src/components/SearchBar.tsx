"use client";
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if(!search && pathname === '/discover'){
            router.push("/discover");

        }
        else if(search) router.push(`/discover?search=${search}`);
    },[search,router,pathname])
  return (
<div className="relative mt-8 block">
      <Input 
        className="input-class py-6 pl-12 focus-visible:ring-offset-green-1"
        placeholder='Search for courses'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
      />
      <Image 
        src="/icons/search.svg"
        alt="search"
        height={20}
        width={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  
  )
}

export default SearchBar
