import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react'
import { Categories } from '@/src/constants';
import { auth } from '@clerk/nextjs/server';
import { Loader } from 'lucide-react';


const Page = async ({params}:{ params:{depNom : string}}) => {
  const DepNom = await params.depNom;
    const user= await auth();
  const search = Categories.filter((cat) => cat.link === DepNom);
  const Items = await getItemByCategory(search[0].dep);
  if(!user)  return(
        <section className='w-full'>
            <Loader/>
        </section>
      )
  return (
    <section>
    <DepItems items={Items} />
    </section>
  )
}

export default Page


