"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { agentLinks, sidebarLinks } from '@/src/constants';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import ThemeSwitch from './ThemeSwitch';

const LeftSideBar = ({ isAgent }: { isAgent: () => Promise<boolean> }) => {
    const router = useRouter();
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
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6 w-full'>
                <Link href={"/"} className='flex cursor-pointer items-start gap-1 justify-start'>
                    <Image src='/icons/lectio_logo-02.png' alt='logo' width={130} height={27} className='dark:hidden'/>
                    <Image src='/icons/lectio_logo-04.png' alt='logo' width={130} height={27} className='hidden dark:block' />
                </Link>
                
                {linksToRender.map((route, index) => {
                    const isActive = pathname === route.route || pathname.startsWith(`${route.route}/`);
                    return (
                        <Link
                            key={index}
                            href={route.route}
                            className={cn(
                                'flex cursor-pointer font-semibold items-center gap-3 py-4 max-lg:px-4 justify-start w-full',
                                isActive ? 'bg-nav-focus border-r-4 border-green-1' : ''
                            )}
                        >
                            <Image src={route.imgURL} alt={route.label} width={24} height={24} className='color-black-1 dark:color-white-6 '/>
                            <p>{route.label}</p>
                        </Link>
                    );
                })}

                <ThemeSwitch />
            </nav>

            <SignedOut>
                <div className='flex justify-center items-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                    <Link href={"/sign-in"} className='w-full'>
                        <Button className='bg-green-1 text-white-1 font-semibold text-lg w-full'>
                            Sign In
                        </Button>
                    </Link>
                </div>
            </SignedOut>

            <SignedIn>
                <div className='w-full flex justify-center items-center pr-8'>
                    <SignOutButton>
                        <Button className='bg-green-1 text-white-1 font-semibold text-lg w-full'>
                            <Link href="/">Sign out</Link>
                        </Button>
                    </SignOutButton>
                </div>
            </SignedIn>
        </section>
    );
};

export default LeftSideBar;
