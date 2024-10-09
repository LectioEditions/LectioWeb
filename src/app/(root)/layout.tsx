import LeftSideBar from "@/src/components/LeftSideBar";
import MobileNav from "@/src/components/MobileNav";
import RightSideBar from "@/src/components/RightSideBar";
import { isAgent } from "@/src/server/db";
import Image from "next/image";
import React from "react";
import { Toaster } from "sonner";
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleAgent = async()=>{ 
    "use server";
    const agent = await isAgent();
     if(agent){
      return true;}
      return false;
  }
  return (
    <div className="relative flex flex-col">
        <main className="relative flex bg-white-1  dark:bg-black-1">
          <LeftSideBar isAgent={handleAgent}/>
          <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
            <Image className="hidden dark:block" src='/icons/lectio_logo-04.png' alt='logo' width={100} height={27} />
            <Image className="dark:hidden" src='/icons/lectio_logo-02.png' alt='logo' width={100} height={27} />

            <MobileNav isAgent={handleAgent}/>
            </div>
            <div className="flex flex-col md:pb-14">
            <Toaster />
            {children}
            
            </div>
            </div>
          </section>
          <RightSideBar/>  
        </main>
    </div>
  );
}
