import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import React from 'react'

const Header = ({headerTitle, titleClassName}:{headerTitle :string , titleClassName :string}) => {
  return (
    <header className=' flex items-center justify-between my-5'>
    {headerTitle ? (
        <h1 className={cn('text-lg font-bold text-black-1 dark:text-white-1', titleClassName)}
        >{headerTitle}</h1>
    ): <div/>}
    <Link href="/discover" className='text-lg font-semibold text-green-1'>
    Tout voir
    </Link>
    </header>
  )
}

export default Header