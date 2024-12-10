import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react'

const Page = async ({params}:{ params:{depNom : string}}) => {
  const DepNom = await params.depNom;
  const capitalizeWords = (str: string) => 
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const search = capitalizeWords(DepNom);
  const Items = await getItemByCategory(search);
  return (
    <section>
    <DepItems items={Items} />
    </section>
  )
}

export default Page
